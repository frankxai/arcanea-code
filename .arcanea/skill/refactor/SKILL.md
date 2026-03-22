---
name: refactor
description: Code refactoring — extract, simplify, restructure while preserving behavior
trigger: "refactor", "clean", "simplify", "restructure", "extract", "split"
gate: Fire
guardian: Draconia
element: Fire
---

# Refactor — Fire Gate (Draconia)

> *"Draconis breathes fire not to destroy, but to forge. Refactoring burns away impurity, leaving only strength."*

## When to Activate

Activate when the task involves:
- Reducing complexity in existing code
- Extracting reusable functions or components
- Splitting large files (over 500 lines)
- Removing duplication
- Improving naming and readability

## Instructions

### The Refactoring Protocol

1. **Ensure tests exist.** Never refactor without a safety net. If tests are missing, write characterization tests first.
2. **Make one change at a time.** Each refactoring step should be independently verifiable.
3. **Run tests after every step.** Green stays green.
4. **Commit frequently.** Each refactoring gets its own commit so you can revert cleanly.

### Common Refactoring Moves

**Extract Function** — When a block of code has a clear purpose:
```typescript
// Before
function processOrder(order: Order) {
  // 20 lines calculating discount
  // 10 lines applying tax
  // 15 lines formatting receipt
}

// After
function processOrder(order: Order) {
  const discount = calculateDiscount(order);
  const total = applyTax(order.subtotal - discount);
  return formatReceipt(order, total);
}
```

**Extract Component** — When JSX grows beyond one screen:
- If a section has its own state, extract it
- If a section is reused, extract it
- If the parent exceeds 150 lines of JSX, extract parts

**Inline** — When indirection hides meaning:
- One-line functions called once? Inline them
- Wrapper components that add nothing? Remove them

**Rename** — When names lie or obscure:
- `data` → `userProfiles`
- `handle` → `handleGateOpen`
- `temp` → `pendingNotifications`

### Complexity Thresholds

| Metric | Threshold | Action |
|--------|-----------|--------|
| File length | > 500 lines | Split into modules |
| Function length | > 30 lines | Extract sub-functions |
| Parameter count | > 4 params | Use options object |
| Nesting depth | > 3 levels | Extract or use early returns |
| Cyclomatic complexity | > 10 | Decompose logic |

### Early Return Pattern

```typescript
// Before — deeply nested
function getAccess(user: User) {
  if (user) {
    if (user.isActive) {
      if (user.hasPermission('admin')) {
        return 'admin';
      }
    }
  }
  return 'none';
}

// After — flat and clear
function getAccess(user: User) {
  if (!user) return 'none';
  if (!user.isActive) return 'none';
  if (!user.hasPermission('admin')) return 'none';
  return 'admin';
}
```

### What NOT to Refactor

- Code that is about to be deleted
- Code you do not understand yet (read first, refactor second)
- Working code under time pressure with no tests
- External library internals
