from fastapi import APIRouter, Depends
from models import Product
from middlewares.response import custom_response_success, custom_response_error
from middlewares.verify_token import verify_token
from services.products_services import ProductsServices

router = APIRouter()
products_services = ProductsServices()

# Ruta POST para agregar nueva place
@router.post("/")
async def post_new_product(product: Product, token_data=Depends(verify_token)):
    try:
        response = await products_services.post_product(product)
        if response : return custom_response_success(product)
        else: custom_response_error(message="Ocurrió un error inesperado ",status_code=400)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ",status_code=400)
    
# Ruta GET para obtener todas las places
@router.get("/all")
async def get_all_products(token_data=Depends(verify_token)):
    try:
        products = await products_services.get_products()
        return custom_response_success(products)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)