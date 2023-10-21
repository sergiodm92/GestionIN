from db import get_database
from models import AddCoffin

class AddCoffinServices:
    def __init__(self):
        self.db = get_database()

    async def post_add(self, add: AddCoffin):
        try:
            doc_ref_add = self.db.collection('add_coffin').document(add.id)
            doc_ref_add.set(add.dict())
            doc_snapshot_add = doc_ref_add.get()
            if doc_snapshot_add.exists:
                return True
            else:
                return False
        except Exception as e:
            print(e)
            return False

    async def put_add_coffin_id(self, add_id, transaction_id, coffin_group_id):
        try:
            doc_ref = self.db.collection('add_coffin').document(add_id)
            doc = doc_ref.get()
            if doc.exists:
                add = doc.to_dict()
                coffins = add['coffins']  
                for coffin in coffins:
                    if coffin['id'] == coffin_group_id:
                        transaction_id_update = coffin['transaction_id'].append(transaction_id)
                doc_ref.update({'transaction_id': transaction_id_update})
                return True
            else:
                return False
        except Exception as e:
            print(e)
            return False

    async def get_added(self):
        try:
            added = []
            docs = self.db.collection('add_coffin').get()
            for doc in docs:
                add = doc.to_dict()
                added.append(add)
            return added
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_add_id(self, id: str):
        try:
            add = self.db.collection('add_coffin').document(id).get().to_dict()
            return add
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_added_place(self, place):
        try:
            added = []
            docs = self.db.collection('add_coffin').where("place", "==", place).get()
            for doc in docs:
                add = doc.to_dict()
                added.append(add)
            return added
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def delete_add_id(self, id: str):
        try:
            add = self.db.collection('add_coffin').document(id).get()
            if add.get().exists:
                add.update({'state': 'deleted'})
                return True
            else:
                return False
        except Exception as e:
            print(f'Ocurrió un error inesperado: {e}')
            return False








