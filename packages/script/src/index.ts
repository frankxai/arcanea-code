import { $, semver } from "bun"
import path from "path"

const rootPkgPath = path.resolve(import.meta.dir, "../../../package.json")
const rootPkg = await Bun.file(rootPkgPath).json()
const expectedBunVersion = rootPkg.packageManager?.split("@")[1]

if (!expectedBunVersion) {
  throw new Error("packageManager field not found in root package.json")
}

// relax version requirement
const expectedBunVersionRange = `^${expectedBunVersion}`

if (!semver.satisfies(process.versions.bun, expectedBunVersionRange)) {
  throw new Error(`This script requires bun@${expectedBunVersionRange}, but you are using bun@${process.versions.bun}`)
}

const env = {
  ARCANEA_CHANNEL: process.env["ARCANEA_CHANNEL"] || process.env["OPENCODE_CHANNEL"],
  ARCANEA_BUMP: process.env["ARCANEA_BUMP"] || process.env["OPENCODE_BUMP"],
  ARCANEA_VERSION: process.env["ARCANEA_VERSION"] || process.env["OPENCODE_VERSION"],
  ARCANEA_RELEASE: process.env["ARCANEA_RELEASE"] || process.env["OPENCODE_RELEASE"],
}
const CHANNEL = await (async () => {
  if (env.ARCANEA_CHANNEL) return env.ARCANEA_CHANNEL
  if (env.ARCANEA_BUMP) return "latest"
  if (env.ARCANEA_VERSION && !env.ARCANEA_VERSION.startsWith("0.0.0-")) return "latest"
  return await $`git branch --show-current`.text().then((x) => x.trim())
})()
const IS_PREVIEW = CHANNEL !== "latest"

const VERSION = await (async () => {
  if (env.ARCANEA_VERSION) return env.ARCANEA_VERSION
  if (IS_PREVIEW) return `0.0.0-${CHANNEL}-${new Date().toISOString().slice(0, 16).replace(/[-:T]/g, "")}`
  // Try arcanea-code first, fall back to opencode-ai for version history
  const version = await fetch("https://registry.npmjs.org/arcanea-code/latest")
    .then((res) => {
      if (!res.ok) return fetch("https://registry.npmjs.org/opencode-ai/latest")
      return res
    })
    .then((res) => {
      if (!res.ok) throw new Error(res.statusText)
      return res.json()
    })
    .then((data: any) => data.version)
  const [major, minor, patch] = version.split(".").map((x: string) => Number(x) || 0)
  const t = env.ARCANEA_BUMP?.toLowerCase()
  if (t === "major") return `${major + 1}.0.0`
  if (t === "minor") return `${major}.${minor + 1}.0`
  return `${major}.${minor}.${patch + 1}`
})()

const team = [
  "actions-user",
  "frankxai",
  "arcanea-agent[bot]",
]

export const Script = {
  get channel() {
    return CHANNEL
  },
  get version() {
    return VERSION
  },
  get preview() {
    return IS_PREVIEW
  },
  get release(): boolean {
    return !!env.ARCANEA_RELEASE
  },
  get team() {
    return team
  },
}
console.log(`arcanea-code script`, JSON.stringify(Script, null, 2))
