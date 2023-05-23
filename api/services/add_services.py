from db import get_database
from models import Add, Stock
from services.stock_services import put_stock_id, post_model

db = get_database()

# Post add


async def post_add(add: Add):
    try:
        # Crea el nuevo documento en Firestore con los datos de add
        doc_ref_add = db.collection('added').document(add.id)
        doc_ref_add.set(add.dict())
        doc_snapshot_add = doc_ref_add.get()
        if doc_snapshot_add.exists:
            doc_ref_stock = db.collection('stock').document(add.id_coffin)
            doc_snapshot_stock = doc_ref_stock.get()
            if doc_snapshot_stock.exists:
                put_stock = await put_stock_id(add.id_coffin, add.units)
            # si logra actualizar el stock verifica si se creo el add y si es correcto devuelve true
                if (put_stock):
                    return True
                else:
                    return False
            else:
                post_new_model = await post_model(
                    Stock(
                        id_coffin=add.id_coffin,
                        place=add.place,
                        units=add.units
                    )
                )
                if (post_new_model):
                    return True
                else:
                    return False
        else:
            return False
    except Exception as e:
        print(e)
        return False

# Get added
async def get_added():
    try:
        added = []
        # Obtiene todos los documentos de la colección "stock"
        docs = db.collection('added').get()
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
        docs = db.collection('added').order_by('date').limit_to_last(limit).get()
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
        add = db.collection('added').document(id).get().to_dict()
        return add
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}
    
# Traer un add por lugar
async def get_added_place(place):
    try:
        added = []
        docs = db.collection('added').where("place","==",place).get()
        for doc in docs:
            add = doc.to_dict()
            added.append(add)
        return added
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}


async def delete_add_id(id: str):
    try:
        add_document_ref = db.collection('added').document(id)
        add_document_snapshot = add_document_ref.get()
        if add_document_snapshot.exists:
            add = add_document_snapshot.to_dict()
            response = await put_stock_id(add['id_coffin'], -add['units'])
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
