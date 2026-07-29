from pydantic import BaseModel,EmailStr
from typing import List

class Product(BaseModel):
    name:str
    price: float
    image:str
    description: str
    category: str

class CheckoutRequest(BaseModel):
    userId:str
    name: str
    email: str
    address: str
    city:str
    pincode:str
    payment: str
    products:List[dict]



# class UserLogin(BaseModel):
#     email:EmailStr
#     password:str