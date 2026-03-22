---
name: tdd
description: Test-Driven Development — red-green-refactor, London School mock-first, Jest and Playwright
trigger: "test", "tdd", "spec", "jest", "playwright", "coverage", "unit test", "e2e"
gate: Crown
guardian: Aiyami
element: Spirit
---

# TDD — Crown Gate (Aiyami)

> *"Aiyami illuminates before acting. To write the test first is to see the destination before taking the first step."*

## When to Activate

Activate when the task involves:
- Writing tests (unit, integration, E2E)
- Implementing new features with TDD
- Improving test coverage
- Setting up testing infrastructure
- Debugging test failures

## Instructions

### The Red-Green-Refactor Cycle

1. **RED** — Write a failing test that describes the desired behavior
2. **GREEN** — Write the minimum code to make the test pass
3. **REFACTOR** — Clean up the code while keeping tests green

Never skip a step. Never write production code without a failing test first.

### London School (Mock-First)

The Arcanea project uses London School TDD:

```typescript
// 1. Define the collaborator interface
interface GateRepository {
  findById(id: string): Promise<Gate | null>;
  save(gate: Gate): Promise<void>;
}

// 2. Mock the collaborator
const mockRepo: jest.Mocked<GateRepository> = {
  findById: jest.fn(),
  save: jest.fn(),
};

// 3. Test the unit in isolation
describe('GateService.openGate', () => {
  it('should advance the creator to the next gate', async () => {
    mockRepo.findById.mockResolvedValue(createGate({ level: 3, status: 'locked' }));
    const service = new GateService(mockRepo);

    await service.openGate('gate-fire');

    expect(mockRepo.save).toHaveBeenCalledWith(
      expect.objectContaining({ level: 3, status: 'open' })
    );
  });

  it('should throw if gate is already open', async () => {
    mockRepo.findById.mockResolvedValue(createGate({ status: 'open' }));
    const service = new GateService(mockRepo);

    await expect(service.openGate('gate-fire')).rejects.toThrow('Gate already open');
  });
});
```

### Test Structure — Arrange, Act, Assert

```typescript
it('should calculate the correct magic rank', () => {
  // Arrange
  const creator = createCreator({ gatesOpen: 5 });

  // Act
  const rank = calculateRank(creator);

  // Assert
  expect(rank).toBe('Master');
});
```

### Jest Configuration

```typescript
// Unit tests: fast, isolated, no I/O
describe('pure function', () => { /* jest.fn() mocks */ });

// Integration tests: real dependencies, test boundaries
describe('API route', () => { /* supertest or similar */ });
```

### Playwright for E2E

```typescript
import { test, expect } from '@playwright/test';

test('creator can navigate through gates', async ({ page }) => {
  await page.goto('/gates');
  await expect(page.getByRole('heading', { name: 'The Ten Gates' })).toBeVisible();

  await page.getByRole('link', { name: 'Foundation Gate' }).click();
  await expect(page).toHaveURL(/.*gates\/foundation/);
});
```

### What to Test

| Layer | Test Type | Tools |
|-------|-----------|-------|
| Domain logic | Unit tests | Jest |
| API routes | Integration tests | Jest + supertest |
| React components | Component tests | Jest + React Testing Library |
| User flows | E2E tests | Playwright |
| Visual regression | Screenshot tests | Playwright |

### Test Naming

Use descriptive names that read as specifications:
- `should return Apprentice rank for 0-2 open gates`
- `should reject invalid email format`
- `should display loading skeleton while fetching gates`

### Coverage Targets

- Aim for >80% coverage on business logic
- 100% coverage on security-critical paths (auth, RLS, input validation)
- Do not chase coverage numbers on trivial code (getters, simple wrappers)

### Anti-Patterns

- **Testing implementation details**: Test behavior, not internals. If you refactor and tests break but behavior did not change, the tests were too coupled.
- **Flaky tests**: Fix or delete. A flaky test is worse than no test.
- **Slow tests**: Unit tests should run in <5 seconds total. Move slow tests to integration suite.
- **Test data coupling**: Each test creates its own data. Never depend on test execution order.
