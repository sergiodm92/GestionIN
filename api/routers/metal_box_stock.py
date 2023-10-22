from fastapi import APIRouter, Depends
from middlewares.response import custom_response_success, custom_response_error
from middlewares.verify_token import verify_token
from services.metal_box_stock_services import MetalBoxStockServices

router = APIRouter()
metal_box_stock_services = MetalBoxStockServices()

# Ruta GET para obtener todo el metal_box_stock
@router.get("/all")
async def get_all_metal_box_stock(token_data=Depends(verify_token)):
    try:
        metal_box_stock = await metal_box_stock_services.get_metal_box_stock()
        return custom_response_success(metal_box_stock)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)

# Ruta GET para obtener metal_box_stock por lugar
@router.get("/place/{place}")
async def get_all_metal_box_stock_place(place:str, token_data=Depends(verify_token)):
    try:
        metal_box_stock = await metal_box_stock_services.get_metal_box_stock_place(place)
        return custom_response_success(metal_box_stock)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)
    
# Ruta GET para obtener todas las cargas
@router.get("/id/{id}")
async def get_metal_box_stock_id(id:str,token_data=Depends(verify_token)):
    try:
        metal_box_stock = await metal_box_stock_services.get_metal_box_stock_id_service(id)
        return custom_response_success(metal_box_stock)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)