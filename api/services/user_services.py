import bcrypt
import random
from db import get_database
from models import User_login, User_register, LoginResponse, User
import jwt

db = get_database()


async def auth_register(user: User_register):
    try:
        salt = bcrypt.gensalt(rounds=10)
        hashed_pass = bcrypt.hashpw(user.password.encode('utf-8'), salt).decode('utf-8')

        db.collection("users").document(user.name).set({"name": user.name, "password": hashed_pass, "place": user.place, "admin":user.admin})
        return True
    except Exception as e:
        print(f"Error al registrar usuario: {e}")
        return False


async def auth_login(user: User_login):
    try:
        auth_user = db.collection('users').document(user.name).get().to_dict()

        if auth_user is None:
            return {"mensaje": "Usuario no encontrado"}

        valid_password = bcrypt.checkpw(user.password.encode('utf-8'), auth_user['password'].encode('utf-8'))

        if valid_password :
            payload = {
                "name": auth_user["name"],
                "id": auth_user["name"]
            }

            secret = "Osjqbgk1brk1krncblqjgow91827461"
            user_info = User(
                name = auth_user["name"],
                admin = auth_user["admin"],
                place = auth_user["place"]
            )
            token = jwt.encode(payload, secret, algorithm="HS256")

            response = LoginResponse(token = token, user = user_info)

            return response
        else: 
            return {"mensaje": "Contraseña incorrecta"}
    except Exception as e:
        print(f"Error al autenticar usuario: {e}")
        return {"mensaje": "Error al autenticar usuario"}

