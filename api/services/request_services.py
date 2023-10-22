from db import get_database
from services.coffin_stock_services import CoffinStockServices
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
            new_transaction = Transaction(
            date=new_request.request.date,
            id_add=new_request.request.id_add,
            id_coffin_group=new_request.request.id_coffin_group,
            type="request",
            status="approved"
            )
            with self.db.transaction():  # do a transaction to ensure that all the operations are done
                await self.create_request(new_request)  # create the request
                id_transaction = await transactions_services.post_transaction(new_transaction) # create a transaction and return the id
                await add_coffin_services.put_add_coffin_id(new_request.request.id_add, id_transaction, new_request.request.id_coffin_group)# update the add_coffin with the transaction id
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
            if request_get.exists:
                requests = request_get.to_dict()
                response = await CoffinStockServices.put_coffin_stock_id(requests['id_coffin'], 1)
                if response:
                    request.delete()
                    response_delete_deceased = await add_coffin_services.delete_deceased_id(id_deceased)
                    if response_delete_deceased:
                        return True
                else:
                    return False
            else:
                return False
        except Exception as e:
            print(f'Ocurrió un error inesperado: {e}')
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}
