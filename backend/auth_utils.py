from jose import JWTError,jwt
from datetime import datetime,timedelta
from fastapi import HTTPException, Depends,FastAPI
from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm
from passlib.context import CryptContext

app=FastAPI()

SECRET_KEY="secret_key"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=30

pwd_context=CryptContext(schemes=["bcrypt"],deprecated="auto")

# fake_users_db = {
#     "test@example.com": {
#         "id": "u1",
#         "email": "test@example.com",
#         "hashed_password": pwd_context.hash("1234")
#     }
# }

# Ye define karta hai ki token "Authorization: Bearer <token>" header me expect hoga
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def hash_password(password:str)->str :
    return pwd_context.hash(password)

def verify_password(plain_password:str,hashed_password:str)->bool :
    return pwd_context.verify(plain_password,hashed_password)


def get_current_user(token: str=Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])   #payload becomes a Python dictionary containing the token’s claims.
        user_id: str = payload.get("sub")  
        print("Token",token)                      #sub means subject used to store users id
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    
#if you created the token like this:
#   create_access_token({"sub": "12345"})

# then payload might look like: 
# {
#   "sub": "12345",   # subject (user ID)
#   "exp": 1695200000 # expiration timestamp
# }

