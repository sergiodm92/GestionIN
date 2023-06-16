from db import get_database
from models import AddGeneralStock, GeneralStock
from services.general_stock_services import put_general_stock_id, post_general_model

db = get_database()

# Post add


async def post_add(add: AddGeneralStock):
    try:
        # Crea el nuevo documento en Firestore con los datos de add
        doc_ref_add = db.collection('add_general').document()
        doc_ref_add.set(add.dict())
        doc_snapshot_add = doc_ref_add.get()
        if doc_snapshot_add.exists:
            doc = db.collection('general_stock').document(add.id).get()
            if doc.exists:
                put_general_stock = await put_general_stock_id(id=add.id, operacion=add.amount)
                return put_general_stock
            else:
                post_new_model = await post_general_model(
                    GeneralStock(
                        id=add.id,
                        product=add.product,
                        place=add.place,
                        amount=add.amount
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
        # Obtiene todos los documentos de la colección "general_stock"
        docs = db.collection('add_general').get()
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
        docs = db.collection('add_general').order_by(
            'date').limit_to_last(limit).get()
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
        add = db.collection('add_general').document(id).get().to_dict()
        return add
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

# Traer un add por lugar


async def get_added_place(place):
    try:
        added = []
        docs = db.collection('add_general').where("place", "==", place).get()
        for doc in docs:
            add = doc.to_dict()
            added.append(add)
        return added
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

# Delete add by id


async def delete_add_id(id: str):
    try:
        add_document_ref = db.collection('add_general').document(id)
        add_document_snapshot = add_document_ref.get()
        if add_document_snapshot.exists:
            add = add_document_snapshot.to_dict()
            response = await put_general_stock_id(add['place'], add['product'], -add['amount'])
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
