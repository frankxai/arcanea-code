# Contributing to Arcanea Code

Arcanea Code is a Guardian-powered fork of [OpenCode](https://github.com/anomalyco/opencode). We welcome contributions that enhance the intelligence layer while maintaining upstream compatibility.

## What We're Looking For

- Guardian agent definitions (`.arcanea/agent/*.md`)
- New skills (`.arcanea/skill/*/SKILL.md`)
- Creative domain integrations (code, lore, art, music, publishing)
- Intelligence routing improvements
- Bug fixes from upstream
- Theme and TUI enhancements
- Documentation with the Arcanean voice

## Architecture

```
Arcanea Code = OpenCode Engine + Arcanea Intelligence Layer

OpenCode Engine (upstream, synced weekly)
├── AI SDK, Tool System, MCP, Plugin System, TUI

Arcanea Intelligence Layer (our additions)
├── .arcanea/agent/         10 Guardians + 11 Workers + Custom
├── .arcanea/skill/         17+ Guardian-aware skills
├── .arcanea/command/       Custom commands (/guardian, /council, etc.)
├── .arcanea/themes/        Cosmic theme
├── packages/opencode/src/arcanea/   Intelligence OS core
└── scripts/sync-upstream.sh         Upstream sync workflow
```

## Development Setup

```bash
# Clone
git clone https://github.com/frankxai/arcanea-code.git
cd arcanea-code

# Install dependencies
bun install

# Run dev mode
bun dev

# Typecheck
bun typecheck

# Test
bun test
```

## Upstream Sync

We stay in sync with anomalyco/opencode:

```bash
# Check how far behind we are
scripts/sync-upstream.sh

# Weekly automated check via GitHub Actions
# See .github/workflows/upstream-sync.yml
```

### When adding features:
1. **Arcanea-specific code** goes in `packages/opencode/src/arcanea/` or `.arcanea/`
2. **Upstream-compatible changes** should be minimal touches to upstream files
3. **Branding changes** use dual support (ARCANEA_* + OPENCODE_* env vars)

## Adding a Guardian Agent

Create `.arcanea/agent/your-agent.md`:

```markdown
---
name: your-agent
description: What it does
model: optional-model-override
allowedTools:
  - Bash
  - Read
  - Write
  - Edit
---

Your agent prompt here. Make it substantial —
the prompt is what makes the agent intelligent.
```

## Adding a Skill

Create `.arcanea/skill/your-skill/SKILL.md`:

```markdown
---
name: your-skill
description: What it does
trigger: When to activate
---

# Skill Name

## When to Activate
...

## Instructions
...
```

## The Arcanean Voice

When writing documentation or prompts:
- **Elevated but accessible** — mythic but practical
- **Always actionable** — wisdom must be usable
- **Canon-aware** — reference the Ten Gates, Five Elements, Guardians
- **Not entertainment — equipment for living**

## Environment Variables

Arcanea Code supports both prefixes:
- `ARCANEA_*` — preferred, checked first
- `OPENCODE_*` — backward compatible, fallback

## License

MIT — same as OpenCode.
