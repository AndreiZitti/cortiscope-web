# Cortiscope Landing Page

A modern, responsive landing page for Cortiscope's biologically-aware infection surveillance system built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript** (Strict mode)
- **Tailwind CSS** (Custom color scheme)
- **Framer Motion** (Animations)

## Project Structure

```
cortiscope-web/
├── app/
│   ├── layout.tsx          # Root layout with Header/Footer
│   ├── page.tsx            # Main page with all sections
│   └── globals.css         # Global styles & Tailwind imports
├── components/
│   ├── sections/
│   │   ├── Hero.tsx        # Hero section with CTA
│   │   ├── Problem.tsx     # Problem statement (3 columns)
│   │   ├── Comparison.tsx  # Traditional vs NosoScan table
│   │   ├── BiologicallyAware.tsx  # 3-part explanation
│   │   ├── Technology.tsx  # 5 feature cards
│   │   ├── UseCases.tsx    # 4 use case cards
│   │   ├── Stats.tsx       # 5 stat cards with animations
│   │   └── CTA.tsx         # Contact form & CTAs
│   ├── ui/
│   │   ├── Button.tsx      # Primary/Secondary button variants
│   │   ├── Card.tsx        # Feature card with hover effects
│   │   └── StatCard.tsx    # Animated stat display
│   └── layout/
│       ├── Header.tsx      # Sticky header with scroll effect
│       └── Footer.tsx      # Footer with links
├── lib/
│   └── constants.ts        # All copy, data, and content
└── public/
    └── logo.svg            # Cortiscope logo placeholder
```

## Getting Started

### Prerequisites

- Node.js >= 18.17.0
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
npm start
```

## Features

### Design
- **Responsive**: Mobile-first design with breakpoints for all screen sizes
- **Smooth Animations**: Framer Motion animations throughout
- **Custom Color Scheme**:
  - Primary Blue: `#2D9CDB`
  - Dark: `#1A1A1A`
  - Light Gray: `#F8F9FA`
- **Inter Font**: Clean, modern typography

### Sections
1. **Hero**: Full-screen hero with headline, stats bar, and dual CTAs
2. **Problem**: 3-column grid explaining traditional surveillance issues
3. **Comparison**: Table comparing Traditional Systems vs NosoScan
4. **Biologically Aware**: 3-part explanation (Biology, Physics, AI)
5. **Technology**: 5 feature cards in responsive grid
6. **Use Cases**: 4 department-specific use cases
7. **Stats**: 5 key statistics with animated counters
8. **CTA**: Two-path CTAs and contact form

### Accessibility
- Semantic HTML elements
- ARIA labels where appropriate
- Keyboard navigation support
- Focus states on interactive elements

## Animation Placeholders

The following animations are marked with comments for future implementation:

1. **Hero Section**: `{/* Cellular automaton animation here */}`
2. **Comparison Section**: `{/* Animation: highlight on scroll */}`
3. **Biologically Aware Section**: `{/* Animation: three elements converge */}`
4. **Stats Section**: `{/* Animation: counting */}`

## Content Management

All content is centralized in `lib/constants.ts` for easy updates without touching component code.

## Performance

- Next.js App Router for optimal performance
- Automatic code splitting
- Optimized images (ready for Next.js Image component)
- Lazy loading with Framer Motion viewport detection

## Customization

### Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: "#2D9CDB",
  dark: "#1A1A1A",
  "light-gray": "#F8F9FA",
}
```

### Content
Edit `lib/constants.ts` to update all copy and data.

### Components
All components are modular and can be easily customized or reordered.

## Next Steps

1. Replace `public/logo.svg` with actual Cortiscope logo
2. Implement cellular automaton animation in Hero section
3. Add real form submission handler in CTA section
4. Integrate analytics tracking
5. Add meta tags for SEO
6. Set up deployment (Vercel recommended)

## License

All rights reserved - Cortiscope 2024
