from fastapi import HTTPException,APIRouter,Depends,Body
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordRequestForm
from auth_utils import hash_password, verify_password, create_access_token
from database import db

router=APIRouter()

class UserRegister(BaseModel):
    name:str
    email:str
    password:str

class UserLogin(BaseModel):
    email:str
    password:str

@router.post("/register")
def register(user:UserRegister):
    existing_user=db.users.find_one({"email":user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = hash_password(user.password)
    db.users.insert_one({"name": user.name, "email": user.email, "password": hashed_pw})
    return {"message": "User registered successfully"}

# @router.post("/login")
# def login(user:User):
#     db_user=db.users.find_one({"email":user.email})
#     if not db_user or not verify_password(user.password,db_user["password"]):
#         return HTTPException(status_code=401, detail="Invalid credentials")
    
#     token=create_access_token({"sub":str(db_user["_id"])})  #Creates a JWT token using the user's _id as sub (subject).
#     return {"access_token": token, "token_type": "bearer"}  #Client stores token (usually in localStorage) and sends it in Authorization: Bearer <token> header for future API calls.

# @router.post("/login")
# def login(form_data: OAuth2PasswordRequestForm = Depends()):
#     print("Form data:", form_data.username, form_data.password)
#     user = db.users.find_one({"email": form_data.username})  # username = email
#     print("User from DB:", user)

#     if not user or not verify_password(form_data.password, user["password"]):
#         raise HTTPException(status_code=401, detail="Invalid credentials")
    
#     access_token = create_access_token({"sub": str(user["_id"])})
#     return {"access_token": access_token, "token_type": "bearer"}

# @router.post("/login")
# def login(data: dict = Body(...)):
#     email = data.get("email")
#     password = data.get("password")

#     user = db.users.find_one({"email": email})
#     if not user or not verify_password(password, user["password"]):
#         raise HTTPException(status_code=401, detail="Invalid credentials")

#     access_token = create_access_token({"sub": str(user["_id"])})
#     return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login")
def login(req: UserLogin):
    print("Login JSON data:", req)
    user = db.users.find_one({"email": req.email})
    print("User from DB:", user)

    if not user or not verify_password(req.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token({"sub": str(user["_id"])})
    return {"access_token": access_token, "token_type": "bearer"}