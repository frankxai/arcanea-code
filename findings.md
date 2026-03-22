# Arcanea Code — Findings

## Upstream Analysis (2026-03-22)

### Divergence
- **Common ancestor:** 916361198 (ci: fixed apt cache)
- **Our commits:** 6 (121 files, 1593 insertions)
- **Upstream commits since:** 1,143
- **Merge conflicts:** 38 files (tried merge, aborted)

### Upstream Evolution (major changes since Feb 17)
- Effect.ts service refactoring ("effectify" pattern)
- Services effectified: Pty, ToolRegistry, Plugin, Command, Shell, Snapshot
- `packages/opencode/src/skill/skill.ts` — DELETED upstream (we modified it)
- Significant restructuring of provider, session, and tool systems

### Our 6 Commits (in order)
1. `fcf2f2d` — Initial branding fork
2. `b04388e` — Guardian intelligence layer (10 agents, 4 commands, cosmic theme)
3. `083673c` — Complete opencode → arcanea-realm rebrand (56 env vars, config paths)
4. `41b4ec3` — Guardian Council + CI pipeline rebrand
5. `5a70bb7` — Rename arcanea-realm → arcanea-code
6. `14804fc` — README update

### Key Branding Touchpoints
- `packages/opencode/src/global/index.ts` — app identity (cascades to all XDG paths)
- `packages/opencode/src/flag/flag.ts` — 56 OPENCODE_* → ARCANEA_* env vars
- `packages/opencode/src/config/config.ts` — .opencode/ → .arcanea/
- `packages/opencode/src/storage/db.ts` — database path
- `bin/opencode` → `bin/arcanea-code`

### oh-my-arcanea Plugin Analysis
- **Location:** C:\Users\frank\oh-my-arcanea
- **Version:** 4.0.0
- **Runtime:** Bun
- **Dependencies:** @opencode-ai/plugin@1.1.19, @opencode-ai/sdk@1.1.19
- **11 Agents:** Sisyphus, Hephaestus, Oracle, Librarian, Explore, Atlas, Prometheus, Metis, Momus, Multimodal-Looker, Sisyphus-Junior
- **44 Hooks** across 39 directories
- **26 Tools** across 15 directories
- **3 Built-in MCPs:** websearch, context7, grep_app
- **Plugin interface:** 8 OpenCode hook handlers (config, tool, chat.message, chat.params, event, tool.execute.before, tool.execute.after, experimental.chat.messages.transform)

## Competitive Intelligence
- ComposioHQ/agent-orchestrator: 5K stars, git worktree isolation, dashboard, 5 weeks old
- anomalyco/opencode: 127K stars, Effect.ts migration, very active
- Our differentiator: Guardian mythology as UX, ten-domain routing, Arcanea creative multiverse
