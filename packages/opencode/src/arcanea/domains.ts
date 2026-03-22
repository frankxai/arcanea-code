/**
 * @module arcanea/domains
 * @description The five creative domains of Arcanea.
 *
 * Every task in the Arcanea Intelligence OS belongs to one (or more) creative
 * domains. Each domain is bound to an element, a primary Guardian, and a set
 * of detection heuristics (file patterns + trigger keywords) that enable
 * automatic routing.
 */

import type { Element } from './guardians';
import type { ModelTier } from './intelligence';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A creative domain within the Arcanea framework. */
export interface CreativeDomain {
  /** Machine-readable identifier. */
  id: string;
  /** Human-readable display name. */
  displayName: string;
  /** Bound element. */
  element: Element;
  /** Primary Guardian id who oversees this domain. */
  guardianId: string;
  /** Short description of what this domain covers. */
  description: string;
  /** Glob patterns for files that belong to this domain. */
  filePatterns: string[];
  /** Keywords that trigger this domain during task detection. */
  triggerKeywords: string[];
  /** Default model tier for tasks in this domain. */
  defaultTier: ModelTier;
}

// ---------------------------------------------------------------------------
// Domain Definitions
// ---------------------------------------------------------------------------

export const CREATIVE_DOMAINS: CreativeDomain[] = [
  {
    id: 'code',
    displayName: 'Code',
    element: 'earth',
    guardianId: 'lyssandria',
    description:
      'TypeScript, React, Next.js, architecture, APIs, performance, security, ' +
      'build systems, and all technical implementation.',
    filePatterns: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.js',
      '**/*.jsx',
      '**/*.json',
      '**/*.yaml',
      '**/*.yml',
      '**/Dockerfile',
      '**/*.css',
      '**/*.scss',
    ],
    triggerKeywords: [
      'implement',
      'refactor',
      'debug',
      'typescript',
      'react',
      'nextjs',
      'api',
      'endpoint',
      'component',
      'hook',
      'function',
      'class',
      'interface',
      'type',
      'build',
      'deploy',
      'ci',
      'cd',
      'pipeline',
      'test',
      'lint',
      'performance',
      'optimize',
      'security',
      'auth',
      'database',
      'migration',
      'schema',
    ],
    defaultTier: 'sonnet',
  },
  {
    id: 'lore',
    displayName: 'Lore',
    element: 'water',
    guardianId: 'maylinn',
    description:
      'Canon worldbuilding, character development, Library writing, mythology, ' +
      'narrative consistency, and the living story of Arcanea.',
    filePatterns: [
      '**/book/**/*.md',
      '**/.arcanea/lore/**',
      '**/canon/**',
      '**/stories/**',
      '**/legends/**',
      '**/chronicles/**',
    ],
    triggerKeywords: [
      'lore',
      'canon',
      'story',
      'narrative',
      'character',
      'worldbuild',
      'mythology',
      'guardian',
      'gate',
      'element',
      'lumina',
      'nero',
      'malachar',
      'eldrian',
      'luminor',
      'library',
      'prophecy',
      'legend',
      'chronicle',
      'parable',
      'ritual',
      'arc',
    ],
    defaultTier: 'sonnet',
  },
  {
    id: 'art',
    displayName: 'Art',
    element: 'fire',
    guardianId: 'leyla',
    description:
      'Image generation, UI/UX design, the Arcanean Design System, visual identity, ' +
      'animation, illustrations, and all visual creative work.',
    filePatterns: [
      '**/*.svg',
      '**/*.png',
      '**/*.jpg',
      '**/*.jpeg',
      '**/*.webp',
      '**/*.gif',
      '**/*.figma',
      '**/design/**',
      '**/styles/**',
      '**/themes/**',
    ],
    triggerKeywords: [
      'design',
      'ui',
      'ux',
      'visual',
      'image',
      'illustration',
      'animation',
      'color',
      'palette',
      'theme',
      'layout',
      'figma',
      'icon',
      'logo',
      'brand',
      'style',
      'glassmorphism',
      'gradient',
      'aurora',
      'cosmic',
    ],
    defaultTier: 'sonnet',
  },
  {
    id: 'music',
    displayName: 'Music',
    element: 'wind',
    guardianId: 'alera',
    description:
      'Gate frequencies, lyrics, soundscapes, Suno/Udio prompting, audio production, ' +
      'and the sonic dimension of the Arcanea experience.',
    filePatterns: [
      '**/*.mp3',
      '**/*.wav',
      '**/*.ogg',
      '**/*.midi',
      '**/music/**',
      '**/audio/**',
      '**/songs/**',
      '**/lyrics/**',
    ],
    triggerKeywords: [
      'music',
      'song',
      'lyric',
      'frequency',
      'solfeggio',
      'suno',
      'udio',
      'audio',
      'sound',
      'melody',
      'harmony',
      'rhythm',
      'beat',
      'composition',
      'track',
      'album',
      'playlist',
      'soundscape',
      'vocal',
      'instrument',
    ],
    defaultTier: 'sonnet',
  },
  {
    id: 'publishing',
    displayName: 'Publishing',
    element: 'void',
    guardianId: 'shinkami',
    description:
      'npm package publishing, distribution, marketing, release orchestration, ' +
      'changelogs, versioning, and all outward-facing product delivery.',
    filePatterns: [
      '**/package.json',
      '**/CHANGELOG.md',
      '**/RELEASE*.md',
      '**/.changeset/**',
      '**/scripts/publish*',
      '**/scripts/release*',
    ],
    triggerKeywords: [
      'publish',
      'release',
      'npm',
      'package',
      'version',
      'changelog',
      'distribution',
      'marketing',
      'launch',
      'announce',
      'deploy',
      'ship',
      'tag',
      'semver',
      'monorepo',
      'changeset',
    ],
    defaultTier: 'sonnet',
  },
];

