import bcrypt
import jwt
from db import get_database
from models import UserRegister, UserLogin, LoginResponse, User

class AuthService:
    def __init__(self):
        self.db = get_database()
        self.secret = "Osjqbgk1brk1krncblqjgow91827461"

    async def auth_register(self, user: UserRegister):
        try:
            salt = bcrypt.gensalt(rounds=10)
            hashed_pass = bcrypt.hashpw(user.password.encode('utf-8'), salt).decode('utf-8')
            self.db.collection("users").document(user.name).set({
                "name": user.name,
                "password": hashed_pass,
                "place": user.place,
                "admin": user.admin
            })
            return True
        except Exception as e:
            print(f"Error al registrar usuario: {e}")
            return False

    async def auth_login(self, user: UserLogin):
        try:
            auth_user = self.db.collection('users').document(user.name).get().to_dict()

            if auth_user is None:
                return {"mensaje": "Usuario no encontrado"}

            valid_password = bcrypt.checkpw(user.password.encode('utf-8'), auth_user['password'].encode('utf-8'))

            if valid_password:
                payload = {
                    "name": auth_user["name"],
                    "id": auth_user["name"]
                }

                user_info = User(
                    name=auth_user["name"],
                    admin=auth_user["admin"],
                    place=auth_user["place"]
                )
                token = jwt.encode(payload, self.secret, algorithm="HS256")

                response = LoginResponse(token=token, user=user_info)

                return response
            else:
                return {"mensaje": "Contraseña incorrecta"}
        except Exception as e:
            print(f"Error al autenticar usuario: {e}")
            return {"mensaje": "Error al autenticar usuario"}
