from fastapi import APIRouter, Depends
from middlewares.response import custom_response_success, custom_response_error
from middlewares.verify_token import verify_token
from services.stock_services import stock_services

router = APIRouter()
stock_services = stock_services()


@router.get("/coffins/place/{place}")
def get_all_coffins_place(place, token_data=Depends(verify_token)):
    try:
        stock_coffins = stock_services.calculate_coffin_stock_by_place(place)
        return custom_response_success(stock_coffins)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado", status_code=400)

@router.get("/coffins/all")
def get_all_coffins_place(token_data=Depends(verify_token)):
    try:
        stock_coffins = stock_services.calculate_coffin_all_stock()
        return custom_response_success(stock_coffins)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado", status_code=400)

@router.get("/mbox/place/{place}")
def get_all_coffins_place(place, token_data=Depends(verify_token)):
    try:
        stock_mbox = stock_services.calculate_mbox_stock_by_place(place)
        return custom_response_success(stock_mbox)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado", status_code=400)

@router.get("/mbox/all")
def get_all_coffins_place(token_data=Depends(verify_token)):
    try:
        stock_mbox = stock_services.calculate_mbox_stock()
        return custom_response_success(stock_mbox)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado", status_code=400)


@router.get("/products/place/{place}")
def get_all_products_place(place, token_data=Depends(verify_token)):
    try:
        stock_products = stock_services.calculate_products_stock_place(place)
        return custom_response_success(stock_products)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado", status_code=400)

@router.get("/products/all")
def get_all_products_place(place, token_data=Depends(verify_token)):
    try:
        stock_products = stock_services.calculate_products_stock(place)
        return custom_response_success(stock_products)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado", status_code=400) 


