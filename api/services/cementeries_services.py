from db import get_database
from models import Cementery
from fastapi import Query

db = get_database()

# Post new place
async def post_cementery(model:Cementery):
    try:
        # Crea el nuevo documento en Firestore con los datos de add
        doc_ref = db.collection('cementeries').document()
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
    
# get request
async def get_cementeries():
    try:
        cementeries = []
        docs = db.collection('cementeries').get()
        for doc in docs:
            cementery = doc.to_dict()
            cementeries.append(cementery)
        return cementeries
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

async def get_cementeries_by_type(type: str = Query(...)):
    try:
        cementeries = []
        # Realiza una consulta a Firestore para filtrar por "type"
        docs = db.collection('cementeries').where('type', '==', type).get()
        for doc in docs:
            cementery = doc.to_dict()
            cementeries.append(cementery)
        return cementeries
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

# Nuevo servicio para filtrar por "place"
async def get_cementeries_by_place(place: str = Query(...)):
    try:
        cementeries = []
        # Realiza una consulta a Firestore para filtrar por "place"
        docs = db.collection('cementeries').where('place', '==', place).get()
        for doc in docs:
            cementery = doc.to_dict()
            cementeries.append(cementery)
        return cementeries
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}