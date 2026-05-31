# ShopAI Constitution

## Mission
To create a seamless and intelligent e-commerce platform that helps users easily discover, evaluate, and purchase products with the assistance of an advanced AI shopping companion.

## Core Principles
1. **User-First:** Every feature should prioritize user experience, making shopping intuitive and frictionless.
2. **Performance:** Fast load times and snappy interactions are non-negotiable.
3. **Accessibility:** The web is for everyone. The site must be usable via keyboard and screen readers (a11y standards).
4. **Clean Code:** Write readable, maintainable, and well-documented code. Leave the codebase better than you found it.
5. **AI-Powered:** AI is not a gimmick; it should genuinely assist the user in making informed purchasing decisions.

## Technical Standards
- **Framework:** Next.js 14 using the App Router.
- **Language:** Strictly TypeScript. Use proper interfaces and avoid `any`.
- **Styling:** Tailwind CSS for all styling. Use `clsx` and `tailwind-merge` for dynamic classes.
- **Architecture:** Component-based. Keep components small, reusable, and focused on a single responsibility.

## Design Guidelines
- **Mobile-First:** Always design for mobile screens first, then scale up using Tailwind's `md:` and `lg:` prefixes.
- **Spacing:** Maintain consistent spacing using Tailwind's standard spacing scale (e.g., p-4, m-8, gap-6).
- **Modern UI:** Clean, minimalist aesthetic with clear typography, high contrast, and subtle hover animations.