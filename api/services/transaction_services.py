from db import get_database
from models import Transaction

class TransactionServices:
    def __init__(self):
        self.db = get_database()

    async def post_transaction(self, new_transaction: Transaction):
        try:
            doc_ref = self.db.collection('transactions').document()
            doc_ref.set(new_transaction.dict())
            return True
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_all_transactions(self):
        try:
            transactions = []
            docs = self.db.collection('transactions').get()
            for doc in docs:
                transaction = doc.to_dict()
                transactions.append(transaction)
            return transactions
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_transaction_by_id(self, id:str):
        try:
            transaction_doc = self.db.collection('transactions').document(id).get()
            transaction = transaction_doc.to_dict()
            return transaction
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    def get_transactions_add_id(self, id:str):
        try:
            transactions = []
            docs = self.db.collection('transactions').where('id_add', '==', id).get()
            for doc in docs:
                transaction = doc.to_dict()
                transactions.append(transaction)
            return transactions
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def cancel_transaction_by_id(self, transaction_id):
        try:
            transaction_ref = self.db.collection('transactions').document(transaction_id)
            transaction = transaction_ref.get()
            if transaction.exists:
                transaction_data = transaction.to_dict()
                if transaction_data['status'] == 'approved':
                    transaction_ref.update({'status': 'cancelled'})
                    return {'message': 'La transacción ha sido cancelada exitosamente.'}
                else:
                    return {'error': 'La transacción no se puede cancelar porque no está en estado "approved".'}
            else:
                return {'error': 'No se encontró ninguna transacción con el ID proporcionado.'}
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}
