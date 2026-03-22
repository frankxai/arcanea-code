---
name: design-system
description: Arcanean Design System — cosmic palette, glass morphism, aurora gradients, typography
trigger: "design", "ui", "component", "style", "theme", "css", "tailwind"
gate: Flow
guardian: Leyla
element: Water
---

# Design System — Flow Gate (Leyla)

> *"Leyla paints with the waters of emotion. Every interface must flow like a river — purposeful, beautiful, alive."*

## When to Activate

Activate when the task involves:
- Creating or styling UI components
- Working with Tailwind CSS classes
- Implementing visual effects (gradients, glass, glow)
- Typography decisions
- Color choices
- Layout and spacing

## Instructions

### The Cosmic Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `void` | `#0a0a0f` | Background, deep surfaces |
| `void-light` | `#1a1a2e` | Elevated surfaces, cards |
| `void-mid` | `#16213e` | Secondary backgrounds |
| `crystal` | `#7fffd4` | Primary accent, CTAs, links |
| `crystal-dim` | `#7fffd480` | Hover states, borders |
| `fire` | `#ff6b35` | Energy, warnings, Fire element |
| `gold` | `#ffd700` | Premium, achievements, highlights |
| `cosmic` | `#78a6ff` | Information, Water element |
| `earth` | `#4ade80` | Success, Earth element |
| `wind` | `#e2e8f0` | Text, Wind element |
| `spirit` | `#c084fc` | Void/Spirit element, mystical |

### Typography

- **Display/Headings**: `font-family: 'Cinzel', serif` — Regal, mythic
- **Body**: `font-family: 'Crimson Pro', serif` — Readable, warm
- **Code/UI**: `font-family: 'JetBrains Mono', monospace`
- Scale: 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72

### Glass Morphism

The signature Arcanean surface treatment:

```css
.glass {
  background: rgba(10, 10, 15, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(127, 255, 212, 0.1);
  border-radius: 12px;
}
```

Tailwind: `bg-void/60 backdrop-blur-md border border-crystal/10 rounded-xl`

### Aurora Gradients

```css
.aurora {
  background: linear-gradient(135deg, #7fffd4 0%, #78a6ff 50%, #c084fc 100%);
}
.aurora-subtle {
  background: linear-gradient(135deg, rgba(127,255,212,0.1) 0%, rgba(120,166,255,0.05) 100%);
}
```

### Cosmic Glow Effects

```css
.glow-crystal { box-shadow: 0 0 20px rgba(127, 255, 212, 0.3); }
.glow-fire    { box-shadow: 0 0 20px rgba(255, 107, 53, 0.3); }
.glow-gold    { box-shadow: 0 0 20px rgba(255, 215, 0, 0.3); }
```

### Component Patterns

- **Cards**: Glass surface + subtle border + hover glow
- **Buttons**: Solid crystal bg for primary, glass for secondary, ghost for tertiary
- **Inputs**: Glass surface, crystal border on focus, subtle placeholder
- **Navigation**: Glass navbar with backdrop blur, crystal active indicator
- **Modals**: Glass overlay with centered glass panel

### Spacing Scale

Use Tailwind's default scale (4px base). Prefer: `p-4`, `p-6`, `p-8` for containers. `gap-3`, `gap-4` for flex/grid. `space-y-4`, `space-y-6` for vertical rhythm.

### Responsive Breakpoints

Follow Tailwind defaults. Mobile-first. Key breakpoints: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`.

### Accessibility

- Contrast ratio: Crystal on Void passes WCAG AA for large text
- Always provide `aria-label` on icon-only buttons
- Focus rings: `focus:ring-2 focus:ring-crystal/50 focus:outline-none`
- Respect `prefers-reduced-motion` for animations
