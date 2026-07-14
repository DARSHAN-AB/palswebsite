# Innovation Platform - Project Structure

## Overview
Premium events and networking platform built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4. Features a clean, minimal design with white background and soft blue accents inspired by Apple, Linear, and Vercel.

## Project Architecture

```
/vercel/share/v0-project/
├── app/
│   ├── layout.tsx                 # Root layout with metadata
│   ├── globals.css                # Design tokens and global styles
│   ├── page.tsx                   # Home page
│   ├── login/page.tsx             # Login page
│   ├── signup/page.tsx            # Sign up page
│   ├── dashboard/page.tsx         # User dashboard
│   ├── events/
│   │   ├── page.tsx               # Events listing page
│   │   └── [id]/page.tsx          # Event detail page
│
├── components/
│   ├── navbar.tsx                 # Navigation bar (reusable)
│   ├── footer.tsx                 # Footer (reusable)
│   └── event-card.tsx             # Event card component (reusable)
│
├── data/
│   └── events.ts                  # Mock events data
│
├── public/                        # Static assets
├── lib/utils.ts                   # Utility functions
├── next.config.mjs                # Next.js configuration
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.js             # Tailwind CSS configuration
└── package.json                   # Dependencies

```

## Design System

### Colors (Tailwind + Custom)
- **Primary**: Blue (#3b82f6)
- **Background**: White (#ffffff)
- **Foreground**: Charcoal (#1a1a1a)
- **Gray Palette**: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
- **Accents**: Blue shades for interactions and CTAs

### Typography
- **Font**: Geist (default Next.js 15 font)
- **Headings**: Bold, ranging from h1-h6
- **Body**: Regular, 14px-18px sizes
- **Line Height**: 1.5 (leading-relaxed)

### Components
- **Navbar**: Sticky, responsive mobile menu
- **Event Cards**: Grid-based layout with hover effects
- **Forms**: Email, password inputs with icons
- **Buttons**: Primary (blue), secondary (white), tertiary (borders)
- **Sections**: Hero, Features, Events, Stats, CTA, Footer

## Key Features

### Pages
1. **Home** (`/`) - Hero section, features showcase, featured events, stats, CTA
2. **Events Listing** (`/events`) - Filterable events by category, search functionality
3. **Event Detail** (`/events/[id]`) - Full event info, speakers, quick stats, registration
4. **Login** (`/login`) - Email/password authentication form
5. **Sign Up** (`/signup`) - User registration with terms agreement
6. **Dashboard** (`/dashboard`) - User profile, activity, upcoming events, saved events

### Data
- **Mock Events Data**: 6 sample events with categories (conference, workshop, networking, webinar)
- **Event Properties**: title, description, date, time, location, image, category, attendees, featured flag

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Hamburger menu on mobile, full nav on desktop
- Touch-friendly buttons and spacing

## Development

### Scripts
```bash
pnpm dev       # Start development server
pnpm build     # Build for production
pnpm start     # Start production server
pnpm lint      # Run ESLint
```

### Tech Stack
- **Framework**: Next.js 16.2.6 (App Router)
- **Language**: TypeScript 5.7.3
- **Styling**: Tailwind CSS 4.2.0 + PostCSS 8.5
- **Icons**: lucide-react 1.16.0
- **Runtime**: Node.js with pnpm package manager

### Path Aliases
- `@/*` - Points to project root (e.g., `@/components`, `@/data`)

## Production Ready Features

- Server components for optimal performance
- Dynamic page routing with async params
- Proper error handling (404 for non-existent events)
- SEO-optimized metadata
- Accessible components (semantic HTML, ARIA labels)
- Client/Server component pattern optimization
- Form validation with client-side state
- Image optimization with Next.js Image component
- Clean separation of concerns (components, data, pages)

## Future Enhancements

- Backend API integration (replace mock data)
- User authentication system (Better Auth / Supabase)
- Database integration (PostgreSQL with Neon)
- Real event registration system
- User profiles and settings
- Email notifications
- Advanced search and filtering
- Event calendar view
- Social sharing
- Analytics tracking
