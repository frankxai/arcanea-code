# Arcanea Code

**The rich TUI surface** of the Arcanea Multi-Coding Agent System (AMCAS). A maintained fork of [OpenCode](https://github.com/opencode-ai/opencode), shaped for Arcanea creators.

Sits on top of **[`@arcanea/orchestrator`](https://www.npmjs.com/package/@arcanea/orchestrator)** (the routing/swarm brain). Use `arcanea-code` when you want a beautiful, interactive TUI. Use the orchestrator when you want to script or compose.

## What this repo is

- Arcanea's fork of OpenCode, tuned for multi-model development workflows
- Guardian routing, canon awareness, design-system discipline
- The preferred **daily-driver** surface for Arcanea creators in the terminal

## What this repo is NOT

- Not a router — routing lives in [`@arcanea/orchestrator`](https://www.npmjs.com/package/@arcanea/orchestrator) and [`@arcanea/router-spec`](https://www.npmjs.com/package/@arcanea/router-spec)
- Not a replacement for your existing CLIs — it composes with them
- Not the Arcanea product itself — see [arcanea.ai](https://arcanea.ai) for the creator platform

## Install (forthcoming)

Currently in migration from a thin Guardian-routed CLI to a full OpenCode fork. Until v0.2, use `@arcanea/orchestrator` directly:

```bash
npm i -g @arcanea/orchestrator
arcanea-orchestrator doctor
```

When the OpenCode fork lands, this repo will publish `arcanea-code` as the installable TUI:

```bash
# Future:
npm install -g arcanea-code
arcanea-code                         # opens the TUI
```

## Architecture (AMCAS)

```
┌─────────────────────────────────┐
│  arcanea-code  (this repo)      │  ← daily-driver TUI, OpenCode fork
│  rich surface, interactive      │
└──────────────┬──────────────────┘
               │ shells out / API
               ▼
┌─────────────────────────────────┐
│  @arcanea/orchestrator          │  ← the brain
│  routes, plans, swarms, learns  │
└──────────────┬──────────────────┘
               │ execs
               ▼
┌─────────────────────────────────┐
│  claude / opencode / codex /    │
│  gemini  sub-CLIs                │
└─────────────────────────────────┘
```

## Related

- **[@arcanea/orchestrator](https://www.npmjs.com/package/@arcanea/orchestrator)** — routing + swarm brain (install this today)
- **[@arcanea/router-spec](https://www.npmjs.com/package/@arcanea/router-spec)** — canonical routing declarations
- **[arcanea-orchestrator](https://github.com/frankxai/arcanea-orchestrator)** — orchestrator source repo + Composio AO fork for swarm sessions
- **[oh-my-arcanea](https://github.com/frankxai/oh-my-arcanea)** — OpenCode overlay (canon + skills + agents), compatible with this fork
- **[arcanea](https://github.com/frankxai/arcanea)** — public mirror of Arcanea.ai

## License

MIT. See `LICENSE`. Upstream OpenCode license preserved. Provided "AS IS" without warranty. Not affiliated with OpenCode, Anthropic, OpenAI, Google, or any model provider.

<!-- STARLIGHT:OPERATING:BEGIN v2 sha=9f8fecc91edc source=794db1e51a55a128816f7aa266eb0ac1dbd452c3 -->

## Agent operating guidance

Repository agents use the shared Starlight operating contract in `AGENTS.md` alongside local instructions.
The contract asks agents to establish a useful outcome, select relevant skills, complete authorized work,
verify current sources, refine the actual artifact, and report evidence and remaining gates.
It covers human agency, privacy, rights, resource stewardship and bounded proactivity.
Repository identity, brand, canon, build commands and release gates remain local.

[Pinned contract](https://github.com/frankxai/Starlight-Intelligence-System/blob/794db1e51a55a128816f7aa266eb0ac1dbd452c3/docs/architecture/agents-md/band-a.md)
· [Projection and verification](https://github.com/frankxai/Starlight-Intelligence-System/blob/794db1e51a55a128816f7aa266eb0ac1dbd452c3/docs/architecture/AGENTS-MD-CONTRACT.md)

These files supply operating guidance. They do not activate an agent, grant tool permissions,
schedule recurring work, certify compliance or prove a live capability.

<!-- STARLIGHT:OPERATING:END -->
