# from fastapi import HTTPException,APIRouter,Depends
# from models import UserRegister
# from auth_utils import hash_password, verify_password, create_access_token
# from database import db

# router=APIRouter()

# @router.post("/register")
# def register(user:UserRegister):
#     existing_user=db.users.find_one({"email":user.email})
#     if existing_user:
#         raise HTTPException(status_code=400, detail="Email already registered")

#     hashed_pw = hash_password(user.password)
#     db.users.insert_one({"name": user.name, "email": user.email, "password": hashed_pw})
#     return {"message": "User registered successfully"}
