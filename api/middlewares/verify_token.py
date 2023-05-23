from fastapi import HTTPException, Header
import jwt

def verify_token(auth_token: str = Header(...)):
    try:
        # Decodifica y verifica el token
        decoded_token = jwt.decode(auth_token, "Osjqbgk1brk1krncblqjgow91827461", algorithms=["HS256"])
        return decoded_token
    except jwt.exceptions.DecodeError:
        # Si el token no se puede decodificar, lanza una excepción
        raise HTTPException(status_code=400, detail="Token no válido")
    except jwt.exceptions.ExpiredSignatureError:
        # Si el token ha expirado, lanza una excepción
        raise HTTPException(status_code=400, detail="Token expirado")
