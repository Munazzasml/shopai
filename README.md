# 🛍️ ShopAI — AI-Powered E-Commerce Store

> Discover, explore, and buy products with the help of an intelligent AI shopping assistant.

[🔗 Live Demo](YOUR_VERCEL_URL) · [📹 Demo Video](YOUR_VIDEO_URL)

![ShopAI Screenshot](public/images/screenshot-homepage.png)

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🏠 Homepage | Beautiful landing page with hero, categories, and featured products |
| 📦 Product Listing | Browse all products with search, filter by category, price range, and sort |
| 🔍 Product Detail | View full product info, images, tags, and related products |
| 🛒 Shopping Cart | Add/remove items, update quantity, see order summary with free shipping logic |
| 💬 AI Chatbot | Real-time AI assistant using RAG (Retrieval-Augmented Generation) to answer product questions |
| ℹ️ About Page | Project overview, tech stack, and team information |
| 📞 Contact Page | Form with validation, success message, and social links |
| 💾 Persistent Cart | Cart saved to localStorage — survives page refresh |

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Frontend | Next.js | 14 (App Router) |
| Frontend | TypeScript | Latest |
| Frontend | Tailwind CSS | 4 |
| Frontend | React | 18 |
| Frontend | Lucide React | Latest |
| Backend | FastAPI | 0.111 |
| Backend | Python | 3.11+ |
| AI/ML | OpenRouter API | gpt-4o-mini + text-embedding-3-small |
| Vector DB | Qdrant Cloud | Free Tier |
| Database | Neon Postgres | Serverless |
| Deployment (FE) | Vercel | — |
| Deployment (BE) | Railway | — |

## 🚀 Local Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v20+)
- [Python](https://python.org/) (v3.11+)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/shopai.git
cd shopai

## 2. Frontend Setup

npm install
cp .env.example .env.local
# Edit .env.local and add your backend URL
npm run dev


## 3. Backend Setup

cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
# Edit .env and add your API keys (see below)
python seed_qdrant.py    # Seed products into Qdrant
uvicorn main:app --reload

## 4. Open Your Browser
Frontend: http://localhost:3000
Backend: http://localhost:8000

🔐 Environment Variables
Frontend (.env.local)
Variable	:     Description
NEXT_PUBLIC_API_URL	: Your FastAPI backend URL (e.g., http://localhost:8000)

Backend (backend/.env)
Variable	                  Description	                      Where to Get
OPENROUTER_API_KEY	          OpenRouter API key                  openrouter.ai
QDRANT_URL	                  Qdrant cluster URL	              cloud.qdrant.io
QDRANT_API_KEY	              Qdrant API key                      cloud.qdrant.io
DATABASE_URL	              Neon Postgres connection string     neon.tech


📸 Screenshots

Homepage Preview
Chatbot Preview


👥 Group Members
Name	            Role	              
Maryam  	        Frontend Developer         
Munazza_Ismail  	Backend & AI Developer	


📄 License
MIT License — feel free to use this project for learning and portfolios!


### Step 2: Create `.env.local` (Project Root)

1. In the **root** of your project (`shopai` folder), create a new file named `.env.local`.
2. Paste this single line:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000

## 👥 Team Work Division

| Member | Role | Responsibilities |
|---|---|---|
| Member 1 | Frontend Developer | Built the Next.js frontend, responsive UI, homepage, product pages, cart page, about/contact pages, and deployed the frontend to Vercel. |
| Member 2 | Backend & AI Developer | Built the FastAPI backend, chatbot API, OpenRouter integration, Qdrant vector search, Neon chat history, and local backend testing. |

## 🚧 Deployment Status

The frontend is deployed on Vercel and is publicly accessible.

The backend was implemented and tested locally, but it is not deployed publicly yet because most free backend hosting platforms require billing information. The backend can be run locally using the instructions below.

### Local Backend Run Command


cd backend
venv\Scripts\activate
uvicorn main:app --reload