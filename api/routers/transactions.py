from fastapi import APIRouter, Depends
from models import Transaction
from middlewares.response import custom_response_success, custom_response_error
from middlewares.verify_token import verify_token
from services.transaction_services import (get_all_transactions, post_transaction, get_transaction_by_id, get_transactions_add_id, cancel_transaction_by_id)

router = APIRouter()


@router.post("/")
async def post_transaction_route(new_transaction: Transaction,token_data=Depends(verify_token)):
    try:
        response = await post_transaction(new_transaction)
        if response:
            return custom_response_success(new_transaction)
        else:
            custom_response_error(
                message="No se cargó correctamente ", status_code=400)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=500)


# Ruta GET para obtener todos los requests
@router.get("/all")
async def get_all_transactions_route(token_data=Depends(verify_token)):
    try:
        transactions = await get_all_transactions()
        return custom_response_success(transactions)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado", status_code=400)
    


# Ruta GET para obtener una transacción por ID
@router.get("/id/{id}")
async def get_transaction_by_id_route(id: str, token_data=Depends(verify_token)):
    try:
        transaction = await get_transaction_by_id(id)
        return custom_response_success(transaction)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)

# Ruta GET para obtener una transacción por Add_ID
@router.get("/add_id/{id}")
async def get_request(id: str, token_data=Depends(verify_token)):
    try:
        transactions = await get_transactions_add_id(id)
        return custom_response_success(transactions)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)


# Ruta delete para eliminar una transacción por ID
@router.put("/cancel/{id}")
async def cancel_transaction_by_id_route(id: str, token_data=Depends(verify_token)):
    try:
        response = await cancel_transaction_by_id(id)
        if response:
            messege = {"messege": "se elimino el gasto con id {id}"}
            return custom_response_success(messege)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado ", status_code=400)