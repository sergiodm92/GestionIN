from fastapi import APIRouter, Depends
from models import New_Request
from middlewares.response import custom_response_success, custom_response_error
from middlewares.verify_token import verify_token
from services.request_services import RequestServices

router = APIRouter()
request_services = RequestServices()


@router.post("/")
async def create_request(new_request: New_Request, token_data=Depends(verify_token)):
    try:
        response = await request_services.post_request(new_request)
        if response["success"]:
            return custom_response_success(response)
        else:
            if response["error"]:
                return custom_response_error(message=response["error"], status_code=400)
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
        requests = await request_services.get_requests()
        return custom_response_success(requests)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)


# Ruta GET para obtener los ultimos (limit) requests
@router.get("/limit/{limit}")
async def get_all_requests(limit: int, token_data=Depends(verify_token)):
    try:
        requests = await request_services.get_latest_requests(limit)
        return custom_response_success(requests)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)


# Ruta GET para obtener un request
@router.get("/id/{id}")
async def get_request(id: str, token_data=Depends(verify_token)):
    try:
        request = await request_services.get_request_id(id)
        return custom_response_success(request)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)


# Ruta GET para obtener request por lugar
@router.get("/place/{place}")
async def get_requests_by_place(place: str, token_data=Depends(verify_token)):
    try:
        request = await request_services.get_request_place(place)
        return custom_response_success(request)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)


@router.delete("/{id}")
async def delete_request(id: str, token_data=Depends(verify_token)):
    try:
        response = await request_services.delete_request_id(id)
        if response:
            messege = {"messege": "se elimino el gasto con id {id}"}
            return custom_response_success(messege)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)
