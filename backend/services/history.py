import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

load_dotenv()

# We get the database URL from the .env file
DB_URL = os.getenv("DATABASE_URL")

def get_db_connection():
    # Connects to Neon Postgres
    return psycopg2.connect(DB_URL, cursor_factory=RealDictCursor)

def init_db():
    """Creates the chat_history table if it doesn't exist yet."""
    if not DB_URL:
        return
        
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS chat_history (
                    id SERIAL PRIMARY KEY,
                    session_id VARCHAR(255) NOT NULL,
                    role VARCHAR(50) NOT NULL,
                    content TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
        conn.commit()

def save_message(session_id: str, role: str, content: str):
    """Saves a single message (either from 'user' or 'assistant')."""
    if not DB_URL:
        return
        
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO chat_history (session_id, role, content) VALUES (%s, %s, %s)",
                (session_id, role, content)
            )
        conn.commit()

def get_recent_history(session_id: str, limit: int = 10):
    """Gets the last 'limit' messages for a specific user session."""
    if not DB_URL:
        return []
        
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT role, content FROM chat_history 
                WHERE session_id = %s 
                ORDER BY created_at ASC 
                LIMIT %s
                """,
                (session_id, limit)
            )
            return cur.fetchall()