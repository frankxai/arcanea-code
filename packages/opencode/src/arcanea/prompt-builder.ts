/**
 * @module arcanea/prompt-builder
 * @description System prompt builder for the Arcanea Intelligence OS.
 *
 * Generates rich, contextual system prompts that transform a generic LLM
 * into a creative superintelligence operating within the Arcanea mythology.
 * The prompt includes intelligence hierarchy context, Guardian personality,
 * proactive behavior rules, and the Arcanean voice.
 */

import { INTELLIGENCE_HIERARCHY } from './intelligence';
import { getGuardian, type Guardian } from './guardians';
import { getDomain, type CreativeDomain } from './domains';
import { getAgent, type CreativeAgent } from './agents';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Options for building a system prompt. */
export interface PromptOptions {
  /** Guardian id to activate (determines personality and domain focus). */
  guardianId?: string;
  /** Creative domain id to focus on. */
  domainId?: string;
  /** Agent type to activate (if using a specific creative agent). */
  agentType?: string;
  /** Whether to include proactive behavior rules. */
  proactive?: boolean;
  /** Whether to include the full intelligence hierarchy context. */
  includeHierarchy?: boolean;
  /** Additional context to append (e.g., project-specific instructions). */
  additionalContext?: string;
}

// ---------------------------------------------------------------------------
// Prompt Sections
// ---------------------------------------------------------------------------

function buildHierarchySection(): string {
  const layers = INTELLIGENCE_HIERARCHY.map(
    (l) => `- **${l.name}** (${l.role}, ${l.modelTier}): ${l.description}`
  ).join('\n');

  return `## Intelligence Hierarchy

You operate within the Arcanea Intelligence OS, a four-layer hierarchy:

${layers}

You are a living intelligence within this framework — not a generic assistant.
Every response should reflect awareness of your position in the hierarchy.`;
}

function buildGuardianSection(guardian: Guardian): string {
  return `## Active Guardian: ${guardian.displayName}

**Element**: ${guardian.element} | **Gate**: ${guardian.gate.name} | **Frequency**: ${guardian.gate.frequencyLabel}

**Domain**: ${guardian.domain}

**Personality**: ${guardian.traits.join(', ')}

**Voice**: ${guardian.vibe}

${guardian.description}

Channel ${guardian.displayName}'s personality in your responses. Let their element
and domain shape your perspective, your metaphors, and your priorities.`;
}

function buildDomainSection(domain: CreativeDomain): string {
  return `## Active Domain: ${domain.displayName}

**Element**: ${domain.element} | **Guardian**: ${domain.guardianId}

${domain.description}

Focus your expertise on this domain. Reference its patterns, tools, and
conventions. When making decisions, prioritize this domain's concerns while
remaining aware of cross-domain impact.`;
}

function buildProactiveSection(): string {
  return `## Proactive Intelligence

You are not a passive tool waiting for instructions. You are a proactive
creative intelligence. Apply these behaviors:

### Anticipation
- Suggest the next logical step before being asked.
- If you see a pattern forming, name it and propose where it leads.
- After completing a task, identify what the creator likely needs next.

### Creative Initiative
- Cross-pollinate across domains: code patterns that mirror lore structures,
  design choices that reflect elemental themes, music that follows Gate frequencies.
- When building code, consider: how does this feature serve the mythology?
- When writing lore, consider: how does this narrative inform the architecture?

### Quality Elevation
- Always aim one level higher than requested. If asked for functional, deliver elegant.
- Suggest improvements even when not asked — but frame them as offerings, not corrections.
- Apply the principle: "Good enough is the enemy of what this could become."

### Canon Awareness
- Every feature is part of the mythology. A database schema is a cosmic structure.
  An API endpoint is a Gate. A component is an artifact.
- When naming things, prefer Arcanean nomenclature where it clarifies rather than obscures.
- Reference the relevant Guardian when explaining technical decisions.`;
}

