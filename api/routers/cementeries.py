from fastapi import APIRouter, Depends, Query
from models import Cementery
from middlewares.response import custom_response_success, custom_response_error
from middlewares.verify_token import verify_token
from services.cementeries_services import (get_cementeries, post_cementery,get_cementeries_by_type,get_cementeries_by_place)

router = APIRouter()

# Ruta POST para agregar nuevo cementerio
@router.post("/")
async def post_new_cementery(cementery: Cementery, token_data = Depends(verify_token)):
    try:
        response = await post_cementery(cementery)
        if response : return custom_response_success(cementery)
        else: custom_response_error(message="Ocurrió un error inesperado ",status_code=400)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ",status_code=400)
    
# Ruta GET para obtener todas las places
@router.get("/all")
async def get__all_cementeries(token_data=Depends(verify_token)):
    try:
        cementeries = await get_cementeries()
        return custom_response_success(cementeries)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)
    
# Ruta GET para filtrar por "type"
@router.get("/by_type")
async def get_cementeries_by_type_route(
    type: str = Query(...), token_data=Depends(verify_token)
):
    try:
        cementeries = await get_cementeries_by_type(type)
        return custom_response_success(cementeries)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado", status_code=400)

# Ruta GET para filtrar por "place"
@router.get("/by_place")
async def get_cementeries_by_place_route(
    place: str = Query(...), token_data=Depends(verify_token)
):
    try:
        cementeries = await get_cementeries_by_place(place)
        return custom_response_success(cementeries)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado", status_code=400)