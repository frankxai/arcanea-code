---
name: react-patterns
description: React 19 and Next.js 16 best practices — Server Components, hooks, state management
trigger: "*.tsx", "component", "react", "hook", "state", "server component", "client component"
gate: Flow
guardian: Leyla
element: Water
---

# React Patterns — Flow Gate (Leyla)

> *"Water adapts to its container yet loses none of its nature. Components must be equally fluid."*

## When to Activate

Activate when the task involves:
- Creating or modifying React components
- Working with `.tsx` files
- Managing state (local, global, server)
- Data fetching patterns
- React hooks usage

## Instructions

### Server Components First

**Default to Server Components.** Only add `'use client'` when you need:
- Event handlers (onClick, onChange, onSubmit)
- useState, useEffect, useRef
- Browser APIs (window, document, localStorage)
- Third-party client libraries

```tsx
// Server Component (default) — runs on server, zero JS shipped
export default async function GateList() {
  const gates = await getGates(); // Direct DB access
  return (
    <ul>
      {gates.map(gate => <GateCard key={gate.id} gate={gate} />)}
    </ul>
  );
}

// Client Component — only when interactivity required
'use client';
export function GateProgressBar({ gateId }: { gateId: string }) {
  const [progress, setProgress] = useState(0);
  // ... interactive logic
}
```

### Component Architecture

1. **Composition over inheritance.** Use children and render props, never class inheritance.
2. **Single responsibility.** One component, one job. Extract when it does two things.
3. **Props interface always typed.** Define with `interface`, not inline.
4. **Colocation.** Keep related files together: `gate-card.tsx`, `gate-card.test.tsx`, `use-gate.ts`.

```tsx
interface GateCardProps {
  gate: Gate;
  onOpen?: (gateId: string) => void;
  variant?: 'compact' | 'expanded';
}

export function GateCard({ gate, onOpen, variant = 'compact' }: GateCardProps) {
  // ...
}
```

### Hooks Patterns

- **Custom hooks** for reusable logic: `useGateProgress`, `useElementAffinity`
- **useCallback** only when passing to memoized children or deps arrays
- **useMemo** only for expensive computations (profile first)
- **useRef** for DOM access and mutable values that do not trigger re-renders

### State Management

| Scope | Tool |
|-------|------|
| Component-local | `useState` |
| Shared across siblings | Lift state to parent |
| Feature-wide | React Context with provider |
| App-wide | Zustand store |
| Server data | React Server Components + `cache()` |
| URL state | `useSearchParams` / `nuqs` |

### Data Fetching

```tsx
// Server Component — fetch at the component level
async function GuardianProfile({ id }: { id: string }) {
  const guardian = await getGuardian(id);
  return <div>{guardian.name}</div>;
}

// Client-side mutations
'use client';
import { useTransition } from 'react';

function OpenGateButton({ gateId }: { gateId: string }) {
  const [isPending, startTransition] = useTransition();
  const handleOpen = () => {
    startTransition(async () => {
      await openGate(gateId); // Server Action
    });
  };
  return <button onClick={handleOpen} disabled={isPending}>Open Gate</button>;
}
```

### Error Boundaries

- Use `error.tsx` files in App Router for route-level error handling
- Use `Suspense` boundaries with meaningful fallbacks
- Never show raw error messages to users

### Performance Rules

- Avoid anonymous functions in JSX render when possible
- Use `React.lazy()` for heavy components not needed at initial load
- Wrap lists in `Suspense` with skeleton fallbacks
- Prefer CSS animations over JS-driven animation for simple transitions
