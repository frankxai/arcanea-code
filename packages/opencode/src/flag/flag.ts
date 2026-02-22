function truthy(key: string) {
  const value = process.env[key]?.toLowerCase()
  return value === "true" || value === "1"
}

export namespace Flag {
  export const ARCANEA_AUTO_SHARE = truthy("ARCANEA_AUTO_SHARE")
  export const ARCANEA_GIT_BASH_PATH = process.env["ARCANEA_GIT_BASH_PATH"]
  export const ARCANEA_CONFIG = process.env["ARCANEA_CONFIG"]
  export declare const ARCANEA_CONFIG_DIR: string | undefined
  export const ARCANEA_CONFIG_CONTENT = process.env["ARCANEA_CONFIG_CONTENT"]
  export const ARCANEA_DISABLE_AUTOUPDATE = truthy("ARCANEA_DISABLE_AUTOUPDATE")
  export const ARCANEA_DISABLE_PRUNE = truthy("ARCANEA_DISABLE_PRUNE")
  export const ARCANEA_DISABLE_TERMINAL_TITLE = truthy("ARCANEA_DISABLE_TERMINAL_TITLE")
  export const ARCANEA_PERMISSION = process.env["ARCANEA_PERMISSION"]
  export const ARCANEA_DISABLE_DEFAULT_PLUGINS = truthy("ARCANEA_DISABLE_DEFAULT_PLUGINS")
  export const ARCANEA_DISABLE_LSP_DOWNLOAD = truthy("ARCANEA_DISABLE_LSP_DOWNLOAD")
  export const ARCANEA_ENABLE_EXPERIMENTAL_MODELS = truthy("ARCANEA_ENABLE_EXPERIMENTAL_MODELS")
  export const ARCANEA_DISABLE_AUTOCOMPACT = truthy("ARCANEA_DISABLE_AUTOCOMPACT")
  export const ARCANEA_DISABLE_MODELS_FETCH = truthy("ARCANEA_DISABLE_MODELS_FETCH")
  export const ARCANEA_DISABLE_CLAUDE_CODE = truthy("ARCANEA_DISABLE_CLAUDE_CODE")
  export const ARCANEA_DISABLE_CLAUDE_CODE_PROMPT =
    ARCANEA_DISABLE_CLAUDE_CODE || truthy("ARCANEA_DISABLE_CLAUDE_CODE_PROMPT")
  export const ARCANEA_DISABLE_CLAUDE_CODE_SKILLS =
    ARCANEA_DISABLE_CLAUDE_CODE || truthy("ARCANEA_DISABLE_CLAUDE_CODE_SKILLS")
  export const ARCANEA_DISABLE_EXTERNAL_SKILLS =
    ARCANEA_DISABLE_CLAUDE_CODE_SKILLS || truthy("ARCANEA_DISABLE_EXTERNAL_SKILLS")
  export declare const ARCANEA_DISABLE_PROJECT_CONFIG: boolean
  export const ARCANEA_FAKE_VCS = process.env["ARCANEA_FAKE_VCS"]
  export declare const ARCANEA_CLIENT: string
  export const ARCANEA_SERVER_PASSWORD = process.env["ARCANEA_SERVER_PASSWORD"]
  export const ARCANEA_SERVER_USERNAME = process.env["ARCANEA_SERVER_USERNAME"]
  export const ARCANEA_ENABLE_QUESTION_TOOL = truthy("ARCANEA_ENABLE_QUESTION_TOOL")

  // Experimental
  export const ARCANEA_EXPERIMENTAL = truthy("ARCANEA_EXPERIMENTAL")
  export const ARCANEA_EXPERIMENTAL_FILEWATCHER = truthy("ARCANEA_EXPERIMENTAL_FILEWATCHER")
  export const ARCANEA_EXPERIMENTAL_DISABLE_FILEWATCHER = truthy("ARCANEA_EXPERIMENTAL_DISABLE_FILEWATCHER")
  export const ARCANEA_EXPERIMENTAL_ICON_DISCOVERY =
    ARCANEA_EXPERIMENTAL || truthy("ARCANEA_EXPERIMENTAL_ICON_DISCOVERY")

  const copy = process.env["ARCANEA_EXPERIMENTAL_DISABLE_COPY_ON_SELECT"]
  export const ARCANEA_EXPERIMENTAL_DISABLE_COPY_ON_SELECT =
    copy === undefined ? process.platform === "win32" : truthy("ARCANEA_EXPERIMENTAL_DISABLE_COPY_ON_SELECT")
  export const ARCANEA_ENABLE_EXA =
    truthy("ARCANEA_ENABLE_EXA") || ARCANEA_EXPERIMENTAL || truthy("ARCANEA_EXPERIMENTAL_EXA")
  export const ARCANEA_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS = number("ARCANEA_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS")
  export const ARCANEA_EXPERIMENTAL_OUTPUT_TOKEN_MAX = number("ARCANEA_EXPERIMENTAL_OUTPUT_TOKEN_MAX")
  export const ARCANEA_EXPERIMENTAL_OXFMT = ARCANEA_EXPERIMENTAL || truthy("ARCANEA_EXPERIMENTAL_OXFMT")
  export const ARCANEA_EXPERIMENTAL_LSP_TY = truthy("ARCANEA_EXPERIMENTAL_LSP_TY")
  export const ARCANEA_EXPERIMENTAL_LSP_TOOL = ARCANEA_EXPERIMENTAL || truthy("ARCANEA_EXPERIMENTAL_LSP_TOOL")
  export const ARCANEA_DISABLE_FILETIME_CHECK = truthy("ARCANEA_DISABLE_FILETIME_CHECK")
  export const ARCANEA_EXPERIMENTAL_PLAN_MODE = ARCANEA_EXPERIMENTAL || truthy("ARCANEA_EXPERIMENTAL_PLAN_MODE")
  export const ARCANEA_EXPERIMENTAL_MARKDOWN = truthy("ARCANEA_EXPERIMENTAL_MARKDOWN")
  export const ARCANEA_MODELS_URL = process.env["ARCANEA_MODELS_URL"]
  export const ARCANEA_MODELS_PATH = process.env["ARCANEA_MODELS_PATH"]

  function number(key: string) {
    const value = process.env[key]
    if (!value) return undefined
    const parsed = Number(value)
    return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined
  }
}

// Dynamic getter for ARCANEA_DISABLE_PROJECT_CONFIG
// This must be evaluated at access time, not module load time,
// because external tooling may set this env var at runtime
Object.defineProperty(Flag, "ARCANEA_DISABLE_PROJECT_CONFIG", {
  get() {
    return truthy("ARCANEA_DISABLE_PROJECT_CONFIG")
  },
  enumerable: true,
  configurable: false,
})

// Dynamic getter for ARCANEA_CONFIG_DIR
// This must be evaluated at access time, not module load time,
// because external tooling may set this env var at runtime
Object.defineProperty(Flag, "ARCANEA_CONFIG_DIR", {
  get() {
    return process.env["ARCANEA_CONFIG_DIR"]
  },
  enumerable: true,
  configurable: false,
})

// Dynamic getter for ARCANEA_CLIENT
// This must be evaluated at access time, not module load time,
// because some commands override the client at runtime
Object.defineProperty(Flag, "ARCANEA_CLIENT", {
  get() {
    return process.env["ARCANEA_CLIENT"] ?? "cli"
  },
  enumerable: true,
  configurable: false,
})
