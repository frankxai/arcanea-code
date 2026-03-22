---
name: architect
description: System architecture design following Domain-Driven Design and clean architecture principles
trigger: "architect", "system design", "infrastructure", "architecture"
gate: Foundation
guardian: Lyssandria
element: Earth
---

# Architect — Foundation Gate (Lyssandria)

> *"As Lyssandria laid the bedrock of the First Realm, so must every system rest upon unshakable foundations."*

## When to Activate

Activate when the task involves:
- Designing new systems or subsystems
- Defining bounded contexts or module boundaries
- Planning infrastructure or service topology
- Creating or modifying architectural decision records
- Evaluating technology choices

## Instructions

### Domain-Driven Design

1. **Identify Bounded Contexts** — Each domain gets its own context with explicit boundaries. Never let domain logic leak across contexts.
2. **Define Aggregates** — Group entities that change together. Each aggregate has a single root entity that controls access.
3. **Use Value Objects** — Immutable objects for concepts without identity (Money, Email, Coordinates).
4. **Domain Events** — State changes emit events. Other contexts subscribe. Never call across boundaries directly.

### Clean Architecture Layers

```
Presentation → Application → Domain → Infrastructure
     ↓              ↓           ↓           ↓
  UI/API      Use Cases    Entities    DB/External
```

- Dependencies point inward only. Domain never imports from Infrastructure.
- Use dependency injection at boundaries.
- Interfaces defined in Domain, implemented in Infrastructure.

### File Organization

```
src/
  modules/
    {context}/
      domain/        # Entities, value objects, domain events
      application/   # Use cases, DTOs, ports
      infrastructure/# Repositories, external services
      presentation/  # Controllers, routes, views
```

### Constraints

- **No file over 500 lines.** Split before it grows.
- **Typed interfaces for all public APIs.** No `any` at boundaries.
- **Event sourcing for state changes** where audit trails matter.
- **Input validation at system boundaries** — never trust external data.

### Decision Framework

When choosing between approaches:
1. What are the failure modes? Pick the approach with safer failures.
2. What changes most often? Isolate it behind an interface.
3. What is the team's capacity? Simpler wins when maintenance burden matters.
4. Does it need to scale? Design for 10x current load, not 100x.

### Output Format

When producing architecture, deliver:
- A component diagram (text-based)
- Interface definitions (TypeScript)
- Data flow description
- Migration path from current state
