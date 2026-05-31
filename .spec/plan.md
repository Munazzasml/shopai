# ShopAI Project Plan

## Phase 1: Setup (Day 1)
- Initialize Next.js 14 project with App Router.
- Configure TypeScript, Tailwind CSS, and aliases.
- Establish folder structure (`routes`, `ui`, `layout`, `lib`, etc.).
- Install initial dependencies (Lucide React, clsx).

## Phase 2: Core pages (Day 2-3)
- Build out the global layout (Navbar, Footer).
- Create the Homepage (Hero section, featured categories).
- Create the Product Listing page (All products).
- Create the Product Detail page (Single product view).
- Add static informational pages (About, Contact).

## Phase 3: E-commerce features (Day 3-4)
- Setup React Context (`CartContext`) for global state.
- Build the slide-out/modal Shopping Cart UI.
- Implement add, remove, and update quantity features.
- Build search bar and filtering logic for the products page.

## Phase 4: RAG chatbot backend (Day 4-5)
- Initialize FastAPI Python backend.
- Connect to OpenAI API for LLM capabilities.
- Set up Qdrant for vector database (RAG embeddings).
- Set up Neon (Serverless Postgres) for standard database needs.

## Phase 5: Chat widget frontend (Day 5)
- Create `ChatWidget` component in Next.js.
- Build chat UI (floating bubble, message history, typing indicators).
- Connect frontend to the FastAPI backend endpoints.

## Phase 6: Deploy (Day 6)
- Deploy frontend to Vercel.
- Deploy backend to Railway.
- Write a comprehensive README.md.
- Perform final QA testing.