from db import get_database
from models import GeneralStock

class GeneralStockServices:
    def __init__(self):
        self.db = get_database()

    async def get_general_stock(self):
        try:
            general_stock = []
            docs = self.db.collection('general_stock').get()
            for doc in docs:
                product = doc.to_dict()
                general_stock.append(product)
            return general_stock
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_general_stock_place(self, place):
        try:
            general_stock = []
            docs = self.db.collection('general_stock').where('place', '==', place).get()
            for doc in docs:
                product = doc.to_dict()
                general_stock.append(product)
            return general_stock
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_general_stock_id(self, id):
        try:
            general_stock = {}
            general_stock = self.db.collection('general_stock').document(id).get().to_dict()
            return general_stock
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def post_general_model(self, model: GeneralStock):
        try:
            doc_ref = self.db.collection('general_stock').document(model.id)
            doc_ref.set(model.dict())
            return True
        except Exception as e:
            print(e)
            return False

    async def put_general_stock_id(self, id, operacion):
        try:
            doc_ref = self.db.collection('general_stock').document(id)
            doc = doc_ref.get()
            if doc.exists:
                doc_ref.update({'amount': doc.to_dict()['amount'] + operacion})
                return True
            else:
                return False
        except Exception as e:
            print(e)
            return False
