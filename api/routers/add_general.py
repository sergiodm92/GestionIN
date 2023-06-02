from fastapi import APIRouter, Depends
from models import AddGeneralStock
from middlewares.response import custom_response_success, custom_response_error
from middlewares.verify_token import verify_token
from services.add_general_services import (get_added, get_latest_added, get_add_id, get_added_place, post_add, delete_add_id)


router = APIRouter()

@router.post("/")
async def post_new_add(add: AddGeneralStock, token_data = Depends(verify_token)):
    try:
        response = await post_add(add)
        if response : return custom_response_success(add)
        else: custom_response_error(message="Ocurrió un error inesperado ",status_code=400)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ",status_code=400)

# Ruta GET para obtener todas las cargas
@router.get("/all")
async def get_all_added(token_data=Depends(verify_token)):
    try:
        adds = await get_added()
        return custom_response_success(adds)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)
    
# Ruta GET para obtener los ultimos (limit) added
@router.get("/limit/{limit}")
async def get_latest_added_route(limit:int, token_data=Depends(verify_token)):
    try:
        added = await get_latest_added(limit)
        return custom_response_success(added)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)

# Ruta GET para obtener todas las cargas
@router.get("/id/{id}")
async def get_add(id:str,token_data=Depends(verify_token)):
    try:
        add = await get_add_id(id)
        return custom_response_success(add)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)
    
# Ruta GET para obtener add por lugar
@router.get("/place/{place}")
async def get_added_by_place(place: str, token_data=Depends(verify_token)):
    try:
        added = await get_added_place(place)
        return custom_response_success(added)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)
    

@router.delete("/{id}")
async def delete_add(id:str,token_data=Depends(verify_token)):
    try:
        response = await delete_add_id(id)
        if response:
            message = {"message": f"Se eliminó el gasto con id {id}"}
            return custom_response_success(message)
        else:
            return custom_response_error(message="No se pudo eliminar el gasto con id {id}", status_code=400)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado", status_code=400)