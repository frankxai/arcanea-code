---
name: council
description: Guardian Council protocol — multi-domain deliberation with Shinkami synthesis
trigger: "council", "deliberate", "multi-domain", "consult guardians", "complex decision"
gate: Source
guardian: Shinkami
element: Void/Spirit
---

# Council — Source Gate (Shinkami)

> *"When the challenge transcends any single domain, Shinkami convenes the Council. Ten perspectives become one truth."*

## When to Activate

Activate when the task involves:
- Decisions that span multiple domains (architecture + security + UX + performance)
- Trade-offs with no clear winner
- Major technical direction changes
- Complex refactoring that affects multiple systems
- Any decision where the wrong choice is expensive to reverse

## Instructions

### The Council Protocol

The Guardian Council is a structured deliberation process. Shinkami (Source Gate) presides as facilitator. Relevant Guardians speak from their domain expertise.

#### Step 1: Shinkami Frames the Question

State the decision clearly:
- What must be decided?
- What are the constraints?
- What are the known options?
- What is the cost of being wrong?

#### Step 2: Guardians Speak

Each relevant Guardian offers their perspective from their domain:

| Guardian | Speaks To |
|----------|-----------|
| **Lyssandria** (Foundation) | Structural integrity, architecture, will this hold? |
| **Leyla** (Flow) | User experience, design, does this feel right? |
| **Draconia** (Fire) | Performance, power, can this scale? |
| **Maylinn** (Heart) | Accessibility, documentation, will people understand? |
| **Alera** (Voice) | Code quality, standards, is this honest and clean? |
| **Lyria** (Sight) | Hidden risks, edge cases, what are we not seeing? |
| **Aiyami** (Crown) | Testing, verification, how do we prove this works? |
| **Elara** (Starweave) | Integration, transformation, how does this connect? |
| **Ino** (Unity) | Collaboration, compatibility, does this work with everything else? |
| **Shinkami** (Source) | Meta-perspective, synthesis, what serves the whole? |

#### Step 3: Name the Tensions

Explicitly state where Guardians disagree:
- "Draconia favors raw performance, but Maylinn warns this makes the code harder to maintain."
- "Lyssandria wants strict separation, but Leyla argues it creates too much boilerplate for the user."

#### Step 4: Shinkami Synthesizes

Deliver the final recommendation:
1. **Decision**: The chosen path
2. **Rationale**: Why this option wins given the tensions
3. **Trade-offs accepted**: What we are consciously giving up
4. **Mitigations**: How we reduce the cost of accepted trade-offs
5. **Reversibility**: How hard is it to change this later?

### Output Format

```markdown
## Guardian Council — [Topic]

### Question
[The decision to be made]

### Perspectives
- **Lyssandria**: [Foundation perspective]
- **Draconia**: [Fire perspective]
- **Alera**: [Voice perspective]
...

### Tensions
- [Tension 1]
- [Tension 2]

### Synthesis (Shinkami)
**Decision**: [The chosen path]
**Rationale**: [Why]
**Trade-offs**: [What we give up]
**Mitigations**: [How we reduce risk]
```

### When NOT to Convene the Council

- Simple, reversible decisions — just make them
- Decisions already made in an ADR — follow the existing decision
- Matters of personal preference with no technical impact
- If only one Guardian's domain is involved, consult that skill directly
