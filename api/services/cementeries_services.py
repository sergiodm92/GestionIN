from db import get_database
from models import Cementery
from fastapi import Query

class CementeryService:
    def __init__(self):
        self.db = get_database()

    async def post_cementery(self, model: Cementery):
        try:
            doc_ref = self.db.collection('cementeries').document()
            doc_ref.set(model.dict())
            doc_snapshot = doc_ref.get()
            if doc_snapshot.exists:
                return True
            else:
                return False
        except Exception as e:
            print(e)
            return False

    async def get_cementeries(self):
        try:
            cementeries = []
            docs = self.db.collection('cementeries').get()
            for doc in docs:
                cementery = doc.to_dict()
                cementeries.append(cementery)
            return cementeries
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_cementeries_by_type(self, type: str = Query(...)):
        try:
            cementeries = []
            docs = self.db.collection('cementeries').where('type', '==', type).get()
            for doc in docs:
                cementery = doc.to_dict()
                cementeries.append(cementery)
            return cementeries
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_cementeries_by_place(self, place: str = Query(...)):
        try:
            cementeries = []
            docs = self.db.collection('cementeries').where('place', '==', place).get()
            for doc in docs:
                cementery = doc.to_dict()
                cementeries.append(cementery)
            return cementeries
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}
