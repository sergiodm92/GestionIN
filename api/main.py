from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.users import router as users_router
from routers.coffin_stock import router as coffin_stock_router
from routers.metal_box_stock import router as metal_box_stock_router
from routers.general_stock import router as general_stock_router
from routers.request import router as request_router
from routers.deceased import router as deceased_router
from routers.add_coffin import router as add_coffin_router
from routers.add_metal_box import router as add_metal_box_router
from routers.add_general import router as add_general_router
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
    "http://localhost:3000",
    "https://gestion-in.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router, prefix="/user", tags=["User"])
app.include_router(coffin_stock_router, prefix="/coffin_stock", tags=["CoffinStock"])
app.include_router(metal_box_stock_router, prefix="/metal_box_stock", tags=["MetalBoxStock"])
app.include_router(general_stock_router, prefix="/general_stock", tags=["GeneralStock"])
app.include_router(request_router, prefix="/request", tags=["Request"])
app.include_router(deceased_router, prefix="/deceased", tags=["Deceased"])
app.include_router(add_coffin_router, prefix="/add_coffin", tags=["AddCoffin"])
app.include_router(add_metal_box_router, prefix="/add_metal_box", tags=["AddMetalBox"])
app.include_router(add_general_router, prefix="/add_general", tags=["AddGeneral"])
app.include_router(place_router, prefix="/place", tags=["Place"])