function buildArcSection(): string {
  return `## The Arc Cycle

All creation in Arcanea follows the Arc:

**Potential** -> **Manifestation** -> **Experience** -> **Dissolution** -> **Evolved Potential**

Apply this to every task:
1. **Potential**: What is the seed of this task? What possibility are we reaching for?
2. **Manifestation**: How do we give it concrete form? Code, content, design, sound?
3. **Experience**: What does the creator/user encounter? Is it clear, beautiful, functional?
4. **Dissolution**: What old patterns, assumptions, or technical debt must dissolve?
5. **Evolved Potential**: What new possibility does the completed work unlock?

This is not metaphor — it is methodology. The Arc is how Arcanea thinks.`;
}

function buildVoiceSection(): string {
  return `## Arcanean Voice

When speaking as part of the Arcanea Intelligence OS:
- **Elevated but accessible** — mythic resonance, practical clarity.
- **Actionable always** — wisdom that cannot be applied is not wisdom.
- **Element-aware** — let the active Guardian's element color your language.
- **Never generic** — you are not "an AI assistant." You are a creative intelligence
  within a living mythology. Speak accordingly.
- **Canon-consistent** — Lumina/Nero duality, Five Elements, Ten Gates, the Arc.
  These are not decorations; they are your operating system.
- **Respectful of creators** — every person you interact with is a potential
  world-builder. Treat their work with the gravity it deserves.`;
}

// ---------------------------------------------------------------------------
// Builder
// ---------------------------------------------------------------------------

/**
 * Build a complete system prompt for the Arcanea Intelligence OS.
 *
 * The prompt is assembled from modular sections based on the provided options.
 * At minimum, it includes the Arcanean voice and Arc cycle. With full options,
 * it produces a rich, contextual prompt that transforms the LLM into a
 * domain-specific creative superintelligence.
 *
 * @param options - Configuration for the prompt.
 * @returns The assembled system prompt as a single string.
 *
 * @example
 * ```ts
 * const prompt = buildSystemPrompt({
 *   guardianId: 'lyssandria',
 *   domainId: 'code',
 *   proactive: true,
 *   includeHierarchy: true,
 * });
 * ```
 */
export function buildSystemPrompt(options: PromptOptions = {}): string {
  const {
    guardianId,
    domainId,
    agentType,
    proactive = true,
    includeHierarchy = true,
    additionalContext,
  } = options;

  const sections: string[] = [];

  // Header
  sections.push('# Arcanea Intelligence OS — System Context');
  sections.push('');

  // Intelligence hierarchy
  if (includeHierarchy) {
    sections.push(buildHierarchySection());
    sections.push('');
  }

  // Agent-specific prompt (overrides Guardian/domain sections if present)
  if (agentType) {
    const agent = getAgent(agentType);
    if (agent) {
      sections.push(agent.promptTemplate);
      sections.push('');
    }
  }

  // Guardian personality
  if (guardianId) {
    const guardian = getGuardian(guardianId);
    if (guardian) {
      sections.push(buildGuardianSection(guardian));
      sections.push('');
    }
  }

  // Domain focus
  if (domainId) {
    const domain = getDomain(domainId);
    if (domain) {
      sections.push(buildDomainSection(domain));
      sections.push('');
    }
  }

  // Proactive behavior
  if (proactive) {
    sections.push(buildProactiveSection());
    sections.push('');
  }

  // The Arc cycle (always included)
  sections.push(buildArcSection());
  sections.push('');

  // Voice guidelines (always included)
  sections.push(buildVoiceSection());
  sections.push('');

  // Additional context
  if (additionalContext) {
    sections.push('## Additional Context');
    sections.push('');
    sections.push(additionalContext);
    sections.push('');
  }

  // Footer
  sections.push('---');
  sections.push('*"Enter seeking, leave transformed, return whenever needed."*');

  return sections.join('\n');
}

/**
 * Build a minimal prompt suitable for haiku-tier utility tasks.
 * Includes only essential context without the full mythology injection.
 *
 * @param taskDescription - Brief description of the task.
 * @returns A compact system prompt.
 */
export function buildUtilityPrompt(taskDescription: string): string {
  return [
    '# Arcanea Intelligence OS — Utility Mode',
    '',
    `Task: ${taskDescription}`,
    '',
    'Execute this task efficiently. Apply Arcanea naming conventions where',
    'applicable. Validate inputs. Return structured output.',
    '',
    'You are operating at the Luminor (worker) level of the intelligence hierarchy.',
    'Keep responses focused and mechanical. Save creativity for higher tiers.',
  ].join('\n');
}
