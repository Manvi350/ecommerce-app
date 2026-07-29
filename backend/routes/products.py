from fastapi import APIRouter,HTTPException,Query,Depends
from models import Product,CheckoutRequest
from database import db
from bson import ObjectId
from auth_utils import get_current_user

router=APIRouter()

@router.get("/products")
def get_products():
    products = list(db.products.find({}))  # MongoDB se data laa rahe hain
    for p in products:
        p["_id"] = str(p["_id"])
    return products

@router.get("/products/{product_id}")
def get_product(product_id:str):
    product=db.products.find_one({"_id":ObjectId(product_id)})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    product["_id"] = str(product["_id"])
    return product 

@router.post("/products")
def add_product(product:Product):
    result=db.products.insert_one(product.dict())
    return{"message":"product added successfully", "_id":str(result.inserted_id)}

@router.put("/products/{product_id}")
def update_product(product_id: str, product: Product):
    result = db.products.update_one(
        {"_id": ObjectId(product_id)},
        {"$set": product.dict()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product updated successfully"}

@router.delete("/products/{product_id}")
def delete_product(product_id: str):
    result = db.products.delete_one({"_id": ObjectId(product_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}

# @router.post("/checkout")
# def checkout(order: dict):  
#     try:
#         # order ko database me save karna
#         result = db.orders.insert_one(order)  
#         return {"message": "Order placed successfully", "order_id": str(result.inserted_id)}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# @router.post("/checkout")
# def checkout(order: CheckoutRequest):
#     try:
#         result = db.orders.insert_one(order.dict())
#         return {"message": "Order placed successfully", "order_id": str(result.inserted_id)}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# @router.get("/orders")
# def get_orders(userId: str = Query(...)):
#     try:
#         orders = list(db.orders.find({"userId":userId}))
#         for order in orders:
#             order["_id"] = str(order["_id"])  # ObjectId ko string me convert karna
#         return orders
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))


@router.get("/orders")
def get_orders(current_user: str = Depends(get_current_user)):
    # current_user me JWT se nikala gaya user_id hoga
    orders = list(db.orders.find({"user_id": current_user}))
    for order in orders:
        order["_id"] = str(order["_id"])
    return orders

@router.post("/checkout")
def checkout(order: CheckoutRequest, current_user: str = Depends(get_current_user)):
    print("Current user:", current_user)
    order_data = order.dict()
    order_data["user_id"] = current_user   # 👈 yahan JWT se mila hua user link karo
    result = db.orders.insert_one(order_data)
    return {"message": "Order placed successfully", "order_id": str(result.inserted_id)}