// ---------------------------------------------------------------------------
// Detection Helpers
// ---------------------------------------------------------------------------

/**
 * Detect which creative domain(s) a file path belongs to.
 * Returns domain ids sorted by match specificity (most specific first).
 */
export function detectDomainsByFile(filePath: string): string[] {
  const matches: string[] = [];
  const normalized = filePath.replace(/\\/g, '/');

  for (const domain of CREATIVE_DOMAINS) {
    for (const pattern of domain.filePatterns) {
      // Simple glob matching: convert glob to regex
      const regex = globToRegex(pattern);
      if (regex.test(normalized)) {
        matches.push(domain.id);
        break;
      }
    }
  }
  return matches;
}

/**
 * Detect which creative domain best matches a text input based on keywords.
 * Returns the domain id with the highest keyword hit count, or 'code' as default.
 */
export function detectDomainByKeywords(input: string): string {
  const lower = input.toLowerCase();
  let bestId = 'code';
  let bestScore = 0;

  for (const domain of CREATIVE_DOMAINS) {
    let score = 0;
    for (const keyword of domain.triggerKeywords) {
      if (lower.includes(keyword)) {
        score++;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestId = domain.id;
    }
  }
  return bestId;
}

/** Get a domain definition by id. */
export function getDomain(id: string): CreativeDomain | undefined {
  return CREATIVE_DOMAINS.find((d) => d.id === id);
}

// ---------------------------------------------------------------------------
// Internal Utilities
// ---------------------------------------------------------------------------

/**
 * Convert a simple glob pattern to a RegExp.
 * Supports `*`, `**`, and `?`. Not a full glob implementation but sufficient
 * for the file patterns used in domain detection.
 */
function globToRegex(pattern: string): RegExp {
  let regex = pattern
    .replace(/[.+^${}()|[\]\\]/g, '\\$&') // escape special regex chars (except * and ?)
    .replace(/\*\*/g, '{{GLOBSTAR}}')       // placeholder for **
    .replace(/\*/g, '[^/]*')                // * matches within a segment
    .replace(/\?/g, '[^/]')                 // ? matches a single char
    .replace(/\{\{GLOBSTAR\}\}/g, '.*');    // ** matches across segments
  return new RegExp(regex);
}
