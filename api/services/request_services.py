from db import get_database
from services.coffin_stock_services import put_coffin_stock_id
# from services.deceased_services import (post_deceased, delete_deceased_id)
from models import Request
from add_coffin_services import put_add_coffin_id
from transaction_services import post_transaction

db = get_database()

# Create request
async def create_request(new_request: Request):
    try:
        # Crea el nuevo documento en Firestore con los datos de new_request
        doc_ref = db.collection('requests').document()
        doc_ref.set(new_request.dict())
        # Verifica que el documento se haya creado correctamente
        doc_snapshot = doc_ref.get()
        if doc_snapshot.exists:
            return True
        else:
            return False

    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

# Post request
async def post_request(new_request, new_transaction, add_id, transaction_id, coffin_group_id):
    try:
        # Inicia una transacción de base de datos
        with db.transaction():
            # Crea la solicitud
            await create_request(new_request)
            # Crea la transacción y obtén el ID del documento
            transaction_id = await post_transaction(new_transaction)
            # Actualiza la información de la transacción y el grupo de ataúdes
            await put_add_coffin_id(add_id, transaction_id, coffin_group_id)
        # Todas las operaciones se completaron correctamente, retorna el resultado
        return {'success': 'Operaciones completadas correctamente'}

    except Exception as e:
        # Si hay algún error, maneja la excepción y revierte cualquier cambio que hayas hecho
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

# get request
async def get_requests():
    try:
        requests = []
        docs = db.collection('requests').get()
        for doc in docs:
            request = doc.to_dict()
            requests.append(request)
        return requests
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}


# Obtener los últimos (limit) documentos
async def get_latest_requests(limit):
    try:
        requests = [] 
        docs = db.collection('requests').order_by('date').limit_to_last(limit).get()
        for doc in docs:
            request = doc.to_dict()
            requests.append(request)
        return requests
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

# Traer un siniestro por id
async def get_request_id(id:str):
    try:
        response ={}
        request = db.collection('requests').document(id).get().to_dict()
        id_deceased = request['id_deceased']
        deceased = db.collection('deceased').document(id_deceased).get().to_dict()
        response['request'] = request
        response['deceased'] = deceased
        return response
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}
    
# Traer un siniestro por lugar
async def get_request_place(place):
    try:
        requests = []
        docs = db.collection('requests').where("place","==",place).get()
        for doc in docs:
            request = doc.to_dict()
            requests.append(request)
        return requests
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

# Delete request
async def delete_request_id(id: str):
    try:
        request= db.collection('requests').document(id)
        request_get = request.get()
        id_deceased = request_get.to_dict()['id_deceased']
        if request_get.exists:
            requests = request_get.to_dict()
            response = await put_coffin_stock_id(requests['id_coffin'], 1)
            if response:
                request.delete()
                response_delete_deceased = await delete_deceased_id(id_deceased)
                if(response_delete_deceased):
                    return True
            else:
                return False
        else:
            return False
    except Exception as e:
        print(f'Ocurrió un error inesperado: {e}')
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

