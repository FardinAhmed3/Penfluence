from fastapi import FastAPI
from app import router as upload_router  # Import the router from app.py

app = FastAPI(
    title="EduOCR API",
    description="An API to digitize handwritten notes into PDFs",
    version="1.0"
)

# Include the router for handling image uploads
app.include_router(upload_router, prefix="/upload", tags=["Upload"])

@app.get("/")
def read_root():
    return {"message": "Welcome to EduOCR API"}
