from db import get_database
from models import CoffinStock

class CoffinStockServices:
    def __init__(self):
        self.db = get_database()

    async def get_coffin_stock(self):
        try:
            coffin_stock = []
            docs = self.db.collection('coffin_stock').where('units', '>', 0).get()
            for doc in docs:
                product = doc.to_dict()
                id_coffin = product['id_coffin']
                product['coffin'] = self.parse_id_coffin(id_coffin)
                coffin_stock.append(product)
            return coffin_stock
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_coffin_stock_place(self, place):
        try:
            coffin_stock = []
            docs = self.db.collection('coffin_stock').where('place', '==', place).get()
            for doc in docs:
                product = doc.to_dict()
                id_coffin = product['id_coffin']
                product['coffin'] = self.parse_id_coffin(id_coffin)
                coffin_stock.append(product)
            return coffin_stock
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def get_coffin_stock_id_service(self, id):
        try:
            coffin_stock = self.db.collection('coffin_stock').document(id).get().to_dict()
            id_coffin = coffin_stock['id_coffin']
            coffin_stock['coffin'] = self.parse_id_coffin(id_coffin)
            return coffin_stock
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

    async def post_coffin_model(self, model: CoffinStock):
        try:
            doc_ref = self.db.collection('coffin_stock').document(model.id_coffin)
            doc_ref.set(model.dict())
            doc_snapshot = doc_ref.get()
            if doc_snapshot.exists:
                return True
            else:
                return False
        except Exception as e:
            print(e)
            return False

    async def post_transfer(self, transfer):
        try:
            doc_ref_origin = self.db.collection('coffin_stock').document(transfer.id_origin)
            doc_ref_origin_get = doc_ref_origin.get()
            doc_ref_destiny = self.db.collection('coffin_stock').document(transfer.id_destiny)
            doc_ref_destiny_get = doc_ref_destiny.get()
            place_destiny = self.parse_id_coffin(transfer.id_destiny)['place']
            if doc_ref_origin_get.exists:
                self.put_coffin_stock_id(transfer.id_origin, -transfer.units)
                if doc_ref_destiny_get.exists:
                    self.put_coffin_stock_id(transfer.id_destiny, transfer.units)
                    return True
            return False
        except Exception as e:
            print(e)
            return False

    async def put_coffin_stock_id(self, id, operacion):
        try:
            doc_ref = self.db.collection('coffin_stock').document(id)
            doc = doc_ref.get()
            if doc.exists:
                doc_ref.update({'units': doc.to_dict()['units'] + operacion})
                return True
            else:
                return False
        except Exception as e:
            print(e)
            return False

    def parse_id_coffin(self, id_coffin):
        coffin_types = {'PL': 'Plano', 'LC': 'Liso Comun', 'LD': 'Liso Doble Cuerpo',
                        'ON': 'Ondeado', 'DP': 'Dos Paneles', 'TP': 'Tres Paneles', 'PA': 'Paris Arito'}
        coffin_sizes = {'16': '160cm', '17': '170cm', '18': '180cm', 'NO': 'Normal',
                        'SM': 'Semi Extraordinario', 'EX': 'Extraordinario', 'SU': 'Super', 'SE': 'Super Extraordinario'}
        coffin_colors = {'RO': 'Roble', 'NO': 'Nogal', 'CE': 'Cedro',
                         'CA': 'Caoba', 'AL': 'Almendra', 'BL': 'Blanco'}
        coffin_mbox = {'TR': True, 'FS': False}
        return {
            'type': coffin_types.get(id_coffin[2:4]),
            'size': coffin_sizes.get(id_coffin[4:6]),
            'color': coffin_colors.get(id_coffin[6:8]),
            'metal_box': coffin_mbox.get(id_coffin[8:10])
        }
