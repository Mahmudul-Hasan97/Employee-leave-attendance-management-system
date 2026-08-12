from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import api

# Initialize FastAPI App
app = FastAPI(title="Employee Management System API")

# 100% Safe CORS Configuration (No Startup Crash, No Blocked Requests)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       # Allow frontend running on any port (e.g., localhost:3000)
    allow_credentials=False,   # Must be False when allow_origins is ["*"] to prevent crash
    allow_methods=["*"],       # Allows all methods (GET, POST, PUT, DELETE)
    allow_headers=["*"],       # Allows all headers
)

# Include All System API Routes
app.include_router(api.router)

# Health Check Route (To test if backend is running)
@app.get("/")
def root():
    return {"status": "success", "message": "Backend and Frontend are successfully connected!"}