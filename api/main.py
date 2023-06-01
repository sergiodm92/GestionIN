from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.users import router as users_router
from routers.stock import router as stock_router
from routers.request import router as request_router
from routers.deceased import router as deceased_router
from routers.add import router as add_router
from routers.place import router as place_router

app = FastAPI(
    title= "Gestion IN",
    description= "API REST para gestion de Instituto del Norte",
    version="3.0",
    contact={
        "name": "DRFullCode",
        "url": "http://sergiodm.online/",
        "email": "drfullcode@gmail.com",
    },
)

# Configurar CORS
origins = [
    "http://localhost",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router, prefix="/user", tags=["User"])
app.include_router(stock_router, prefix="/stock", tags=["Stock"])
app.include_router(request_router, prefix="/request", tags=["Request"])
app.include_router(deceased_router, prefix="/deceased", tags=["Deceased"])
app.include_router(add_router, prefix="/add", tags=["Add"])
app.include_router(place_router, prefix="/place", tags=["Place"])

