from db import get_database
from models import AddCoffin

db = get_database()

# Post add
async def post_add(add: AddCoffin):
    try:
        # Crea el nuevo documento en Firestore con los datos de add
        doc_ref_add = db.collection('add_coffin').document(add.id)
        doc_ref_add.set(add.dict())
        doc_snapshot_add = doc_ref_add.get()
        if doc_snapshot_add.exists:
            return True
        else:
            return False
    except Exception as e:
        print(e)
        return False

# Get added
async def get_added():
    try:
        added = []
        # Obtiene todos los documentos de la colección "coffin_stock"
        docs = db.collection('add_coffin').get()
        for doc in docs:
            # Convierte los datos del documento a un diccionario
            add = doc.to_dict()
            # Agrega el diccionario a la lista de compras
            added.append(add)
        return added
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}


# Get add by ID
async def get_add_id(id: str):
    try:
        add = {}
        # Obtiene todos los documentos de la colección "compras"
        add = db.collection('add_coffin').document(id).get().to_dict()
        return add
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

# Traer un add por lugar
async def get_added_place(place):
    try:
        added = []
        docs = db.collection('add_coffin').where("place", "==", place).get()
        for doc in docs:
            add = doc.to_dict()
            added.append(add)
        return added
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}


async def delete_add_id(id: str):
    try:
        add = db.collection('add_coffin').document(id).get()
        if add.get().exists:
            add.update({'state': 'deleted'})
            return True
        else:
            return False
    except Exception as e:
        print(f'Ocurrió un error inesperado: {e}')
        return False
