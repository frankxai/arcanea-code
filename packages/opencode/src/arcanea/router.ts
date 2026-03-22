/**
 * @module arcanea/router
 * @description Task router for the Arcanea Intelligence OS.
 *
 * Analyzes free-text input and routes it to the appropriate creative domain,
 * Guardian, and model tier. The router uses a ranked list of regex patterns
 * evaluated in priority order — first match wins.
 */

import type { ModelTier } from './intelligence';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** The result of routing a task through the Intelligence OS. */
export interface TaskRoute {
  /** Matched creative domain id. */
  domain: string;
  /** Guardian id best suited to handle this task. */
  guardian: string;
  /** Recommended model tier. */
  suggestedModel: ModelTier;
  /** Human-readable explanation of why this route was chosen. */
  description: string;
}

/** Internal routing rule definition. */
interface RoutingRule {
  /** Regex pattern tested against the lowercased input. */
  pattern: RegExp;
  /** Domain to route to. */
  domain: string;
  /** Guardian to assign. */
  guardian: string;
  /** Model tier recommendation. */
  suggestedModel: ModelTier;
  /** Description template. */
  description: string;
}

// ---------------------------------------------------------------------------
// Routing Rules (evaluated in order — first match wins)
// ---------------------------------------------------------------------------

const ROUTING_RULES: RoutingRule[] = [
  // --- Opus-tier: strategic / cross-domain ---
  {
    pattern: /\b(architect(?:ure)?|system.?design|cross.?domain|framework.?design)\b/,
    domain: 'code',
    guardian: 'shinkami',
    suggestedModel: 'opus',
    description: 'Strategic architecture or system design — requires Shinkami at full power.',
  },
  {
    pattern: /\b(canon.?enforce|canon.?review|canon.?check|lore.?audit)\b/,
    domain: 'lore',
    guardian: 'shinkami',
    suggestedModel: 'opus',
    description: 'Canon enforcement — Shinkami verifies alignment with CANON_LOCKED.',
  },
  {
    pattern: /\b(council|multi.?guardian|cross.?gate|all.?guardians)\b/,
    domain: 'publishing',
    guardian: 'shinkami',
    suggestedModel: 'opus',
    description: 'Multi-Guardian council session — Shinkami orchestrates.',
  },
  {
    pattern: /\b(strategy|roadmap|milestone.?plan|vision)\b/,
    domain: 'publishing',
    guardian: 'lyria',
    suggestedModel: 'opus',
    description: 'Strategic planning — Lyria provides far-seeing guidance.',
  },

  // --- Sonnet-tier: implementation / content ---
  {
    pattern: /\b(implement|build|create|develop|code|program|function|component)\b/,
    domain: 'code',
    guardian: 'lyssandria',
    suggestedModel: 'sonnet',
    description: 'Code implementation — Lyssandria ensures solid foundations.',
  },
  {
    pattern: /\b(refactor|migrate|rewrite|modernize|upgrade)\b/,
    domain: 'code',
    guardian: 'elara',
    suggestedModel: 'sonnet',
    description: 'Code transformation — Elara weaves new patterns from old threads.',
  },
  {
    pattern: /\b(story|narrative|character|worldbuild|mythology|legend|chronicle)\b/,
    domain: 'lore',
    guardian: 'maylinn',
    suggestedModel: 'sonnet',
    description: 'Narrative content — Maylinn tends the living canon.',
  },
  {
    pattern: /\b(design|ui|ux|visual|animation|illustration|theme|style)\b/,
    domain: 'art',
    guardian: 'leyla',
    suggestedModel: 'sonnet',
    description: 'Visual design — Leyla channels the creative flow.',
  },
  {
    pattern: /\b(music|song|lyric|frequency|audio|composition|soundscape)\b/,
    domain: 'music',
    guardian: 'alera',
    suggestedModel: 'sonnet',
    description: 'Music creation — Alera gives voice to the frequencies.',
  },
  {
    pattern: /\b(publish|release|npm|package|deploy|ship|changelog)\b/,
    domain: 'publishing',
    guardian: 'alera',
    suggestedModel: 'sonnet',
    description: 'Publishing and distribution — Alera speaks truth outward.',
  },
  {
    pattern: /\b(review|pr|pull.?request|code.?review|audit)\b/,
    domain: 'code',
    guardian: 'draconia',
    suggestedModel: 'sonnet',
    description: 'Code review — Draconia burns away impurities.',
  },
  {
    pattern: /\b(teach|tutorial|academy|lesson|learn|guide|course)\b/,
    domain: 'lore',
    guardian: 'aiyami',
    suggestedModel: 'sonnet',
    description: 'Teaching and learning — Aiyami kindles understanding.',
  },
  {
    pattern: /\b(integrat|connect|unif|bridge|monorepo|cross.?platform)\b/,
    domain: 'code',
    guardian: 'ino',
    suggestedModel: 'sonnet',
    description: 'Integration work — Ino harmonizes disparate systems.',
  },
  {
    pattern: /\b(perf(?:ormance)?|optimi[zs]e|speed|benchmark|profil)\b/,
    domain: 'code',
    guardian: 'draconia',
    suggestedModel: 'sonnet',
    description: 'Performance optimization — Draconia forges through fire.',
  },

  // --- Haiku-tier: quick / mechanical ---
  {
    pattern: /\b(lint|format|prettier|eslint|sort.?import)\b/,
    domain: 'code',
    guardian: 'lyssandria',
    suggestedModel: 'haiku',
    description: 'Formatting and linting — quick mechanical task.',
  },
  {
    pattern: /\b(status|check|list|show|what.?is|where.?is)\b/,
    domain: 'code',
    guardian: 'lyssandria',
    suggestedModel: 'haiku',
    description: 'Status check — lightweight query.',
  },
  {
    pattern: /\b(boilerplate|scaffold|template|stub|skeleton)\b/,
    domain: 'code',
    guardian: 'lyssandria',
    suggestedModel: 'haiku',
    description: 'Boilerplate generation — mechanical scaffolding.',
  },
  {
    pattern: /\b(rename|move|copy|delete|clean)\b/,
    domain: 'code',
    guardian: 'lyssandria',
    suggestedModel: 'haiku',
    description: 'File operations — simple transform.',
  },
];

