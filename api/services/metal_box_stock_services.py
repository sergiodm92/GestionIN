from db import get_database
from models import MetalBoxStock

db = get_database()

# Traer metal_box_stock
async def get_metal_box_stock():
    try:
        metal_box_stock = []
        # Obtiene todos los documentos de la colección "metal_box_stock"
        docs = db.collection('metal_box_stock').get()
        for doc in docs:
            # Convierte los datos del documento a un diccionario
            product = doc.to_dict()
            # Agrega el diccionario a la lista de compras
            metal_box_stock.append(product)
        return metal_box_stock
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

# Traer metal_box_stock
async def get_metal_box_stock_place(place):
    try:
        metal_box_stock = []
        # Obtiene todos los documentos de la colección "metal_box_stock"
        docs = db.collection('metal_box_stock').where('place','==',place).get()
        for doc in docs:
            # Convierte los datos del documento a un diccionario
            product = doc.to_dict()
            # Agrega el diccionario a la lista de compras
            metal_box_stock.append(product)
        return metal_box_stock
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}
    
# Get metal_box_stock by ID
async def get_metal_box_stock_id_service(id):
    try:
        metal_box_stock = {}
        # Obtiene todos los documentos de la colección "compras"
        metal_box_stock = db.collection('metal_box_stock').document(id).get().to_dict()
        return metal_box_stock
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

# Post new model
async def post_metal_box_model(model:MetalBoxStock):
    try:
        # Crea el nuevo documento en Firestore con los datos de add
        doc_ref = db.collection('metal_box_stock').document(model.id)
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
    
async def put_metal_box_stock_id(place, size, operacion):
    try:
        doc_ref = db.collection('metal_box_stock').where("place", "==", place).where("size", "==", size)
        docs = doc_ref.get()
        for doc in docs:
            if doc.exists:
                db.collection('metal_box_stock').document(doc.id).update({'units': doc.to_dict()['units'] + operacion})
                return True
        return False
    except Exception as e:
        print(e)
        return False
