from db import get_database
from models import Product

class ProductsServices:
    def __init__(self):
        self.db = get_database()

    async def post_product(self, product: Product):
        try:
            doc_ref = self.db.collection('products').document()
            doc_ref.set(product.dict())
            doc_snapshot = doc_ref.get()
            return doc_snapshot.exists
        except Exception as e:
            print(e)
            return False

    async def get_products(self):
        try:
            products = []
            docs = self.db.collection('products').get()
            for doc in docs:
                product = doc.to_dict()
                products.append(product)
            return products
        except Exception as e:
            print(e)
            return {'error': 'Ocurrió un error inesperado: {}'.format(e)}
