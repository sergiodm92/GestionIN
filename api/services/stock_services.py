from db import get_database
from services.add_coffin_services import AddCoffinServices
from services.transaction_services import TransactionServices
from services.add_products_services import AddProducts

add_coffin_services = AddCoffinServices()
transactions_services = TransactionServices()
add_products_services = AddProducts()

class stock_services:
    def __init__(self):
        self.db = get_database()

    def calculate_coffin_stock_by_place(self, place:str):
        try:
            adds = add_coffin_services.get_added_place_status_pending(place);
            all_transactions = [];
            all_coffins = [];
            for add in adds:
                all_coffins.extend(add["coffins"])
                all_transactions.extend(transactions_services.get_transactions_add_id(add["id"]))
            for transaction in all_transactions:
                for index, coffin in enumerate(all_coffins):
                    if(coffin["id"] == transaction["id_group"]):
                        if(all_coffins[index]["units"]>0): 
                            all_coffins[index]["units"] -= 1
                            break
            return all_coffins
        except Exception as e:
            print(e)
            return False
    
    def calculate_coffin_all_stock(self):
        try:
            adds = add_coffin_services.get_added_status_pending();
            all_transactions = [];
            all_coffins = [];
            for add in adds:
                all_coffins.extend(add["coffins"])
                all_transactions.extend(transactions_services.get_transactions_add_id(add["id"]))
            for transaction in all_transactions:
                for index, coffin in enumerate(all_coffins):
                    if(coffin["id"] == transaction["id_group"]):
                        if(all_coffins[index]["units"]>0): 
                            all_coffins[index]["units"] -= 1
                            break
            return all_coffins
        except Exception as e:
            print(e)
            return False


    def calculate_mbox_stock_by_place(self, place:str):
        try:
            adds = add_coffin_services.get_added_place_status_pending(place);
            all_transactions = [];
            all_mbox = [];
            for add in adds:
                if(add["metal_box"] is not None):
                    all_mbox.extend(add["metal_box"])
                    all_transactions.extend(transactions_services.get_transactions_add_id(add["id"]))
            for transaction in all_transactions:
                for index, mbox in enumerate(all_mbox):
                    if(mbox["size"] == transaction["id_group"]):
                        if(all_mbox[index]["units"]>0): 
                            all_mbox[index]["units"] -= 1
                            break
            return all_mbox;
        except Exception as e:
            print(e)
            return False


    def calculate_mbox_stock(self):
        try:
            adds = add_coffin_services.get_added_status_pending();
            all_transactions = [];
            all_mbox = [];
            for add in adds:
                if(add["metal_box"] is not None):
                    all_mbox.extend(add["metal_box"])
                    all_transactions.extend(transactions_services.get_transactions_add_id(add["id"]))
            for transaction in all_transactions:
                for index, mbox in enumerate(all_mbox):
                    if(mbox["size"] == transaction["id_group"]):
                        if(all_mbox[index]["units"]>0): 
                            all_mbox[index]["units"] -= 1
                            break
            return all_mbox
        except Exception as e:
            print(e)
            return False


    def calculate_products_stock_by_place(self, place:str):
        try:
            adds = add_coffin_services.get_added_products_place_status_pending(place);
            all_transactions = [];
            all_mbox = [];
            for add in adds:
                if(add["products"] is not None):
                    all_mbox.extend(add["products"])
                    all_transactions.extend(transactions_services.get_transactions_add_id(add["id"]))
            for transaction in all_transactions:
                for index, mbox in enumerate(all_mbox):
                    if(mbox["size"] == transaction["id_group"]):
                        if(all_mbox[index]["units"]>0): 
                            all_mbox[index]["units"] -= 1
                            break
            return all_mbox;
        except Exception as e:
            print(e)
            return False

    def calculate_products_stock(self, place:str):
        try:
            adds = add_coffin_services.get_added_products_status_pending(place);
            all_transactions = [];
            all_mbox = [];
            for add in adds:
                if(add["products"] is not None):
                    all_mbox.extend(add["products"])
                    all_transactions.extend(transactions_services.get_transactions_add_id(add["id"]))
            for transaction in all_transactions:
                for index, mbox in enumerate(all_mbox):
                    if(mbox["size"] == transaction["id_group"]):
                        if(all_mbox[index]["units"]>0): 
                            all_mbox[index]["units"] -= 1
                            break
            return all_mbox;
        except Exception as e:
            print(e)
            return False