
from db import get_database
from models import Stock

db = get_database()

# Traer stock
async def get_stock():
    try:
        stock = []
        # Obtiene todos los documentos de la colección "stock"
        docs = db.collection('stock').get()
        for doc in docs:
            # Convierte los datos del documento a un diccionario
            product = doc.to_dict()
            id_coffin = product['id_coffin']
            product['coffin']= parse_id_coffin(id_coffin)
            # Agrega el diccionario a la lista de compras
            stock.append(product)
        return stock
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

# Traer stock
async def get_stock_place(place):
    try:
        stock = []
        # Obtiene todos los documentos de la colección "stock"
        docs = db.collection('stock').where('place','==',place).get()
        for doc in docs:
            # Convierte los datos del documento a un diccionario
            product = doc.to_dict()
            id_coffin = product['id_coffin']
            product['coffin']= parse_id_coffin(id_coffin)
            # Agrega el diccionario a la lista de compras
            stock.append(product)
        return stock
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}
    
# Get stock by ID
async def get_stock_id_service(id):
    try:
        stock = {}
        # Obtiene todos los documentos de la colección "compras"
        stock = db.collection('stock').document(id).get().to_dict()
        id_coffin = stock['id_coffin']
        stock['coffin']= parse_id_coffin(id_coffin)
        return stock
    except Exception as e:
        print(e)
        return {'error': 'Ocurrió un error inesperado: {}'.format(e)}

# Post new model
async def post_model(model:Stock):
    try:
        # Crea el nuevo documento en Firestore con los datos de add
        doc_ref = db.collection('stock').document(model.id_coffin)
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

# Post new model
async def post_transfer(transfer):
    try:
        # Crea el nuevo documento en Firestore con los datos de add
        doc_ref_origin = db.collection('stock').document(transfer.id_origin)
        doc_ref_origin_get = doc_ref_origin.get()
        doc_ref_destiny = db.collection('stock').document(transfer.id_destiny)
        doc_ref_destiny_get = doc_ref_destiny.get()
        place_destiny = parse_id_coffin(transfer.id_destiny)['place']
        if doc_ref_origin_get.exists:
            put_stock_id(transfer.id_origin,-transfer.units)
            if doc_ref_destiny_get.exists:
                put_stock_id(transfer.id_destiny,transfer.units)
                return True
            else: 
                model = Stock(id_coffin=transfer.id_destiny, units=transfer.units,place=place_destiny)
                response_post_model = post_model(model)    
                if response_post_model:
                    return True 
        else:
            return False
    except Exception as e:
        print(e)
        return False


async def put_stock_id(id, operacion):
    try:
        doc_ref = db.collection('stock').document(id)
        doc = doc_ref.get()
        if doc.exists:
            doc_ref.update({'units': doc.to_dict()['units'] + operacion})
            return True
        else:
            return False
    except Exception as e:
        print(e)
        return False
    
def parse_id_coffin(id_coffin):
    coffin_place = {'SS': 'San Salvador de Jujuy', 'SP': 'San Pedro', 'FP': 'Fraile Pintado', 'LS': 'Libertador Gral. San Martin', 'SA': 'Salta', 'CO': 'Colonia', 'TA': 'Tartagal', 'EM': 'Embarcacion'}
    coffin_types = {'PL': 'Plano', 'LC': 'Liso Comun', 'LD': 'Liso Doble Cuerpo', 'ON': 'Ondeado', 'DP':'Dos Paneles', 'TP': 'Tres Paneles', 'PA': 'Paris Arito'}
    coffin_sizes = {'16': '160cm', '17': '170cm', '18': '180cm', 'NO': 'Normal', 'SM': 'Semi Extraordinario', 'EX': 'Extraordinario', 'SU': 'Super', 'SE':'Super Extraordinario' }
    coffin_colors = {'RO': 'Roble', 'NO': 'Nogal', 'CE': 'Cedro', 'CA': 'Caoba', 'AL': 'Almendra', 'BL': 'Blanco'}
    coffin_mbox = {'TR': True, 'FS': False}
    return {
        'place': coffin_place.get(id_coffin[:2]),
        'type': coffin_types.get(id_coffin[2:4]),
        'size': coffin_sizes.get(id_coffin[4:6]),
        'color': coffin_colors.get(id_coffin[6:8]),
        'metal_box': coffin_mbox.get(id_coffin[8:10])
    }