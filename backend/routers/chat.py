from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.rag import get_ai_response
from services.history import save_message, get_recent_history

router = APIRouter()

# Defines the shape of the data Next.js will send us
class ChatRequest(BaseModel):
    query: str
    session_id: str

class ChatResponse(BaseModel):
    response: str

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(req: ChatRequest):
    try:
        # 1. Fetch past conversation history
        history = get_recent_history(req.session_id, limit=10)
        
        # 2. Get AI response using RAG
        ai_response_text = get_ai_response(req.query, history)
        
        # 3. Save both messages to database
        save_message(req.session_id, "user", req.query)
        save_message(req.session_id, "assistant", ai_response_text)
        
        return ChatResponse(response=ai_response_text)
        
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")