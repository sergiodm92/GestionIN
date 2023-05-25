from fastapi import APIRouter, Depends
from middlewares.response import custom_response_success, custom_response_error
from middlewares.verify_token import verify_token
from services.deceased_services import (get_deceaseds, get_deceased_name_service, get_deceased_tombstone,
                                        put_tombstone_true, get_deceased_id_service, get_deceased_id_request_service)

router = APIRouter()

# Ruta GET para obtener todos los requests


@router.get("/all")
async def get_all_deceaseds(token_data=Depends(verify_token)):
    try:
        deceaseds = await get_deceaseds()
        return custom_response_success(deceaseds)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)


@router.get("/name/{name}")
async def get_deceaseds_name(name: str, token_data=Depends(verify_token)):
    try:
        deceaseds = await get_deceased_name_service(name)
        return custom_response_success(deceaseds)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)


@router.get("/id/{id}")
async def get_deceaseds_name(id: str, token_data=Depends(verify_token)):
    try:
        deceaseds = await get_deceased_id_service(id)
        if deceaseds:
            return custom_response_success(deceaseds)
        else:
            return custom_response_error(message=f"El id {id} no se encontró", status_code=404)
    except Exception as e:
        print(e)
        return custom_response_error(message='Error inesperado en el servidor', status_code=500)


@router.get("/id_request/{id}")
async def get_deceaseds_name(id: str, token_data=Depends(verify_token)):
    try:
        deceaseds = await get_deceased_id_request_service(id)
        if deceaseds:
            return custom_response_success(deceaseds)
        else:
            return custom_response_error(message=f"El id_request {id} no se encontró", status_code=404)
    except Exception as e:
        print(e)
        return custom_response_error(message='Error inesperado en el servidor', status_code=500)


@router.get("/without_tombstone")
async def get_deceaseds_without_tombstone(token_data=Depends(verify_token)):
    try:
        deceaseds = await get_deceased_tombstone()
        return custom_response_success(deceaseds)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)


@router.put("/tombstone/{id}")
async def put_tombstone(id: str, token_data=Depends(verify_token)):
    try:
        response = await put_tombstone_true(id)
        return custom_response_success(response)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)
