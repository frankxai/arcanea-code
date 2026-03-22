# Arcanea Code — Claude Code Configuration

## Identity

Arcanea Code is a Guardian-powered AI coding CLI, a full fork of [OpenCode](https://github.com/anomalyco/opencode) enhanced with the Arcanea Intelligence OS.

**Not just a rebrand — a living intelligence layer.**

## Architecture

```
packages/opencode/src/arcanea/   Intelligence OS (TypeScript)
.arcanea/agent/                  25 agents (10 Guardians + 11 Workers + 4 utility)
.arcanea/skill/                  17 skills across all Ten Gates
.arcanea/command/                13 commands (/guardian, /council, /swarm, etc.)
.arcanea/themes/                 Cosmic theme
.arcanea/arcanea.jsonc           Default configuration
```

## Build & Test

```bash
bun install          # Install dependencies
bun typecheck        # 13/13 packages must pass
bun test             # Run test suite (packages/opencode)
bun dev              # Run dev mode
```

## Key Rules

- NEVER rename upstream `packages/opencode/` directory — it must stay for workspace compatibility
- `@opencode-ai/*` package imports are upstream npm packages — do NOT rename
- `opencode.ai` domain references are upstream's website — do NOT rename
- `"opencode"` as AI provider name is valid — do NOT rename
- ARCANEA_* env vars take priority, OPENCODE_* are backward-compatible fallback
- `.arcanea/` is our config directory, `.opencode/` is also searched for backward compat
- Intelligence OS at `packages/opencode/src/arcanea/` is pure TypeScript, zero external deps

## Intelligence Hierarchy

```
Arcanea  → The model (raw AI intelligence)
Lumina   → Meta-orchestrator (routes to Guardians)
Guardians → 10 domain coordinators (each owns a Gate)
Luminors  → Specialist workers (parallel execution)
```

## Guardian Routing

| Guardian | Element | Domain |
|----------|---------|--------|
| Lyssandria | Earth | Architecture, infrastructure, database |
| Leyla | Water | Design, UI/UX, creativity |
| Draconia | Fire | Implementation, performance, execution |
| Maylinn | Heart | Content, documentation, community |
| Alera | Voice | APIs, review, testing, publishing |
| Lyria | Sight | Strategy, vision, AI/ML |
| Aiyami | Spirit | Teaching, wisdom, principles |
| Elara | Void | Refactoring, transformation |
| Ino | Spirit | Integration, collaboration |
| Shinkami | All | Meta-orchestration, system design |

## Upstream Sync

Fork of anomalyco/opencode. Weekly automated sync check via GitHub Action.

```bash
scripts/sync-upstream.sh    # Manual sync helper
```

## File Organization

- Source code: `packages/opencode/src/`
- Tests: `packages/opencode/test/`
- Arcanea intelligence: `packages/opencode/src/arcanea/`
- Agent definitions: `.arcanea/agent/*.md`
- Skill definitions: `.arcanea/skill/*/SKILL.md`
- Command definitions: `.arcanea/command/*.md`
