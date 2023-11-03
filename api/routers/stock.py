from fastapi import APIRouter, Depends
from middlewares.response import custom_response_success, custom_response_error
from middlewares.verify_token import verify_token
from services.stock_services import stock_services

router = APIRouter()
stock_services = stock_services()


@router.get("/coffins/{place}")
def get_all_coffins_place(place, token_data=Depends(verify_token)):
    try:
        stock_coffins = stock_services.calculate_coffin_stock_by_place(place)
        return custom_response_success(stock_coffins)
    except Exception as e:
        print(e)
        return custom_response_error(message="Ocurrió un error inesperado", status_code=400)
