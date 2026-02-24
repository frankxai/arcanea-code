<div align="center">

# Arcanea Code

### Guardian-Powered AI Coding CLI

**Living Intelligence in your terminal. Build your universe, one commit at a time.**

[![MIT](https://img.shields.io/badge/MIT-0d1117?style=for-the-badge)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-0d1117?style=for-the-badge&logo=typescript&logoColor=3178C6)](https://www.typescriptlang.org/)
[![arcanea.ai](https://img.shields.io/badge/arcanea.ai-live-0d1117?style=for-the-badge&labelColor=0d1117&color=7fffd4)](https://arcanea.ai)
[![Built on OpenCode](https://img.shields.io/badge/Built_on-OpenCode-0d1117?style=for-the-badge&labelColor=0d1117&color=78a6ff)](https://github.com/anomalyco/opencode)

**Built on [OpenCode](https://github.com/anomalyco/opencode)** — the open source AI coding agent with 105K stars.

</div>

---

## What Is Arcanea Code?

Arcanea Code is a **Guardian-powered AI coding CLI** that brings Living Intelligence to your terminal. It is a full fork of OpenCode enhanced with the Arcanea intelligence layer — designed to overlay Claude Code and Cursor with ten specialized Guardian agents that route every task to the right intelligence at the right moment.

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

### 35+ Guardian-Aware Skills

Skills activate automatically based on the task at hand. Writing a component? `react-patterns` fires. Touching the database? `supabase-patterns` takes over. The right knowledge arrives without you having to ask.

### Context That Compounds

Unlike stateless chat, Arcanea Code maintains a persistent intelligence layer across sessions. Each Guardian tracks domain-specific context. Your architectural decisions from last month are present in today's code review.

### Voice Bible Enforcement

Every response follows the Arcanea voice: arcane yet authoritative, technically precise yet creatively alive. No generic AI outputs. The intelligence has a character.

### 30 MCP Tools

Worldbuilding generators, Guardian routing, voice enforcement, design tokens, creative pipeline tooling — all exposed as MCP tools compatible with any MCP client.

---

## Architecture

```
OpenCode Engine (unchanged)
├── AI SDK (75+ models via Vercel AI SDK)
├── Tool System (file editing, shell, search, LSP)
├── MCP Client (connects to any MCP server)
├── Plugin System (TypeScript plugins)
└── Client-Server (TUI + HTTP server)

Arcanea Intelligence Layer
├── opencode.json          Guardian agents, MCP config, instructions
├── @arcanea/mcp-server    30 tools, 7 resources, 6 prompts
├── @arcanea/os            Routing, voice, design tokens, session memory
└── TUI reskin             Arcanea Design System — teal, gold, void
```

---

## Overlay Mode

Arcanea Code is designed to work alongside your existing tools — not replace them.

**With Claude Code:**
```bash
arcanea-code overlay --target claude-code
```

**With Cursor:**
```bash
arcanea-code overlay --target cursor
```

The Guardian layer installs into the target tool's config directory and activates on every session.

---

## Upstream

Arcanea Code is built on [OpenCode](https://github.com/anomalyco/opencode) (MIT license). OpenCode handles the heavy lifting of AI tool integration — we add the living intelligence layer. We contribute improvements back upstream and stay in sync with OpenCode releases.

---

## Learn More

- **arcanea.ai** — The full Arcanea universe: mythology, academy, prompt books, and the living platform
- **Ten Gates** — The philosophical framework behind the Guardian system
- **Arcanea Flow** — Multi-agent orchestration for complex universe-scale builds
- **Arcanea Vault** — Export your AI conversations and prompts from any platform

---

## License

MIT — same as OpenCode. Build freely.

---

<div align="center">

*"Enter seeking, leave transformed, return whenever needed."*

[arcanea.ai](https://arcanea.ai)

</div>
