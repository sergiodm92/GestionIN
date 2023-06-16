from db import get_database
from models import GeneralStock

db = get_database()

# Traer general_stock


async def get_general_stock():
    try:
        general_stock = []
        # Obtiene todos los documentos de la colección "general_stock"
        docs = db.collection('general_stock').get()
        for doc in docs:
            # Convierte los datos del documento a un diccionario
            product = doc.to_dict()
            # Agrega el diccionario a la lista de compras
            general_stock.append(product)
        return general_stock
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

# Traer general_stock


async def get_general_stock_place(place):
    try:
        general_stock = []
        # Obtiene todos los documentos de la colección "general_stock"
        docs = db.collection('general_stock').where('place', '==', place).get()
        for doc in docs:
            # Convierte los datos del documento a un diccionario
            product = doc.to_dict()
            # Agrega el diccionario a la lista de compras
            general_stock.append(product)
        return general_stock
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

# Get general_stock by ID


async def get_general_stock_id_service(id):
    try:
        general_stock = {}
        # Obtiene todos los documentos de la colección "compras"
        general_stock = db.collection(
            'general_stock').document(id).get().to_dict()
        return general_stock
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

# Post new model


async def post_general_model(model: GeneralStock):
    try:
        doc_ref = db.collection('general_stock').document(model.id)
        doc_ref.set(model.dict())
        return True
    except Exception as e:
        print(e)
        return False


async def put_general_stock_id(id, operacion):
    try:
        doc_ref = db.collection('general_stock').document(id)
        doc = doc_ref.get()
        if doc.exists:
            doc_ref.update({'amount': doc.to_dict()['amount'] + operacion})
            return True
        else:
            return False
    except Exception as e:
        print(e)
        return False
