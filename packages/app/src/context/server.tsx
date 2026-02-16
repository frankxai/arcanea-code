import { createSimpleContext } from "@opencode-ai/ui/context"
import { batch, createEffect, createMemo, onCleanup } from "solid-js"
import { createStore } from "solid-js/store"
import { usePlatform } from "@/context/platform"
import { Persist, persisted } from "@/utils/persist"
import { checkServerHealth } from "@/utils/server-health"

type StoredProject = { worktree: string; expanded: boolean }
const HEALTH_POLL_INTERVAL_MS = 10_000

export function normalizeServerUrl(input: string) {
  const trimmed = input.trim()
  if (!trimmed) return
  const withProtocol = /^https?:\/\//.test(trimmed) ? trimmed : `http://${trimmed}`
  return withProtocol.replace(/\/+$/, "")
}

export function serverDisplayName(url: string) {
  if (!url) return ""
  return url.replace(/^https?:\/\//, "").replace(/\/+$/, "")
}

function projectsKey(url: string) {
  if (!url) return ""
  const host = url.replace(/^https?:\/\//, "").split(":")[0]
  if (host === "localhost" || host === "127.0.0.1") return "local"
  return url
}

export namespace ServerConnection {
  type Base = { displayName?: string }

  export type HttpBase = {
    url: string
    username?: string
    password?: string
  }

  // Regular web connections
  export type Http = {
    type: "http"
    http: HttpBase
  } & Base

  export type Sidecar = {
    type: "local"
    http: HttpBase
  } & (
    | // Regular desktop server
    { variant: "base" }
    // WSL server (windows only)
    | {
        variant: "wsl"
        distro: string
      }
  ) &
    Base

  // Remote server desktop can SSH into
  export type Ssh = {
    type: "ssh"
    host: string
    // SSH client exposes an HTTP server for the app to use as a proxy
    http: HttpBase
  } & Base

  export type Any =
    | Http
    // All these are desktop-only
    | (Sidecar | Ssh)

  export const key = (conn: Any): string => {
    switch (conn.type) {
      case "http":
        return conn.http.url
      case "local": {
        if (conn.variant === "wsl") return `wsl:${conn.distro}`
        return "local"
      }
      case "ssh":
        return `ssh:${conn.host}`
    }
  }
}

export const { use: useServer, provider: ServerProvider } = createSimpleContext({
  name: "Server",
  init: (props: { defaultUrl: string; isSidecar?: boolean; servers?: Array<ServerConnection.Any> }) => {
    const platform = usePlatform()

    const [store, setStore, _, ready] = persisted(
      Persist.global("server", ["server.v3"]),
      createStore({
        list: [] as string[],
        projects: {} as Record<string, StoredProject[]>,
        lastProject: {} as Record<string, string>,
      }),
    )

    const allServers = (): Array<ServerConnection.Any> => [
      ...(props.servers ?? []),
      ...store.list.map((url) => ({
        type: "http" as const,
        http: { url },
      })),
    ]

    const [state, setState] = createStore({
      active: props.defaultUrl,
      healthy: undefined as boolean | undefined,
    })

    const healthy = () => state.healthy

    // const defaultUrl = () => normalizeServerUrl(props.defaultUrl)

    function reconcileStartup() {
      const fallback = props.defaultUrl
      if (!fallback) return
      // const previousSidecarUrl = normalizeServerUrl(store.currentSidecarUrl)
      // const list = previousSidecarUrl ? store.list.filter((url) => url !== previousSidecarUrl) : store.list
      // if (!props.isSidecar) {
      //   batch(() => {
      //     setStore("list", list)
      //     if (store.currentSidecarUrl) setStore("currentSidecarUrl", "")
      setState("active", fallback)
      //   })
      //   return
      // }
      // const nextList = list.includes(fallback) ? list : [...list, fallback]
      // batch(() => {
      //   setStore("list", nextList)
      //   setStore("currentSidecarUrl", fallback)
      //   setState("active", fallback)
      // })
    }

    function updateServerList(url: string, remove = false) {
      if (remove) {
        const list = store.list.filter((x) => x !== url)
        const next = state.active === url ? (list[0] ?? props.defaultUrl ?? "") : state.active
        batch(() => {
          setStore("list", list)
          setState("active", next)
        })
        return
      }

      batch(() => {
        if (!store.list.includes(url)) {
          setStore("list", store.list.length, url)
        }
        setState("active", url)
      })
    }

    function startHealthPolling(conn: ServerConnection.Any) {
      let alive = true
      let busy = false

      const run = () => {
        if (busy) return
        busy = true
        void check(conn)
          .then((next) => {
            if (!alive) return
            setState("healthy", next)
          })
          .finally(() => {
            busy = false
          })
      }

      run()
      const interval = setInterval(run, HEALTH_POLL_INTERVAL_MS)
      return () => {
        alive = false
        clearInterval(interval)
      }
    }

    function setActive(input: string) {
      const url = normalizeServerUrl(input)
      if (!url) return
      setState("active", url)
    }

    function add(input: string) {
      const url = normalizeServerUrl(input)
      if (!url) return
      updateServerList(url)
    }

    function remove(input: string) {
      const url = normalizeServerUrl(input)
      if (!url) return
      updateServerList(url, true)
    }

    createEffect(() => {
      if (!ready()) return
      if (state.active) return
      reconcileStartup()
    })

    const isReady = createMemo(() => ready() && !!state.active)

    const fetcher = platform.fetch ?? globalThis.fetch
    const check = (conn: ServerConnection.Any) => checkServerHealth(conn.http, fetcher).then((x) => x.healthy)

    createEffect(() => {
      const current_ = current()
      if (!current_) return

      setState("healthy", undefined)
      onCleanup(startHealthPolling(current_))
    })

    const origin = createMemo(() => projectsKey(state.active))
    const projectsList = createMemo(() => store.projects[origin()] ?? [])
    const isLocal = createMemo(() => origin() === "local")
    const current = createMemo(() => allServers().find((s) => s.http.url === state.active))

    return {
      ready: isReady,
      healthy,
      isLocal,
      get url() {
        return state.active
      },
      get name() {
        return serverDisplayName(state.active)
      },
      get list() {
        return allServers()
      },
      get current() {
        return current()!
      },
      get http() {
        const c = current()
        return c?.http!
      },
      setActive,
      add,
      remove,
      projects: {
        list: projectsList,
        open(directory: string) {
          const key = origin()
          if (!key) return
          const current = store.projects[key] ?? []
          if (current.find((x) => x.worktree === directory)) return
          setStore("projects", key, [{ worktree: directory, expanded: true }, ...current])
        },
        close(directory: string) {
          const key = origin()
          if (!key) return
          const current = store.projects[key] ?? []
          setStore(
            "projects",
            key,
            current.filter((x) => x.worktree !== directory),
          )
        },
        expand(directory: string) {
          const key = origin()
          if (!key) return
          const current = store.projects[key] ?? []
          const index = current.findIndex((x) => x.worktree === directory)
          if (index !== -1) setStore("projects", key, index, "expanded", true)
        },
        collapse(directory: string) {
          const key = origin()
          if (!key) return
          const current = store.projects[key] ?? []
          const index = current.findIndex((x) => x.worktree === directory)
          if (index !== -1) setStore("projects", key, index, "expanded", false)
        },
        move(directory: string, toIndex: number) {
          const key = origin()
          if (!key) return
          const current = store.projects[key] ?? []
          const fromIndex = current.findIndex((x) => x.worktree === directory)
          if (fromIndex === -1 || fromIndex === toIndex) return
          const result = [...current]
          const [item] = result.splice(fromIndex, 1)
          result.splice(toIndex, 0, item)
          setStore("projects", key, result)
        },
        last() {
          const key = origin()
          if (!key) return
          return store.lastProject[key]
        },
        touch(directory: string) {
          const key = origin()
          if (!key) return
          setStore("lastProject", key, directory)
        },
      },
    }
  },
})