// ---------------------------------------------------------------------------
// Router
// ---------------------------------------------------------------------------

/**
 * Detect the optimal route for a task based on free-text input.
 *
 * Evaluates routing rules in priority order (opus -> sonnet -> haiku).
 * Returns the first match, or a sensible default routed to Shinkami at
 * sonnet tier if no pattern matches.
 *
 * @param input - Free-text description of the task.
 * @returns The resolved TaskRoute.
 *
 * @example
 * ```ts
 * const route = detectTaskRoute('refactor the auth middleware');
 * // { domain: 'code', guardian: 'elara', suggestedModel: 'sonnet', ... }
 * ```
 */
export function detectTaskRoute(input: string): TaskRoute {
  const lower = input.toLowerCase();

  for (const rule of ROUTING_RULES) {
    if (rule.pattern.test(lower)) {
      return {
        domain: rule.domain,
        guardian: rule.guardian,
        suggestedModel: rule.suggestedModel,
        description: rule.description,
      };
    }
  }

  // Default: route to Shinkami at sonnet — capable generalist.
  return {
    domain: 'code',
    guardian: 'shinkami',
    suggestedModel: 'sonnet',
    description: 'General task — Shinkami provides meta-conscious guidance.',
  };
}

/**
 * Get all routing rules (useful for debugging and introspection).
 * Returns a safe copy without the regex objects.
 */
export function getRoutingRules(): Array<{
  domain: string;
  guardian: string;
  suggestedModel: ModelTier;
  description: string;
}> {
  return ROUTING_RULES.map(({ domain, guardian, suggestedModel, description }) => ({
    domain,
    guardian,
    suggestedModel,
    description,
  }));
}
