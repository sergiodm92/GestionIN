from db import get_database

class DeceasedServices:
    def __init__(self):
        self.db = get_database()

    async def post_deceased(self, deceased):
        try:
            doc_ref = self.db.collection('deceased').document(deceased.id)
            doc_ref.set(deceased.dict())
            doc_snapshot = doc_ref.get()
            if doc_snapshot.exists:
                return True
            else:
                return False
        except Exception as e:
            print(e)
            return False

    async def get_deceaseds(self):
        try:
            deceaseds = []
            docs = self.db.collection('deceased').get()
            for doc in docs:
                deceased = doc.to_dict()
                deceaseds.append(deceased)
            return deceaseds
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_deceased_name_service(self, name):
        try:
            deceaseds = []
            docs = self.db.collection('deceased').where('name', '>=', name).where('name', '<=', name + '\uf8ff').get()
            for doc in docs:
                deceased = doc.to_dict()
                deceaseds.append(deceased)
            return deceaseds
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_deceased_id_service(self, id):
        try:
            deceased = self.db.collection('deceased').document(id).get()
            if deceased.exists:
                return deceased.to_dict()
            else:
                return False
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_deceased_id_request_service(self, id):
        try:
            deceased_docs = self.db.collection('deceased').where("id_request", "==", id).get()
            for deceased in deceased_docs:
                return deceased.to_dict()
            return False
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_deceased_tombstone(self):
        try:
            deceaseds = []
            docs = self.db.collection('deceased').where("tombstone", "==", False).get()
            for doc in docs:
                deceased = doc.to_dict()
                deceaseds.append(deceased)
            return deceaseds
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def put_tombstone_true(self, id):
        try:
            doc_ref = self.db.collection('deceased').document(id)
            doc = doc_ref.get()
            if doc.exists:
                doc_ref.update({'tombstone': True})
                return True
            else:
                return False
        except Exception as e:
            print(e)
            return False

    async def delete_deceased_id(self, id: str):
        try:
            deceased = self.db.collection('deceased').document(id)
            deceased_get = deceased.get()
            if deceased_get.exists:
                deceased.delete()
                return True
            else:
                return False
        except Exception as e:
            print(f'Ocurrió un error inesperado: {e}')
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}
