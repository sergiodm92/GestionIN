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
        docs = db.collection('general_stock').where('place','==',place).get()
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
        general_stock = db.collection('general_stock').document(id).get().to_dict()
        return general_stock
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

# Post new model
async def post_model(model:GeneralStock):
    try:
        # Crea el nuevo documento en Firestore con los datos de add
        doc_ref = db.collection('general_stock').document(model.id)
        doc_ref.set(model.dict())
        # Verifica que el documento se haya creado correctamente
        doc_snapshot = doc_ref.get()
        if doc_snapshot.exists:
            return True
        else:
            return False
    except Exception as e:
        print(e)
        return False
    
async def put_general_stock_id(place, product, operacion):
    try:
        doc_ref = db.collection('general_stock').where("place", "==", place).where("product", "==", product)
        docs = doc_ref.get()
        for doc in docs:
            if doc.exists:
                db.collection('general_stock').document(doc.id).update({'amount': doc.to_dict()['amount'] + operacion})
                return True
        return False
    except Exception as e:
        print(e)
        return False