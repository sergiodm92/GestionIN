from db import get_database
from services.coffin_stock_services import put_coffin_stock_id
from services.deceased_services import (post_deceased, delete_deceased_id)
from models import Transaction

db = get_database()


# Post transaction
async def post_transaction(new_transaction: Transaction):
    try:
        doc_ref = db.collection('transactions').add(new_transaction.dict())

        return doc_ref.id
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}


# get all transactions
async def get_all_transactions():
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


# Get transaction by ID
async def get_transaction_by_id(id:str):
    try:
        transaction_doc = db.collection('transactions').document(id).get()
        transaction = transaction_doc.to_dict()
        return transaction
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

# Get transaction by Add_ID
async def get_transactions_add_id(id:str):
    try:
        transactions = []
        docs = db.collection('transactions').where('add_id', '==', id).get()
        for doc in docs:
            transaction = doc.to_dict()
            transactions.append(transaction)
        return transactions
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}
    

# Update transaction to cancelled
async def cancel_transaction_by_id(transaction_id):
    try:
        transaction_ref = db.collection('transactions').document(transaction_id)
        transaction = transaction_ref.get()
        if transaction.exists:
            transaction_data = transaction.to_dict()
            if transaction_data['status'] == 'approved':
                # update a transaction to 'cancelled'
                transaction_ref.update({'status': 'cancelled'})
                return {'message': 'La transacción ha sido cancelada exitosamente.'}
            else:
                return {'error': 'La transacción no se puede cancelar porque no está en estado "approved".'}
        else:
            return {'error': 'No se encontró ninguna transacción con el ID proporcionado.'}
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}
