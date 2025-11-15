# Design Guidelines: Futuristic Maintenance Page

## Design Approach
**Cyberpunk-Inspired Minimalism**: Drawing inspiration from futuristic UI designs like Cyberpunk 2077 interfaces, Blade Runner aesthetics, and modern glassmorphism trends. Focus on high-tech visual impact with premium neon effects and dark ambient backgrounds.

## Color Palette
**Base**: Dark background (#0a0f1a or similar deep navy/black)
**Neon Accents**: 
- Electric blue (#00d4ff, #0099ff)
- Magenta/Hot pink (#ff006e, #ff0080)
- Purple glow (#a855f7, #8b5cf6)
**Gradients**: Combine electric blue → magenta → purple for text and glow effects

## Typography
**Primary Font**: Inter or Space Grotesk via Google Fonts CDN
**Headline ("We're Under Maintenance")**: 
- Font size: text-5xl md:text-7xl
- Font weight: 700-800
- Apply neon gradient effect using background-clip: text
- Add subtle text glow/shadow for depth

**Subtext ("We'll be back shortly")**:
- Font size: text-xl md:text-2xl  
- Font weight: 300-400
- Softer color with slight glow

## Layout System
**Spacing**: Use Tailwind units of 4, 6, 8, 12, 16
**Container**: Centered single-page layout, full viewport height (min-h-screen)
**Vertical Rhythm**: Main content centered with generous spacing (gap-8 to gap-12) between elements

## Core Components

### Main Content Card (Glassmorphism)
- Semi-transparent frosted glass effect (backdrop-blur-xl)
- Subtle border with neon gradient glow
- Padding: p-12 md:p-16
- Rounded corners: rounded-2xl or rounded-3xl
- Background: rgba with 10-15% opacity

### Geometric Shapes (Background Elements)
- 3-5 floating geometric shapes (circles, hexagons, abstract polygons)
- Absolute positioning scattered across viewport
- Neon gradient fills or strokes
- Various sizes with blur filters for depth
- Cyberpunk-inspired light streaks (diagonal lines with gradient and glow)

### Progress Indicator
- Circular or linear animated loader
- Neon styling with glowing effect
- Smooth continuous animation (rotate or pulse)
- Positioned below headline, modest size (w-16 h-16 for circular)

### Particle System
- 15-20 small floating dots/particles
- Slow vertical drift animation (10-20s duration)
- Varying opacity and sizes
- Subtle glow effect on each particle
- Distributed across full viewport

## Icons
Use Heroicons via CDN for any small utility icons (optional: settings gear, clock icon near progress)

## Animation Strategy
**Minimal but impactful**:
- Progress indicator: Continuous rotation or pulse (animation-spin or custom keyframe)
- Particles: Slow vertical float with random delays
- Geometric shapes: Subtle glow pulse (3-5s intervals)
- Page entrance: Fade-in effect on load (0.5s)
**NO hover states** on glassmorphism card - maintain static premium feel

## Images
**No hero image required** - this is a full-viewport centered experience with abstract geometric backgrounds and particle effects creating the visual interest.

## Responsive Behavior
- Mobile (base): Stack content vertically, reduce headline size, scale down geometric shapes
- Desktop (md:): Larger typography, more prominent geometric elements, wider glassmorphism card
- Maintain centered layout across all breakpoints

## Visual Hierarchy
1. Bold neon gradient headline (primary focus)
2. Glassmorphism content card (visual anchor)
3. Progress indicator (functional element)
4. Subtext message (supporting information)
5. Background elements (ambient atmosphere)

## Quality Standards
- Precise neon glow effects using box-shadow with multiple layers
- Smooth gradient transitions
- Glassmorphism with proper blur and transparency balance
- Clean, premium feel despite cyberpunk aesthetic
- Performance-optimized animations (CSS only, no JavaScript animations)
- Pixel-perfect centering and spacing