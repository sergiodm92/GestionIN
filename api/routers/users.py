from fastapi import APIRouter
from services.user_services import AuthService
from middlewares.response import custom_response_error, custom_response_success
from models import UserLogin, UserRegister

router = APIRouter()
auth_services = AuthService()

@router.post('/register')
async def register(user: UserRegister):
    try:
        result = await auth_services.auth_register(user)
        if isinstance(result, str):
            return custom_response_error(message="No ha podido registrarse reintente...", status_code=400)
        else:
            if result:
                response = {"message":"Se registro correctamente"}
                return custom_response_success(response)
    except Exception as e:
        return custom_response_error(message="Error del servidor...", status_code=500)

@router.post('/login')
async def login(user: UserLogin):
    try:
        response = await auth_services.auth_login(user)
        if len(response.token) > 100:
            return custom_response_success(response)
        else:
            return custom_response_error(message="No se pudo inicias sesion...", status_code=400)
    except Exception as e:
        return custom_response_error(message="Error del servidor...", status_code=500)

