from db import get_database
from models import Places

db = get_database()

# Post new place
async def post_place(model:Places):
    try:
        # Crea el nuevo documento en Firestore con los datos de add
        doc_ref = db.collection('places').document(model.initials)
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
async def get_places():
    try:
        places = []
        docs = db.collection('places').get()
        for doc in docs:
            place = doc.to_dict()
            places.append(place)
        return places
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}