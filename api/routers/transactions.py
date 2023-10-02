from fastapi import APIRouter, Depends
from models import New_request
from middlewares.response import custom_response_success, custom_response_error
from middlewares.verify_token import verify_token
from services.transaction_services import (get_latest_requests, post_transaction)

router = APIRouter()


# @router.post("/")
# async def cargar_request(new_request: New_request, token_data=Depends(verify_token)):
#     try:
#         response = await post_transaction(new_request)
#         if response:
#             return custom_response_success(new_request)
#         else:
#             custom_response_error(
#                 message="No se cargó correctamente ", status_code=300)
#     except Exception as e:
#         print(e)
#         return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)


# # Ruta GET para obtener todos los requests
# @router.get("/all")
# async def get_all_requests(token_data=Depends(verify_token)):
#     try:
#         requests = await get_requests()
#         return custom_response_success(requests)
#     except Exception as e:
#         print(e)
#         return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)
    

# # Ruta GET para obtener los ultimos (limit) requests
# @router.get("/limit/{limit}")
# async def get_all_requests(limit:int, token_data=Depends(verify_token)):
#     try:
#         requests = await get_latest_requests(limit)
#         return custom_response_success(requests)
#     except Exception as e:
#         print(e)
#         return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)
    


# # Ruta GET para obtener una transacción por ID
# @router.get("/id/{id}")
# async def get_request(id: str, token_data=Depends(verify_token)):
#     try:
#         request = await get_request_id(id)
#         return custom_response_success(request)
#     except Exception as e:
#         print(e)
#         return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)

# # Ruta GET para obtener una transacción por Add_ID
# @router.get("/add_id/{id}")
# async def get_request(id: str, token_data=Depends(verify_token)):
#     try:
#         request = await get_request_id(id)
#         return custom_response_success(request)
#     except Exception as e:
#         print(e)
#         return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)


# # Ruta delete para eliminar una transacción por ID
# @router.delete("/{id}")
# async def delete_request(id: str, token_data=Depends(verify_token)):
#     try:
#         response = await delete_request_id(id)
#         if response:
#             messege = {"messege": "se elimino el gasto con id {id}"}
#             return custom_response_success(messege)
#     except Exception as e:
#         print(e)
#         return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)