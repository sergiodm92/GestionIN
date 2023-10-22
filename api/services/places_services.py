from db import get_database
from models import Places

class PlaceServices:
    def __init__(self):
        self.db = get_database()

    async def post_place(self, model: Places):
        try:
            doc_ref = self.db.collection('places').document(model.initials)
            doc_ref.set(model.dict())
            doc_snapshot = doc_ref.get()
            return doc_snapshot.exists
        except Exception as e:
            print(e)
            return False

    async def get_places(self):
        try:
            places = []
            docs = self.db.collection('places').get()
            for doc in docs:
                place = doc.to_dict()
                places.append(place)
            return places
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}
