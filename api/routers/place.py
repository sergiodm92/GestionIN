# from fastapi import APIRouter, Depends
# from models import Places
# from middlewares.response import custom_response_success, custom_response_error
# from middlewares.verify_token import verify_token
# from services.places_services import (get_places, post_place)

# router = APIRouter()

# # Ruta POST para agregar nueva place
# @router.post("/")
# async def post_new_place(place: Places):
#     try:
#         response = await post_place(place)
#         if response : return custom_response_success(place)
#         else: custom_response_error(message="Ocurrió un error inesperado ",status_code=400)
#     except Exception as e:
#         print(e)
#         return custom_response_error(message="Ocurrió un error inesperado ",status_code=400)
    
# # Ruta GET para obtener todas las places
# @router.get("/all")
# async def get__all_places():
#     try:
#         adds = await get_places()
#         return custom_response_success(adds)
#     except Exception as e:
#         print(e)
#         return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)