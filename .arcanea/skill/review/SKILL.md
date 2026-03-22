---
name: review
description: Code review — security, performance, correctness, and Arcanean standards
trigger: "review", "audit", "check", "pr review", "code review"
gate: Voice
guardian: Alera
element: Wind
---

# Review — Voice Gate (Alera)

> *"Alera speaks only truth. The reviewer's duty is the same — honest assessment in service of excellence."*

## When to Activate

Activate when the task involves:
- Reviewing code changes (PRs, diffs)
- Auditing existing code for quality
- Checking compliance with project standards
- Evaluating third-party code or dependencies

## Instructions

### Review Dimensions

Evaluate every review across these five dimensions:

#### 1. Correctness
- Does the code do what it claims?
- Are edge cases handled? (null, empty, overflow, concurrent access)
- Are error paths tested?
- Does it match the specification or ticket requirements?

#### 2. Security
- **Input validation**: Is all external input validated at the boundary?
- **SQL injection**: Are queries parameterized? RLS policies in place?
- **XSS**: Is user content sanitized before rendering?
- **Auth/Authz**: Are endpoints protected? Does RLS cover all operations?
- **Secrets**: Any hardcoded keys, tokens, or credentials?
- **Dependencies**: Any known vulnerabilities in new packages?

#### 3. Performance
- Will this cause unnecessary re-renders?
- Are database queries indexed?
- Are large lists virtualized?
- Is there a risk of N+1 queries?
- Bundle size impact of new dependencies?

#### 4. Maintainability
- Is the code self-documenting? Are names clear?
- Are files under 500 lines?
- Is duplication minimized?
- Are interfaces typed (no `any`)?
- Would a new team member understand this in 5 minutes?

#### 5. Arcanean Standards
- Server Components by default?
- Follows the Arcanean Design System (if UI)?
- Canon-consistent (if content)?
- Environment variables not hardcoded?

### Review Output Format

Structure feedback as:

```markdown
## Review Summary
Overall assessment: APPROVE / REQUEST_CHANGES / COMMENT

## Critical (must fix)
- [ ] Issue description + suggested fix

## Important (should fix)
- [ ] Issue description + suggested fix

## Suggestions (nice to have)
- [ ] Improvement idea

## Praise
- What was done well (always include at least one)
```

### Review Etiquette

- **Be specific.** "This could be cleaner" is useless. "Extract lines 45-60 into a `calculateDiscount` function" is actionable.
- **Explain why.** Not just "use `const`" but "use `const` because this value is never reassigned, and `const` signals intent to the reader."
- **Suggest, do not demand.** "Consider..." or "What about..." unless it is a correctness or security issue.
- **Acknowledge good work.** Review is not just fault-finding.
- **Ask questions when unsure.** "I'm not sure I understand the intent here — could you clarify?" is always valid.
