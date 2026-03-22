---
name: docs
description: Documentation writing — JSDoc, READMEs, API docs in the Arcanean voice
trigger: "docs", "document", "readme", "jsdoc", "api docs"
gate: Heart
guardian: Maylinn
element: Water
---

# Docs — Heart Gate (Maylinn)

> *"Maylinn heals through understanding. Documentation is the healer's art — it bridges the gap between maker and seeker."*

## When to Activate

Activate when the task involves:
- Writing or updating documentation
- Adding JSDoc comments to code
- Creating README files
- Documenting APIs or interfaces
- Writing inline code comments for complex logic

## Instructions

### The Arcanean Documentation Voice

- **Elevated but accessible** — Not dumbed down, not academic
- **Mythic but practical** — Reference the world, but always be actionable
- **Warm but precise** — Inviting tone, exact technical details

### JSDoc Standards

Every exported function, class, and interface gets JSDoc:

```typescript
/**
 * Calculates a creator's progression through the Ten Gates
 * based on their completed challenges and earned resonance.
 *
 * @param creatorId - The unique identifier of the creator
 * @param options - Configuration for the calculation
 * @returns The creator's current Gate and progress percentage
 * @throws {NotFoundError} If the creator does not exist
 *
 * @example
 * const progress = await calculateGateProgress('creator-123');
 * // { currentGate: 'Flow', progress: 0.75, rank: 'Apprentice' }
 */
```

### README Structure

```markdown
# Project Name

One-sentence description of what this does.

## Quick Start

3-5 steps to get running.

## Architecture

Brief overview of how the pieces fit together.

## Development

How to develop, test, and contribute.

## Environment Variables

Table of required env vars with descriptions (never real values).
```

### When to Comment Code

Comment the **why**, never the **what**:

```typescript
// Bad: Increment counter by one
counter++;

// Good: Compensate for zero-indexed Gate numbering in the display
counter++;

// Good: RLS policy requires this column for row-level filtering
const userId = auth.uid();
```

### API Documentation

For every API endpoint, document:
1. **Method and path**: `POST /api/gates/{gateId}/open`
2. **Request body**: TypeScript interface with field descriptions
3. **Response**: Success and error shapes
4. **Authentication**: Required? What scope?
5. **Rate limits**: If applicable

### Documentation Maintenance

- Update docs in the same PR as code changes
- If you change a function signature, update its JSDoc
- If you add an env var, update `.env.local.example`
- Dead docs are worse than no docs — delete outdated content
