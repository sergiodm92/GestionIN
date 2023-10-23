from db import get_database
from models import DataAddDelete

class AddMetalBoxServices:
    def __init__(self):
        self.db = get_database()

    async def get_added(self):
        try:
            added = []
            # Obtiene todos los documentos de la colección "metal_box_stock"
            docs = self.db.collection('add_metal_box').get()
            for doc in docs:
                # Convierte los datos del documento a un diccionario
                add = doc.to_dict()
                add['id_doc'] = doc.id
                # Agrega el diccionario a la lista de compras
                added.append(add)
            return added
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_latest_added(self, limit):
        try:
            added = []
            docs = self.db.collection('add_metal_box').order_by('date').limit_to_last(limit).get()
            for doc in docs:
                add = doc.to_dict()
                added.append(add)
            return added
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_add_id(self, id: str):
        try:
            add = {}
            add = self.db.collection('add_metal_box').document(id).get().to_dict()
            return add
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_added_place(self, place):
        try:
            added = []
            docs = self.db.collection('add_metal_box').where("place", "==", place).get()
            for doc in docs:
                add = doc.to_dict()
                added.append(add)
            return added
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def delete_add_id(self, dataAddDelete: DataAddDelete):
        try:
            add_document_ref = self.db.collection('add_metal_box').document(dataAddDelete.id_doc)
            add_document_snapshot = add_document_ref.get()
        except Exception as e:
            print(f'Ocurrió un error inesperado: {e}')
            return False