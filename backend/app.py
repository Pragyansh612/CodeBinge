from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure the Gemini API
# GEMINI_API_KEY = ''
GEMINI_API_KEY = 'AIzaSyB_2YthThtonw3Nt5b1wiSenHfyPfs-e-s'
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable is not set")

genai.configure(api_key=GEMINI_API_KEY)

# Initialize Gemini model
model = genai.GenerativeModel('gemini-1.5-pro')

app = FastAPI(title="CodeBinge Assistant API")

# Add CORS middleware to allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust for your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request/response models
class AssistantRequest(BaseModel):
    query: str
    userData: Optional[Dict[Any, Any]] = None
    history: Optional[List[Dict[str, str]]] = None

class AssistantResponse(BaseModel):
    text: str
    code: Optional[str] = None
    data: Optional[Any] = None

@app.post("/api/assistant", response_model=AssistantResponse)
async def get_assistant_response(request: AssistantRequest):
    print(request)
    try:
        # Build the chat context with history if available
        chat = model.start_chat(history=[])
        
        if request.history:
            for message in request.history:
                if message.get("role") == "user":
                    chat.send_message(message.get("content", ""))
                else:
                    # We don't need to send model messages - they're included in history
                    pass
        
        # Prepare the prompt with user data if available
        prompt = request.query
        if request.userData:
            user_context = "\n".join([f"{k}: {v}" for k, v in request.userData.items()])
            prompt = f"User Data:\n{user_context}\n\nUser Query: {request.query}"
        
        # Get response from Gemini
        response = chat.send_message(prompt)
        
        # Extract code blocks if present
        text = response.text
        code = ""
        
        # Simple code block extraction (can be improved)
        if "```" in text:
            parts = text.split("```")
            if len(parts) >= 3:  # At least one code block
                # Extract the first code block
                code = parts[1]
                if code.startswith(("python", "javascript", "typescript")):
                    code = code.split("\n", 1)[1]  # Remove language identifier
                
                # Reconstruct text without the code block
                text = parts[0] + "\n" + parts[2]
        
        return AssistantResponse(
            text=text.strip(),
            code=code.strip() if code else None,
            data=None
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}