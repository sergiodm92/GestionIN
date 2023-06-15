from db import get_database
from models import AddMetalBox, MetalBoxStock
from services.metal_box_stock_services import put_metal_box_stock_id, post_metal_box_model

db = get_database()

# Post add


async def post_add(add: AddMetalBox):
    try:
        # Crea el nuevo documento en Firestore con los datos de add
        doc_ref_add = db.collection('add_metal_box').document(add.id)
        doc_ref_add.set(add.dict())
        doc_snapshot_add = doc_ref_add.get()
        if doc_snapshot_add.exists:
            doc_metal_box_stock = db.collection('metal_box_stock').where("place","==",add.place).where("size","==",add.size).get()
            if doc_metal_box_stock:
                put_metal_box_stock = put_metal_box_stock_id(add.place, add.size, add.units)
                # Si logra actualizar el metal_box_stock verifica si se creó el add y si es correcto devuelve True
                return put_metal_box_stock
            else:
                post_new_model = post_metal_box_model(
                    MetalBoxStock(
                        id=add.id,
                        size=add.size,
                        place=add.place,
                        units=add.units
                    )
                )
                return post_new_model
        else:
            return False
    except Exception as e:
        print(e)
        return False


# Get added
async def get_added():
    try:
        added = []
        # Obtiene todos los documentos de la colección "metal_box_stock"
        docs = db.collection('add_metal_box').get()
        for doc in docs:
            # Convierte los datos del documento a un diccionario
            add = doc.to_dict()
            # Agrega el diccionario a la lista de compras
            added.append(add)
        return added
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}
    
# Obtener los últimos (limit) documentos
async def get_latest_added(limit):
    try:
        added = [] 
        docs = db.collection('add_metal_box').order_by('date').limit_to_last(limit).get()
        for doc in docs:
            add = doc.to_dict()
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
        add = db.collection('add_metal_box').document(id).get().to_dict()
        return add
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}
    
# Traer un add por lugar
async def get_added_place(place):
    try:
        added = []
        docs = db.collection('add_metal_box').where("place","==",place).get()
        for doc in docs:
            add = doc.to_dict()
            added.append(add)
        return added
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}


async def delete_add_id(id: str):
    try:
        add_document_ref = db.collection('add_metal_box').document(id)
        add_document_snapshot = add_document_ref.get()
        if add_document_snapshot.exists:
            add = add_document_snapshot.to_dict()
            response = put_metal_box_stock_id(add['place'], add['size'], -add['units'])
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

