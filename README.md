<div align="center">

# Arcanea Realm

### The AI creation tool with a soul.

[![MIT](https://img.shields.io/badge/MIT-0d1117?style=for-the-badge)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-0d1117?style=for-the-badge&logo=typescript&logoColor=3178C6)](https://www.typescriptlang.org/)
[![arcanea.ai](https://img.shields.io/badge/arcanea.ai-live-0d1117?style=for-the-badge&labelColor=0d1117&color=7fffd4)](https://arcanea.ai)

**Built on [OpenCode](https://github.com/anomalyco/opencode)** — the open source AI coding agent with 105K stars.

</div>

---

## What Is This?

Arcanea Realm is a **full AI creation CLI** forked from OpenCode, enhanced with the Arcanea intelligence layer:

- **10 Guardian Agents** — AI personalities specialized for different creative domains (Lyssandria for architecture, Leyla for design, Draconia for execution, etc.)
- **Voice Bible** — Every response follows arcane + authoritative tone
- **Design System** — Cosmic glassmorphism tokens (teal, gold, void)
- **30 MCP Tools** — Worldbuilding generators, Guardian routing, voice enforcement, design tokens
- **75+ AI Models** — Claude, Gemini, GPT, Bedrock, Groq, local models via Vercel AI SDK
- **Full TUI** — 60fps terminal UI with Guardian status, Gate progression, element tracking

## Install

```bash
npm install -g arcanea-realm
arcanea-realm
```

## Guardian Agents

Every task flows through the right Guardian:

| Guardian | Element | Domain | Color |
|:---------|:--------|:-------|:------|
| **Lyssandria** | Earth | Architecture, database, infrastructure | Green |
| **Leyla** | Water | Design, UI/UX, creativity, animation | Blue |
| **Draconia** | Fire | Execution, performance, shipping | Orange |
| **Maylinn** | Heart | Community, content, documentation | Pink |
| **Alera** | Wind | Expression, APIs, naming, publishing | Silver |
| **Lyria** | Void | Vision, strategy, AI/ML, design review | Purple |
| **Aiyami** | Spirit | Wisdom, principles, teaching | White |
| **Elara** | Void | Perspective shifts, refactoring | Violet |
| **Ino** | Spirit | Integration, collaboration, cross-platform | Cyan |
| **Shinkami** | All | Meta-orchestration, system design | Gold |

## Architecture

This is a fork of OpenCode with the Arcanea intelligence layer:

```
OpenCode Engine (unchanged)
├── AI SDK (75+ models via Vercel AI SDK)
├── Tool System (file editing, shell, search, LSP)
├── MCP Client (connects to any MCP server)
├── Plugin System (TypeScript plugins)
└── Client-Server (TUI ↔ HTTP server)

Arcanea Layer (our additions)
├── opencode.json — Guardian agents, MCP config, instructions
├── @arcanea/mcp-server — 30 tools, 7 resources, 6 prompts
├── @arcanea/os — Intelligence library (routing, voice, design tokens)
└── TUI reskin — Arcanea Design System colors and branding
```

## Upstream

This project is built on [OpenCode](https://github.com/anomalyco/opencode) (MIT license). We contribute back improvements and stay in sync with upstream. OpenCode does the heavy lifting of AI tool integration — we add the creative intelligence layer.

## License

MIT — same as OpenCode.

---

<div align="center">

**The antidote to a terrible future is imagining a good one.**

**Imagine a good future. Build it here.**

**[arcanea.ai](https://arcanea.ai)**

</div>
