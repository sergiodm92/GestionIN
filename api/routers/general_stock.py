from fastapi import APIRouter, Depends
from middlewares.response import custom_response_success, custom_response_error
from middlewares.verify_token import verify_token
from services.general_stock_services import GeneralStockServices

router = APIRouter()
general_stock_services = GeneralStockServices()

# Ruta GET para obtener todo el general_stock
@router.get("/all")
async def get_all_general_stock(token_data=Depends(verify_token)):
    try:
        general_stock = await general_stock_services.get_general_stock()
        return custom_response_success(general_stock)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)

# Ruta GET para obtener general_stock por lugar
@router.get("/place/{place}")
async def get_all_general_stock_place(place:str, token_data=Depends(verify_token)):
    try:
        general_stock = await general_stock_services.get_general_stock_place(place)
        return custom_response_success(general_stock)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)
    
# Ruta GET para obtener todas las cargas
@router.get("/id/{id}")
async def get_general_stock_id(id:str,token_data=Depends(verify_token)):
    try:
        general_stock = await general_stock_services.get_general_stock_id_service(id)
        return custom_response_success(general_stock)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)