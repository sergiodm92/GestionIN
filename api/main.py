from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.users import router as users_router
from routers.request import router as request_router
from routers.deceased import router as deceased_router
from routers.add_coffin import router as add_coffin_router
from routers.add_metal_box import router as add_metal_box_router
from routers.add_products import router as add_products_router
from routers.place import router as place_router
from routers.products import router as products_router
from routers.cementeries import router as cementery_router
from routers.transactions import router as transactions
from routers.stock import router as stock_router

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

# # Configurar CORS
# origins = [
#     "http://localhost",
#     "http://localhost:3000",
#     "https://gestion-x10w29o04-sergiodm92.vercel.app",
#     "https://gestion-in.vercel.app"
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
# Configurar CORS para permitir cualquier origen

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router, prefix="/user", tags=["User"])
app.include_router(request_router, prefix="/request", tags=["Request"])
app.include_router(deceased_router, prefix="/deceased", tags=["Deceased"])
app.include_router(add_coffin_router, prefix="/add_coffin", tags=["AddCoffin"])
app.include_router(add_metal_box_router, prefix="/add_metal_box", tags=["AddMetalBox"])
app.include_router(add_products_router, prefix="/add_products", tags=["AddProducts"])
app.include_router(place_router, prefix="/place", tags=["Place"])
app.include_router(products_router, prefix="/products", tags=["Products"])
app.include_router(cementery_router, prefix="/cementery", tags=["Cementery"])
app.include_router(transactions, prefix="/transactions", tags=["Transactions"])
app.include_router(stock_router, prefix="/stock", tags=["Stock"])

