from db import get_database
from models import MetalBoxStock

class MetalBoxStockServices:
    def __init__(self):
        self.db = get_database()

    async def get_metal_box_stock(self):
        try:
            metal_box_stock = []
            docs = self.db.collection('metal_box_stock').get()
            for doc in docs:
                product = doc.to_dict()
                metal_box_stock.append(product)
            return metal_box_stock
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_metal_box_stock_place(self, place):
        try:
            metal_box_stock = []
            docs = self.db.collection('metal_box_stock').where('place', '==', place).get()
            for doc in docs:
                product = doc.to_dict()
                metal_box_stock.append(product)
            return metal_box_stock
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_metal_box_stock_id_service(self, id):
        try:
            metal_box_stock = {}
            metal_box_stock = self.db.collection('metal_box_stock').document(id).get().to_dict()
            return metal_box_stock
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def post_metal_box_model(self, model: MetalBoxStock):
        try:
            doc_ref = self.db.collection('metal_box_stock').document(model.id)
            doc_ref.set(model.dict())
            doc_snapshot = doc_ref.get()
            if doc_snapshot.exists:
                return True
            else:
                return False
        except Exception as e:
            print(e)
            return False

    async def put_metal_box_stock_id(self, id, operacion):
        try:
            doc_ref = self.db.collection('metal_box_stock').document(id)
            doc = doc_ref.get()
            if doc.exists:
                db.collection('metal_box_stock').document(doc.id).update({'units': doc.to_dict()['units'] + operacion})
                return True
            else:
                return False
        except Exception as e:
            print(e)
            return False
