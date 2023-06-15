from fastapi import APIRouter, Depends
from models import Transfer
from middlewares.response import custom_response_success, custom_response_error
from middlewares.verify_token import verify_token
from services.coffin_stock_services import (
    get_coffin_stock, get_coffin_stock_place, get_coffin_stock_id_service, post_transfer)

router = APIRouter()

# Ruta GET para obtener todo el coffin_stock


@router.get("/all")
async def get_all_coffin_stock(token_data=Depends(verify_token)):
    try:
        coffin_stock = await get_coffin_stock()
        return custom_response_success(coffin_stock)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)

# Ruta GET para obtener coffin_stock por lugar


@router.get("/place/{place}")
async def get_all_coffin_stock_place(place: str, token_data=Depends(verify_token)):
    try:
        coffin_stock = await get_coffin_stock_place(place)
        return custom_response_success(coffin_stock)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)

# Ruta GET para obtener todas las cargas


@router.get("/id/{id}")
async def get_coffin_stock_id(id: str, token_data=Depends(verify_token)):
    try:
        coffin_stock = await get_coffin_stock_id_service(id)
        return custom_response_success(coffin_stock)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)


@router.post("/transfer")
async def post_new_model(transfer: Transfer, token_data=Depends(verify_token)):
    try:
        response = await post_transfer(transfer)
        if response:
            return custom_response_success(transfer)

    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)
