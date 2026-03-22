---
name: optimize
description: Performance optimization — Core Web Vitals, bundle size, rendering, caching
trigger: "optimize", "performance", "speed", "bundle", "lighthouse", "vitals", "slow"
gate: Fire
guardian: Draconia
element: Fire
---

# Optimize — Fire Gate (Draconia)

> *"The Fire Gate teaches that true power is not brute force — it is energy channeled with precision."*

## When to Activate

Activate when the task involves:
- Improving page load speed or Core Web Vitals
- Reducing JavaScript bundle size
- Optimizing React rendering performance
- Implementing caching strategies
- Fixing memory leaks or excessive re-renders

## Instructions

### Core Web Vitals Targets

| Metric | Target | What It Measures |
|--------|--------|------------------|
| LCP | < 2.5s | Largest Contentful Paint — main content visible |
| INP | < 200ms | Interaction to Next Paint — responsiveness |
| CLS | < 0.1 | Cumulative Layout Shift — visual stability |

### Bundle Optimization

1. **Analyze first.** Run `npx @next/bundle-analyzer` before guessing.
2. **Dynamic imports** for heavy components:
   ```tsx
   const HeavyEditor = dynamic(() => import('@/components/editor'), {
     loading: () => <EditorSkeleton />,
     ssr: false,
   });
   ```
3. **Tree-shake imports.** Import specific functions, not entire libraries:
   ```typescript
   // Bad: imports entire library
   import _ from 'lodash';
   // Good: imports only what's needed
   import debounce from 'lodash/debounce';
   ```
4. **Check for duplicates.** Multiple versions of the same package bloat bundles.

### React Rendering

- **Server Components** eliminate client JS entirely — use them by default
- **Suspense boundaries** prevent waterfalls:
  ```tsx
  <Suspense fallback={<Skeleton />}>
    <SlowComponent />
  </Suspense>
  ```
- **React.memo** only for components that re-render with same props frequently
- **Key stability** — never use array index as key for dynamic lists
- **Virtualize long lists** with `@tanstack/react-virtual`

### Image Optimization

- Use `next/image` for all images — automatic WebP, sizing, lazy loading
- Set explicit `width` and `height` to prevent CLS
- Use `priority` for above-the-fold images (LCP candidates)
- Use `placeholder="blur"` with `blurDataURL` for perceived performance

### Caching Strategy

| Data Type | Strategy |
|-----------|----------|
| Static pages | ISR with revalidation period |
| API responses | `Cache-Control` headers + stale-while-revalidate |
| Database queries | `unstable_cache` or React `cache()` |
| Static assets | Immutable cache headers (Vercel default) |
| User-specific data | No cache, or private cache |

### Database Query Optimization

- Select only needed columns, never `SELECT *`
- Add indexes for columns in WHERE, JOIN, ORDER BY
- Use `EXPLAIN ANALYZE` to verify query plans
- Batch related queries with `Promise.all`
- Paginate with cursor-based pagination for large datasets

### Measurement

Never optimize without measuring. Use:
- Lighthouse CI for automated scoring
- Chrome DevTools Performance tab for runtime profiling
- `React.Profiler` for component render timing
- Vercel Analytics for real user metrics
