from fastapi import FastAPI, HTTPException
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_community.llms import OpenAI
import requests
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import os
from pydantic import BaseModel

# Load environment variables from .env file
load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Get the DeepSeek API key from the environment
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")
if not DEEPSEEK_API_KEY:
    raise ValueError("DeepSeek API key not found in environment variables.")

DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"

# Example LangChain setup (you can customize this)
prompt_template = PromptTemplate(
    input_variables=["input_text"],
    template="You are a helpful assistant. {input_text}"
)

llm = OpenAI(api_key=DEEPSEEK_API_KEY)
llm_chain = LLMChain(llm=llm, prompt=prompt_template)

# Define a Pydantic model for the request body
class AskDeepSeekRequest(BaseModel):
    input_text: str

@app.post("/api/guest/")
async def ask_deepseek(request: AskDeepSeekRequest):
    try:
        # Call DeepSeek API
        headers = {
            "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
            "Content-Type": "application/json"
        }
        data = {
            "model": "deepseek-chat",
            "messages": [{"role": "user", "content": request.input_text}]
        }
        response = requests.post(DEEPSEEK_API_URL, headers=headers, json=data)
        response.raise_for_status()
        result = response.json()

        # Process the response (customize as needed)
        return {"response": result["choices"][0]["message"]["content"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/etudiant/")
async def ask_deepseek(request: AskDeepSeekRequest):
    try:
        # Call DeepSeek API
        headers = {
            "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
            "Content-Type": "application/json"
        }
        data = {
            "model": "deepseek-chat",
            "messages": [{"role": "user", "content": request.input_text}]
        }
        response = requests.post(DEEPSEEK_API_URL, headers=headers, json=data)
        response.raise_for_status()
        result = response.json()

        # Process the response (customize as needed)
        return {"response": result["choices"][0]["message"]["content"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/api/admin/")
async def ask_deepseek(request: AskDeepSeekRequest):
    try:
        # Call DeepSeek API
        headers = {
            "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
            "Content-Type": "application/json"
        }
        data = {
            "model": "deepseek-chat",
            "messages": [{"role": "user", "content": request.input_text}]
        }
        response = requests.post(DEEPSEEK_API_URL, headers=headers, json=data)
        response.raise_for_status()
        result = response.json()

        # Process the response (customize as needed)
        return {"response": result["choices"][0]["message"]["content"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)