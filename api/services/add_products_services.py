from db import get_database
from models import AddProducts, Product, DataAddDelete

class AddProductsServices:
    def __init__(self):
        self.db = get_database()

    async def post_add(self, add: AddProducts):
        try:
            doc_ref_add = self.db.collection('add_products').document()
            doc_ref_add.set(add.dict())
        except Exception as e:
            print(e)
            return False

    async def get_added(self):
        try:
            added = []
            docs = self.db.collection('add_producs').get()
            for doc in docs:
                add = doc.to_dict()
                added.append(add)
            return added
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_latest_added(self, limit):
        try:
            added = []
            docs = self.db.collection('add_general').order_by('date').limit_to_last(limit).get()
            for doc in docs:
                add = doc.to_dict()
                added.append(add)
            return added
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_add_id(self, id: str):
        try:
            add = self.db.collection('add_general').document(id).get().to_dict()
            return add
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_adds_place_status_pending(self, place):
        try:
            adds = []
            docs = self.db.collection('add_products').where("place", "==", place).where("status", "==", "pending").get()
            for doc in docs:
                add = doc.to_dict()
                adds.append(add)
            return adds
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_added_place(self, place):
            try:
                added = []
                docs = self.db.collection('add_general').where("place", "==", place).get()
                for doc in docs:
                    add = doc.to_dict()
                    added.append(add)
                return added
            except Exception as e:
                print(e)
                return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def delete_add_id(self, dataAddDelete: DataAddDelete):
        try:
            add_document_ref = self.db.collection('add_general').document(dataAddDelete.id_doc)
            add_document_snapshot = add_document_ref.get()
            if add_document_snapshot.exists:
                add = add_document_snapshot.to_dict()
                response = await self.put_general_stock_id(dataAddDelete.id, -add['amount'])
                if response:
                    add_document_ref.delete()
                    return True
                else:
                    return False
            else:
                return False
        except Exception as e:
            print(f'Ocurrió un error inesperado: {e}')
            return False

   
