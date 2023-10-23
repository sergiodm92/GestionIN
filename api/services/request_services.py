from db import get_database
from models import Request, Transaction, New_Request
from services.add_coffin_services import AddCoffinServices
from services.transaction_services import TransactionServices

add_coffin_services = AddCoffinServices()
transactions_services = TransactionServices()


class RequestServices:
    def __init__(self):
        self.db = get_database()

    async def create_request(self, new_request: Request):
        try:
            doc_ref = self.db.collection('requests').document()
            doc_ref.set(new_request.dict())
            doc_snapshot = doc_ref.get()
            return doc_snapshot.exists  # return true if the request was created
        except Exception as e:
            print(e)
            return False

    async def post_request(self, new_request: New_Request):
        try:
            new_coffin_transaction = Transaction(
            date=new_request.request.date,
            id_add=new_request.request.id_add,
            id_group=new_request.request.id_coffin_group,
            type="request_coffin",
            status="approved"
            )
            new_metal_box_transaction = {}
           
            with self.db.transaction():  # do a transaction to ensure that all the operations are done
                await self.create_request(new_request)  # create the request
                await transactions_services.post_transaction(new_coffin_transaction) # create a transaction and return true if it was created
                if new_request.request.aditional_metal_box:
                    new_metal_box_transaction = Transaction(
                    date=new_request.request.date,
                    id_add=new_request.request.id_add_metal_box,
                    id_group=new_request.request.id_metal_box_group,
                    type="request_metal_box",
                    status="approved"
                    )
                    await transactions_services.post_transaction(new_metal_box_transaction) # create a transaction and return true if it was created
            return {'success': 'the request was created successfully'}
        except Exception as e:
            print(e)
            return {'error': 'an unexpected error occurred : {}'.format(e)}

    async def get_requests(self):
        try:
            requests = []
            docs = self.db.collection('requests').get()
            for doc in docs:
                request = doc.to_dict()
                requests.append(request)
            return requests
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_latest_requests(self, limit):
        try:
            requests = []
            docs = self.db.collection('requests').order_by(
                'date').limit_to_last(limit).get()
            for doc in docs:
                request = doc.to_dict()
                requests.append(request)
            return requests
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_request_id(self, id: str):
        try:
            response = {}
            request = self.db.collection(
                'requests').document(id).get().to_dict()
            id_deceased = request['id_deceased']
            deceased = self.db.collection('deceased').document(
                id_deceased).get().to_dict()
            response['request'] = request
            response['deceased'] = deceased
            return response
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_request_place(self, place):
        try:
            requests = []
            docs = self.db.collection('requests').where(
                "place", "==", place).get()
            for doc in docs:
                request = doc.to_dict()
                requests.append(request)
            return requests
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def delete_request_id(self, id: str):
        try:
            request = self.db.collection('requests').document(id)
            request_get = request.get()
            id_deceased = request_get.to_dict()['id_deceased']
        except Exception as e:
            print(f'Ocurrió un error inesperado: {e}')
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}
