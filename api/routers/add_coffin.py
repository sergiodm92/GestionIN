from fastapi import APIRouter, Depends
from models import AddCoffin
from middlewares.response import custom_response_success, custom_response_error
from middlewares.verify_token import verify_token
from services.add_coffin_services import AddCoffinServices


router = APIRouter()
add_coffin_services = AddCoffinServices()


@router.post("/", summary= "states = ['new', 'pending', 'deleted', 'done']")
async def post_new_add(add: AddCoffin):
    try:
        response = await add_coffin_services.post_add(add)
        if response : return custom_response_success(add)
        else: custom_response_error(message="Ocurrió un error inesperado ",status_code=400)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ",status_code=400)

# Ruta GET para obtener todas las cargas
@router.get("/all")
async def get_all_added(token_data=Depends(verify_token)):
    try:
        adds = await add_coffin_services.get_added()
        return custom_response_success(adds)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)
    
@router.get("/id/{id}")
async def get_add(id:str,token_data=Depends(verify_token)):
    try:
        add = await add_coffin_services.get_add_id(id)
        return custom_response_success(add)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)
    
# Ruta GET para obtener add por lugar
@router.get("/place/{place}")
async def get_added_by_place(place: str, token_data=Depends(verify_token)):
    try:
        added = await add_coffin_services.get_added_place(place)
        return custom_response_success(added)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)
    

@router.put("/state/{id}")
async def delete_add(id:str,token_data=Depends(verify_token)):
    try:
        response = await add_coffin_services.delete_add_id(id)
        if response:
            message = {"message": f"Se eliminó el add con id {id}"}
            return custom_response_success(message)
        else:
            return custom_response_error(message="No se pudo eliminar el add con id {id}", status_code=400)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado", status_code=400)
