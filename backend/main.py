from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import products,auth

app = FastAPI()

# Allow frontend (React) to talk with backend
origins = [
    "http://localhost:5173",   # React dev server
    "http://localhost:3000",   # Agar tum CRA use kar rahi ho
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(auth.router,prefix="/auth")


@app.get("/")
def home():
    return {"message": "Backend is running"}
