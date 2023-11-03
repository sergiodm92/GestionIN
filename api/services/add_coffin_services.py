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

    async def put_add_coffin_id(self, id_add, id_transaction, coffin_group_id):
        try:
            doc_ref = self.db.collection('add_coffin').document(id_add)
            doc = doc_ref.get()
            if doc.exists:
                add = doc.to_dict()
                coffins = add['coffins']
                updated_coffins = []
                coffin_found = False
                for coffin in coffins:
                    if coffin['id'] == coffin_group_id:
                        coffin['transaction_id'].append(id_transaction)
                        coffin_found = True
                    updated_coffins.append(coffin)
                if coffin_found:
                    doc_ref.update({'coffins': updated_coffins})
                    return True
                else:
                    raise Exception(f"El grupo de ataúdes con ID {coffin_group_id} no se encontró en el documento {id_add}")
            else:
                raise Exception(f"El documento con ID {id_add} no se encontró")
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
            docs = self.db.collection('add_coffin').where(
                "place", "==", place).get()
            for doc in docs:
                add = doc.to_dict()
                added.append(add)
            return added
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}
    
    def get_added_place_status_pending (self, place):
        try:
            added = []
            docs = self.db.collection('add_coffin').where("place","==", place).where("status","==","pending").get()
            for doc in docs:
                add = doc.to_dict()
                added.append(add)
            return added
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}
    
    def get_added_status_pending (self):
        try:
            added = []
            docs = self.db.collection('add_coffin').where("status","==","pending").get()
            for doc in docs:
                add = doc.to_dict()
                added.append(add)
            return added
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}


    async def delete_add_id(self, id: str):
        try:
            add_ref = self.db.collection('add_coffin').document(id)
            add_ref.update({'state': 'deleted'})
            return True
        except Exception as e:
            print(f'Ocurrió un error inesperado: {e}')
            return False
