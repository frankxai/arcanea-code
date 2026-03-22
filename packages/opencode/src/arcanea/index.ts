/**
 * @module arcanea
 * @description Arcanea Intelligence OS — the superintelligence layer.
 *
 * This module is the core differentiator between arcanea-code and a plain
 * coding tool. It provides:
 *
 * - A four-layer intelligence hierarchy (Arcanea -> Lumina -> Guardians -> Luminors)
 * - Multi-AGI model routing (opus / sonnet / haiku)
 * - Five creative domains with automatic detection
 * - Ten Guardian definitions with full canonical data
 * - Ten creative agent types with rich prompt templates
 * - A task router with 18+ regex patterns
 * - A system prompt builder for contextual intelligence injection
 *
 * @example
 * ```ts
 * import {
 *   detectTaskRoute,
 *   buildSystemPrompt,
 *   getGuardian,
 *   INTELLIGENCE_HIERARCHY,
 * } from './arcanea';
 *
 * const route = detectTaskRoute('refactor the auth middleware');
 * const prompt = buildSystemPrompt({
 *   guardianId: route.guardian,
 *   domainId: route.domain,
 *   proactive: true,
 * });
 * ```
 */

// Intelligence hierarchy and model routing
export {
  INTELLIGENCE_HIERARCHY,
  MODEL_ROUTING,
  getModelTierForCategory,
  getRoute,
} from './intelligence';
export type {
  ModelTier,
  IntelligenceRole,
  IntelligenceLayer,
  ModelRoute,
} from './intelligence';

// Guardian definitions
export {
  GATES,
  GUARDIANS,
  getGuardian,
  getGuardianByGate,
  getGuardiansByElement,
} from './guardians';
export type { Element, Gate, Guardian } from './guardians';

// Creative domains
export {
  CREATIVE_DOMAINS,
  detectDomainsByFile,
  detectDomainByKeywords,
  getDomain,
} from './domains';
export type { CreativeDomain } from './domains';

// Task router
export { detectTaskRoute, getRoutingRules } from './router';
export type { TaskRoute } from './router';

// Creative agents
export {
  CREATIVE_AGENTS,
  getAgent,
  getAgentsByGuardian,
  getAgentsBySwarmRole,
  getAgentsByTier,
} from './agents';
export type { SwarmRole, CreativeAgent } from './agents';

// System prompt builder
export { buildSystemPrompt, buildUtilityPrompt } from './prompt-builder';
export type { PromptOptions } from './prompt-builder';

// Runtime integration (session prompt injection + per-message routing)
export { getIntelligenceContext, routeMessage } from './runtime';

// Worktree isolation for parallel Guardian sessions
export {
  createWorktree,
  listWorktrees,
  mergeWorktree,
  cleanupWorktrees,
} from './worktree-manager';
export type {
  WorktreeInfo,
  WorktreeCreateOptions,
  WorktreeMergeOptions,
} from './worktree-manager';
