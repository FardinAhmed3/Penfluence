from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import router as upload_router  # Import the router from app.py

app = FastAPI(
    title="EduOCR API",
    description="An API to digitize handwritten notes into PDFs",
    version="1.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Better to use ["http://localhost:3000"] for security
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# The router for handling image uploads
app.include_router(upload_router, prefix="/upload", tags=["Upload"])

@app.get("/")
def read_root():
    return {"message": "Welcome to EduOCR API"}
