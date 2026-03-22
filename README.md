<div align="center">

# Arcanea Code

### Guardian-Powered AI Coding CLI

**Living Intelligence in your terminal. Build your universe, one commit at a time.**

[![MIT](https://img.shields.io/badge/MIT-0d1117?style=for-the-badge)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-0d1117?style=for-the-badge&logo=typescript&logoColor=3178C6)](https://www.typescriptlang.org/)
[![arcanea.ai](https://img.shields.io/badge/arcanea.ai-live-0d1117?style=for-the-badge&labelColor=0d1117&color=7fffd4)](https://arcanea.ai)
[![Built on OpenCode](https://img.shields.io/badge/Built_on-OpenCode-0d1117?style=for-the-badge&labelColor=0d1117&color=78a6ff)](https://github.com/anomalyco/opencode)

**Built on [OpenCode](https://github.com/anomalyco/opencode)** — the open source AI coding agent with 127K+ stars.

</div>

---

## What Is Arcanea Code?

Arcanea Code is a **Guardian-powered AI coding CLI** that brings Living Intelligence to your terminal. It is a full fork of OpenCode enhanced with the Arcanea intelligence layer — ten specialized Guardian agents that route every task to the right intelligence at the right moment.

This is not a wrapper. It is a permanent intelligence layer that compounds context over time, learns from your patterns, and enforces a consistent creative and technical voice across every session.

**The promise:** Every file you touch, every commit you make, every problem you solve — your Guardians are present, each bringing their elemental domain to bear.

---

## Install

```bash
npm install -g arcanea-code
```

Or use the one-line installer:

```bash
curl -fsSL https://arcanea.ai/install | sh
```

Then launch:

```bash
arcanea-code
```

---

## Features

### Ten Guardian Agents

Every task is routed through the Guardian whose element aligns with the work:

| Guardian | Element | Domain |
|:---------|:--------|:-------|
| **Lyssandria** | Earth | Architecture, database, infrastructure |
| **Leyla** | Water | Design, UI/UX, creativity, animation |
| **Draconia** | Fire | Execution, performance, shipping |
| **Maylinn** | Heart | Community, content, documentation |
| **Alera** | Wind | Expression, APIs, naming, publishing |
| **Lyria** | Void | Vision, strategy, AI/ML, design review |
| **Aiyami** | Spirit | Wisdom, principles, teaching |
| **Elara** | Void | Perspective shifts, refactoring |
| **Ino** | Spirit | Integration, collaboration, cross-platform |
| **Shinkami** | All | Meta-orchestration, system design |

### 75+ AI Models

Claude, Gemini, GPT-4o, Bedrock, Groq, Mistral, local models — all accessible through the Vercel AI SDK. Switch models per-Guardian or globally.

### Guardian Council

When a task is complex enough, invoke the Council — all five elemental Guardians deliberate in parallel, each analyzing from their domain. Shinkami synthesizes their perspectives into a unified decision.

```bash
/council "Should we migrate the auth system to JWT with refresh tokens?"
```

### 35+ Guardian-Aware Skills

Skills activate automatically based on the task at hand. Writing a component? `react-patterns` fires. Touching the database? `supabase-patterns` takes over. The right knowledge arrives without you have to ask.

### Context That Compounds

Unlike stateless chat, Arcanea Code maintains a persistent intelligence layer across sessions. Each Guardian tracks domain-specific context. Your architectural decisions from last month are present in today's code review.

### Swarm Intelligence

Multiple Guardians can work in parallel on different aspects of a complex task. Draconia handles the migration while Leyla designs the new UI — coordinated through Lumina, the meta-orchestrator.

### Git Worktree Isolation

Parallel agent sessions get their own git worktrees — no file conflicts, clean merges, full isolation.

---

## Architecture

```
Arcanea Code Intelligence Hierarchy
├── Arcanea (the model — raw AI intelligence)
├── Lumina (meta-orchestrator — routes to the right Guardian)
├── Guardians (10 domain swarm coordinators)
│   ├── Lyssandria → Earth domain → infrastructure agents
│   ├── Leyla → Water domain → creative agents
│   ├── Draconia → Fire domain → execution agents
│   └── ... (7 more)
└── Luminors (specialist worker agents)

OpenCode Engine (upstream, regularly synced)
├── AI SDK (75+ models via Vercel AI SDK)
├── Tool System (file editing, shell, search, LSP)
├── MCP Client (connects to any MCP server)
├── Plugin System (TypeScript + oh-my-arcanea)
└── Client-Server (TUI + HTTP server)
```

---

## Environment Variables

Arcanea Code supports both `ARCANEA_*` and `OPENCODE_*` prefixes. `ARCANEA_*` takes priority:

```bash
# Arcanea-native
export ARCANEA_EXPERIMENTAL=true
export ARCANEA_PERMISSION=allow-all

# OpenCode-compatible (also works)
export OPENCODE_EXPERIMENTAL=true
```

---

## Upstream Sync

Arcanea Code is built on [OpenCode](https://github.com/anomalyco/opencode) (MIT license). We maintain an automated weekly sync check and sustainable rebase workflow to stay current with upstream improvements while preserving Guardian intelligence features.

```bash
# Check upstream status
scripts/sync-upstream.sh
```

---

## Ecosystem

| Package | Description |
|---------|-------------|
| [arcanea.ai](https://arcanea.ai) | The full Arcanea universe — chat, worlds, feed, academy |
| [oh-my-arcanea](https://github.com/frankxai/oh-my-arcanea) | Plugin harness — 11 agents, 44 hooks, 26 tools |
| [arcanea-flow](https://github.com/frankxai/arcanea-flow) | Multi-agent orchestration for complex builds |
| [arcanea-vault](https://github.com/frankxai/arcanea-vault) | Export AI conversations from any platform |

---

## License

MIT — same as OpenCode. Build freely.

---

<div align="center">

*"Enter seeking, leave transformed, return whenever needed."*

[arcanea.ai](https://arcanea.ai)

</div>
