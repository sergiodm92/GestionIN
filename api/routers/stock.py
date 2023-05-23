from fastapi import APIRouter, Depends
from models import Coffin, Place, Transfer
from middlewares.response import custom_response_success, custom_response_error
from middlewares.verify_token import verify_token
from services.stock_services import (get_stock, post_model, get_stock_place, get_stock_id_service, post_transfer)

router = APIRouter()

# Ruta GET para obtener todo el stock
@router.get("/all")
async def get_all_stock(token_data=Depends(verify_token)):
    try:
        stock = await get_stock()
        return custom_response_success(stock)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)

# Ruta GET para obtener stock por lugar
@router.get("/place/{place}")
async def get_all_stock_place(place:str, token_data=Depends(verify_token)):
    try:
        stock = await get_stock_place(place)
        return custom_response_success(stock)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)
    
# Ruta GET para obtener todas las cargas
@router.get("/id/{id}")
async def get_stock_id(id:str,token_data=Depends(verify_token)):
    try:
        stock = await get_stock_id_service(id)
        return custom_response_success(stock)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)

# Ruta POST para agregar nuevo stock
@router.post("/")
async def post_new_model(model: Coffin, token_data = Depends(verify_token)):
    try:
        response = await post_model(model)
        if response : return custom_response_success(model)
        
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ",status_code=400)

# Ruta POST para agregar nuevo stock
@router.post("/transfer")
async def post_new_model(transfer: Transfer, token_data = Depends(verify_token)):
    try:
        response = await post_transfer(transfer)
        if response : return custom_response_success(transfer)
        
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ",status_code=400)