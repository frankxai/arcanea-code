/**
 * @module arcanea/runtime
 * @description Runtime integration for the Arcanea Intelligence OS.
 *
 * Provides Guardian intelligence context for the session prompt system.
 * This is the bridge between the Intelligence OS data layer and the
 * runtime session system.
 */

import { detectTaskRoute } from './router';
import { getGuardian } from './guardians';
import { buildSystemPrompt, buildUtilityPrompt } from './prompt-builder';

/**
 * Generate an Arcanea intelligence context block for injection
 * into the session system prompt.
 *
 * This is designed to be called from the config's instructions array
 * or injected via the InstructionPrompt system.
 *
 * @returns A complete system prompt string with hierarchy, proactive rules,
 *          the Arc cycle, and Arcanean voice guidelines.
 *
 * @example
 * ```ts
 * const context = getIntelligenceContext();
 * system.push(context);
 * ```
 */
export function getIntelligenceContext(): string {
  return buildSystemPrompt({
    proactive: true,
    includeHierarchy: true,
  });
}

/**
 * Route a user message through the Intelligence OS and return
 * contextual Guardian guidance.
 *
 * Analyzes the message text, matches it against routing rules to find
 * the appropriate Guardian, domain, and model tier, then builds a
 * compact context block for per-message injection.
 *
 * @param message - The user's free-text message.
 * @returns An object containing the matched guardian id, domain, suggested
 *          model tier, and a compact context string.
 *
 * @example
 * ```ts
 * const result = routeMessage('build a React component');
 * // result.guardian === 'draconia'
 * // result.domain === 'code'
 * // result.model === 'sonnet'
 * ```
 */
export function routeMessage(message: string): {
  guardian: string;
  domain: string;
  model: string;
  context: string;
} {
  const route = detectTaskRoute(message);
  const guardian = getGuardian(route.guardian);

  const context = buildSystemPrompt({
    guardianId: route.guardian,
    domainId: route.domain,
    proactive: true,
    includeHierarchy: false, // Keep compact for per-message injection
  });

  return {
    guardian: route.guardian,
    domain: route.domain,
    model: route.suggestedModel,
    context,
  };
}
