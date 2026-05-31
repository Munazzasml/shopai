from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import chat
from services.history import init_db

app = FastAPI(title="ShopAI Backend")

# UPDATED: Allow requests from localhost AND Vercel
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",          # For local development
        "https://*.vercel.app",            # Allows ALL Vercel preview URLs
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include our chat routes
app.include_router(chat.router, prefix="/api")

# Initialize the database when the server starts
@app.on_event("startup")
def on_startup():
    try:
        init_db()
        print("Database initialized successfully.")
    except Exception as e:
        print(f"Warning: Could not initialize database. Check your DATABASE_URL. Error: {e}")

@app.get("/")
def read_root():
    return {"status": "ok", "message": "ShopAI Backend is running!"}