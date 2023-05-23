from fastapi import APIRouter, Depends
from models import New_request
from middlewares.response import custom_response_success, custom_response_error
from middlewares.verify_token import verify_token
from services.request_services import (
    get_requests, get_latest_requests, post_request, get_request_id, delete_request_id, get_request_place)

router = APIRouter()


@router.post("/")
async def cargar_request(new_request: New_request, token_data=Depends(verify_token)):
    try:
        response = await post_request(new_request)
        if response:
            return custom_response_success(new_request)
        else:
            custom_response_error(
                message="No se cargó correctamente ", status_code=300)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)


# Ruta GET para obtener todos los requests
@router.get("/all")
async def get_all_requests(token_data=Depends(verify_token)):
    try:
        requests = await get_requests()
        return custom_response_success(requests)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)
    

# Ruta GET para obtener los ultimos (limit) requests
@router.get("/limit/{limit}")
async def get_all_requests(limit:int, token_data=Depends(verify_token)):
    try:
        requests = await get_latest_requests(limit)
        return custom_response_success(requests)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)
    


# Ruta GET para obtener un request
@router.get("/id/{id}")
async def get_request(id: str, token_data=Depends(verify_token)):
    try:
        request = await get_request_id(id)
        return custom_response_success(request)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)


# Ruta GET para obtener request por lugar
@router.get("/place/{place}")
async def get_requests_by_place(place: str, token_data=Depends(verify_token)):
    try:
        request = await get_request_place(place)
        return custom_response_success(request)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)
    

@router.delete("/{id}")
async def delete_request(id: str, token_data=Depends(verify_token)):
    try:
        response = await delete_request_id(id)
        if response:
            messege = {"messege": "se elimino el gasto con id {id}"}
            return custom_response_success(messege)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)
