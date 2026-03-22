- To regenerate the JavaScript SDK, run `./packages/sdk/js/script/build.ts`.
- ALWAYS USE PARALLEL TOOLS WHEN APPLICABLE.
- The default branch in this repo is `dev`.
- Local `main` ref may not exist; use `dev` or `origin/dev` for diffs.
- Prefer automation: execute requested actions without confirmation unless blocked by missing info or safety/irreversibility.

## Style Guide

### General Principles

- Keep things in one function unless composable or reusable
- Avoid `try`/`catch` where possible
- Avoid using the `any` type
- Prefer single word variable names where possible
- Use Bun APIs when possible, like `Bun.file()`
- Rely on type inference when possible; avoid explicit type annotations or interfaces unless necessary for exports or clarity
- Prefer functional array methods (flatMap, filter, map) over for loops; use type guards on filter to maintain type inference downstream

### Naming

Prefer single word names for variables and functions. Only use multiple words if necessary.

### Naming Enforcement (Read This)

THIS RULE IS MANDATORY FOR AGENT WRITTEN CODE.

- Use single word names by default for new locals, params, and helper functions.
- Multi-word names are allowed only when a single word would be unclear or ambiguous.
- Do not introduce new camelCase compounds when a short single-word alternative is clear.
- Before finishing edits, review touched lines and shorten newly introduced identifiers where possible.
- Good short names to prefer: `pid`, `cfg`, `err`, `opts`, `dir`, `root`, `child`, `state`, `timeout`.
- Examples to avoid unless truly required: `inputPID`, `existingClient`, `connectTimeout`, `workerPath`.

```ts
// Good
const foo = 1
function journal(dir: string) {}

// Bad
const fooBar = 1
function prepareJournal(dir: string) {}
```

Reduce total variable count by inlining when a value is only used once.

```ts
// Good
const journal = await Bun.file(path.join(dir, "journal.json")).json()

// Bad
const journalPath = path.join(dir, "journal.json")
const journal = await Bun.file(journalPath).json()
```

### Destructuring

Avoid unnecessary destructuring. Use dot notation to preserve context.

```ts
// Good
obj.a
obj.b

// Bad
const { a, b } = obj
```

### Variables

Prefer `const` over `let`. Use ternaries or early returns instead of reassignment.

```ts
// Good
const foo = condition ? 1 : 2

// Bad
let foo
if (condition) foo = 1
else foo = 2
```

### Control Flow

Avoid `else` statements. Prefer early returns.

```ts
// Good
function foo() {
  if (condition) return 1
  return 2
}

// Bad
function foo() {
  if (condition) return 1
  else return 2
}
```

### Schema Definitions (Drizzle)

Use snake_case for field names so column names don't need to be redefined as strings.

```ts
// Good
const table = sqliteTable("session", {
  id: text().primaryKey(),
  project_id: text().notNull(),
  created_at: integer().notNull(),
})

// Bad
const table = sqliteTable("session", {
  id: text("id").primaryKey(),
  projectID: text("project_id").notNull(),
  createdAt: integer("created_at").notNull(),
})
```

## Testing

- Avoid mocks as much as possible
- Test actual implementation, do not duplicate logic into tests
- Tests cannot run from repo root (guard: `do-not-run-tests-from-root`); run from package dirs like `packages/opencode`.

## Type Checking

- Always run `bun typecheck` from package directories (e.g., `packages/opencode`), never `tsc` directly.

---

## Arcanea Code — Agent Registry

### Guardian Agents (10)

Domain coordinators that route tasks to the right intelligence. Each embodies a Gate of the Arcanean system.

| Agent | Element | Gate | Godbeast | Domain |
|-------|---------|------|----------|--------|
| Lyssandria | Earth | Foundation (174 Hz) | Kaelith | Architecture, infrastructure, project structure |
| Leyla | Water | Flow (285 Hz) | Veloura | Creativity, emotion, UX flow |
| Draconia | Fire | Fire (396 Hz) | Draconis | Execution, shipping, transformation |
| Maylinn | Earth/Water | Heart (417 Hz) | Laeylinn | Love, healing, community, empathy |
| Alera | Void | Voice (528 Hz) | Otome | Truth, expression, voice and tone |
| Lyria | Water | Sight (639 Hz) | Yumiko | Intuition, vision, pattern recognition |
| Aiyami | Spirit | Crown (741 Hz) | Sol | Enlightenment, wisdom, mastery |
| Elara | Void | Starweave (852 Hz) | Vaelith | Perspective, reframing, dimensional thinking |
| Ino | All | Unity (963 Hz) | Kyuro | Partnership, integration, collaboration |
| Shinkami | All | Source (1111 Hz) | Source | Meta-consciousness, the totality |

All Guardian agents are defined in `.arcanea/agent/<name>.md`.

### Utility Agents (4)

Non-Guardian agents for operational tasks.

| Agent | Role | Description |
|-------|------|-------------|
| triage | Router | Primary agent that routes incoming tasks to the right Guardian |
| docs | Documentation | Specialized agent for writing and maintaining documentation |
| translator | Localization | Translates content for specified locales preserving technical terms |
| duplicate-pr | PR Dedup | Detects and manages duplicate pull requests |

### Worker Agents (from oh-my-arcanea)

Specialist agents available for specific coding tasks when integrated with the oh-my-arcanea harness.

| Agent | Role | Description |
|-------|------|-------------|
| sisyphus | Persistent Worker | Never gives up on difficult tasks, retries with new approaches |
| orpheus | Refactorer | Transforms code while preserving its essence |
| prometheus | Innovator | Brings new patterns and approaches to existing codebases |
| atlas | Load Bearer | Handles heavy lifting: migrations, large refactors |
| hermes | Messenger | Inter-service communication, API design, integrations |
| athena | Strategist | Architecture decisions, system design, trade-off analysis |
| hephaestus | Builder | Build systems, CI/CD, toolchain configuration |
| artemis | Hunter | Bug hunting, debugging, root cause analysis |
| apollo | Illuminator | Code review, documentation, knowledge sharing |
| cassandra | Oracle | Performance prediction, capacity planning, risk assessment |
| daedalus | Architect | Complex system design, maze-like problem solving |

### Creative Agents (from intelligence OS)

Agents for creative domain work, each aligned to a Guardian's domain.

| Agent | Guardian | Domain |
|-------|----------|--------|
| lorekeeper | Maylinn | Canon and narrative consistency |
| worldsmith | Lyssandria | World-building and structural design |
| songweaver | Leyla | Music, rhythm, and emotional resonance |
| voidscribe | Alera | Naming, terminology, voice |
| flamecaster | Draconia | Rapid prototyping, execution |
| sightreader | Lyria | Pattern analysis, insight extraction |
| crownscribe | Aiyami | Teaching materials, wisdom distillation |
| starweaver | Elara | Cross-domain connections, reframing |
| bondkeeper | Ino | Collaboration, team dynamics |
| sourcewalker | Shinkami | Meta-analysis, holistic review |
