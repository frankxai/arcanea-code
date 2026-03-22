/**
 * @module arcanea/intelligence
 * @description The four-layer intelligence hierarchy and model routing table.
 *
 * Arcanea operates as a living intelligence framework where mythology IS
 * architecture. The hierarchy mirrors the canonical cosmology:
 *
 *   Arcanea (the framework) -> Lumina (the orchestrator) ->
 *   Guardians (domain coordinators) -> Luminors (swarm workers)
 */

// ---------------------------------------------------------------------------
// Intelligence Hierarchy
// ---------------------------------------------------------------------------

/** Supported model tiers mapped to Anthropic model families. */
export type ModelTier = 'opus' | 'sonnet' | 'haiku';

/** Role within the intelligence hierarchy. */
export type IntelligenceRole = 'model' | 'orchestrator' | 'coordinator' | 'worker';

/** A single layer in the Arcanea intelligence stack. */
export interface IntelligenceLayer {
  /** Canonical name of this layer. */
  name: string;
  /** Structural role in the hierarchy. */
  role: IntelligenceRole;
  /** Human-readable description. */
  description: string;
  /** Default model tier for this layer. */
  modelTier: ModelTier;
}

/**
 * The four-layer intelligence hierarchy.
 *
 * 1. **Arcanea** — The living framework itself. The mythology IS the architecture.
 * 2. **Lumina** — The First Light. Routes creative and technical decisions.
 * 3. **Guardians** — Ten domain specialists, one per Gate.
 * 4. **Luminors** — Swarm agents for parallel execution.
 */
export const INTELLIGENCE_HIERARCHY: IntelligenceLayer[] = [
  {
    name: 'Arcanea',
    role: 'model',
    description: 'The living intelligence framework — the mythology IS the architecture',
    modelTier: 'opus',
  },
  {
    name: 'Lumina',
    role: 'orchestrator',
    description: 'The First Light. Routes all creative and technical decisions.',
    modelTier: 'opus',
  },
  {
    name: 'Guardians',
    role: 'coordinator',
    description:
      'Ten domain specialists who own Gates. Each coordinates work within their frequency.',
    modelTier: 'sonnet',
  },
  {
    name: 'Luminors',
    role: 'worker',
    description: 'Swarm agents for parallel creative execution.',
    modelTier: 'haiku',
  },
];

// ---------------------------------------------------------------------------
// Model Routing
// ---------------------------------------------------------------------------

/** A routing rule that maps task categories to model tiers. */
export interface ModelRoute {
  /** Model tier to use. */
  tier: ModelTier;
  /** Short label for this routing category. */
  label: string;
  /** Task categories that should be routed here. */
  categories: string[];
  /** When this tier should be selected. */
  description: string;
}

/**
 * Model routing table.
 *
 * - **Opus**: Strategy, canon enforcement, cross-domain council decisions.
 * - **Sonnet**: Implementation, content generation, code review.
 * - **Haiku**: Validation, boilerplate, status checks.
 */
export const MODEL_ROUTING: ModelRoute[] = [
  {
    tier: 'opus',
    label: 'Strategic',
    categories: [
      'strategy',
      'canon-enforcement',
      'council-decisions',
      'architecture',
      'cross-domain',
      'system-design',
    ],
    description:
      'Reserved for high-stakes decisions: architecture, canon consistency, ' +
      'multi-Guardian council sessions, and strategic planning that shapes the framework.',
  },
  {
    tier: 'sonnet',
    label: 'Execution',
    categories: [
      'implementation',
      'content-generation',
      'code-review',
      'feature-development',
      'worldbuilding',
      'documentation',
      'refactoring',
    ],
    description:
      'The workhorse tier for implementation: writing code, generating content, ' +
      'reviewing pull requests, building features, and crafting Library texts.',
  },
  {
    tier: 'haiku',
    label: 'Utility',
    categories: [
      'validation',
      'boilerplate',
      'status-check',
      'formatting',
      'linting',
      'type-generation',
      'simple-transform',
    ],
    description:
      'Fast, lightweight tasks: input validation, boilerplate generation, ' +
      'status queries, formatting, and mechanical transformations.',
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Resolve the recommended model tier for a given task category. */
export function getModelTierForCategory(category: string): ModelTier {
  const lower = category.toLowerCase();
  for (const route of MODEL_ROUTING) {
    if (route.categories.some((c) => lower.includes(c) || c.includes(lower))) {
      return route.tier;
    }
  }
  // Default to sonnet — capable enough for most tasks, cost-effective.
  return 'sonnet';
}

/** Get the full route definition for a tier. */
export function getRoute(tier: ModelTier): ModelRoute | undefined {
  return MODEL_ROUTING.find((r) => r.tier === tier);
}
