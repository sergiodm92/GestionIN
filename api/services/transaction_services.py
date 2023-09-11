from db import get_database
from services.coffin_stock_services import put_coffin_stock_id
from services.deceased_services import (post_deceased, delete_deceased_id)

db = get_database()


# Post transaction
async def post_transaction(new_transaction):
    try:
        transaction = new_transaction.transaction
        id_coffin = transaction.id_coffin
        deceased = new_request.deceased
        doc_ref_request = db.collection('requests').document(request.id)
        doc_ref_request.set(request.dict())
        doc_snapshot_request = doc_ref_request.get()
        if doc_snapshot_request.exists:
            response_post_deceased = await post_deceased(deceased)
            if response_post_deceased:
                put_stock = await put_coffin_stock_id(id=id_coffin,operacion=-1)
                if(put_stock):
                    return True
                else:
                    return False
        else: return False
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}


# get all transactions
async def get_transactions():
    try:
        transactions = []
        docs = db.collection('transactions').get()
        for doc in docs:
            transaction = doc.to_dict()
            transactions.append(transaction)
        return transactions
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

# Traer una transaction por id
async def get_transaction_id(id:str):
    try:
        response ={}
        request = db.collection('transaction').document(id).get().to_dict()
        id_deceased = request['id_deceased']
        deceased = db.collection('deceased').document(id_deceased).get().to_dict()
        response['request'] = request
        response['deceased'] = deceased
        return response
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

# Traer una transaction por add_id
async def get_transactions_add_id(id:str):
    try:
        transactions = []
        # Obtiene todos los documentos de la colección "coffin_stock"
        docs = db.collection('coffin_stock').where('add_id', '==', id).get()
        for doc in docs:
            # Convierte los datos del documento a un diccionario
            product = doc.to_dict()
            id_coffin = product['id_coffin']
            product['coffin'] = parse_id_coffin(id_coffin)
            # Agrega el diccionario a la lista de compras
            transactions.append(product)
        return transactions
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

# Delete transaction
async def delete_transaction_id(id: str):
    try:
        request= db.collection('transactions').document(id)
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
