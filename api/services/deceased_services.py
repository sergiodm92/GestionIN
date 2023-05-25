from db import get_database

db = get_database()

# Post deceased
async def post_deceased(deceased):
    try:
        doc_ref = db.collection('deceased').document(deceased.id)
        doc_ref.set(deceased.dict())
        doc_snapshot = doc_ref.get()
        if doc_snapshot.exists: 
            return True
        else:
            return False
    except Exception as e:
        print(e)
        return False
    
# get request
async def get_deceaseds():
    try:
        deceaseds = []
        docs = db.collection('deceased').get()
        for doc in docs:
            deceased = doc.to_dict()
            deceaseds.append(deceased)
        return deceaseds
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}
    
async def get_deceased_name_service(name):
    try:
        deceaseds = []
        docs = db.collection('deceased').where('name', '>=', name).where('name', '<=', name + '\uf8ff').get()
        for doc in docs:
            deceased = doc.to_dict()
            deceaseds.append(deceased)
        return deceaseds
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

async def get_deceased_id_service(id):
    try:
        deceased = db.collection('deceased').document(id).get()
        if deceased.exists:
            return deceased.to_dict()
        else:
            return False
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

async def get_deceased_id_request_service(id):
    try:
        deceased_docs = db.collection('deceased').where("id_request", "==", id).get()
        for deceased in deceased_docs:
            return deceased.to_dict()
            break  
        return False 
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

# Traer un deceased por tombstone true
async def get_deceased_tombstone():
    try:
        deceaseds = []
        docs = db.collection('deceased').where("tombstone","==",False).get()
        for doc in docs:
            deceased = doc.to_dict()
            deceaseds.append(deceased)
        return deceaseds
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}
    
async def put_tombstone_true(id):
    try:
        doc_ref = db.collection('deceased').document(id)
        doc = doc_ref.get()
        if doc.exists:
            doc_ref.update({'tombstone': True})
            return True
        else:
            return False
    except Exception as e:
        print(e)
        return False
    
# Delete deceased
async def delete_deceased_id(id: str):
    try:
        deceased= db.collection('deceased').document(id)
        deceased_get = deceased.get()
        if deceased_get.exists:
            deceased.delete()
            return True
        else:
            return False
    except Exception as e:
        print(f'Ocurrió un error inesperado: {e}')
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}