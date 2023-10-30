from db import get_database
from services.add_coffin_services import AddCoffinServices
from services.transaction_services import TransactionServices

add_coffin_services = AddCoffinServices()
transactions_services = TransactionServices()

class stock_services:
    def __init__(self):
        self.db = get_database()

    def calculate_coffin_stock_by_place(place):
        try:
            adds = add_coffin_services.get_added_place_status_pending(place)
            all_transactions = []
            all_coffins = []
            for add in adds:
                all_coffins.extend(add.coffins)
                all_transactions.extend(transactions_services.get_transactions_add_id(add.id))
            for transaction in all_transactions:
                for index, coffin in all_coffins:
                    if(coffin.id == transaction.id_group):
                        if(all_coffins[index].units>0): 
                            all_coffins[index].units = all_coffins[index].units-1
                            continue  
                return all_coffins
        except Exception as e:
            print(e)
            return False
