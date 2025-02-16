from fastapi import FastAPI
from app import router as upload_router  # Importing the router

app = FastAPI()

# Include the upload router
app.include_router(upload_router, prefix="/upload")

@app.get("/")
def read_root():
    return {"message": "Welcome to EduOCR API"}
from fastapi import FastAPI
from app import router as upload_router  # Importing the router

app = FastAPI()

# Include the upload router
app.include_router(upload_router,prefix="/upload")

@app.get("/")
def read_root():
    return {"message": "Welcome to EduOCR API"}
