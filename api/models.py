from pydantic import BaseModel, validator
from typing import Optional

class UserRegister(BaseModel):
    name: str
    password: str
    admin: bool
    place: str

    @validator('name')
    def name_length(cls, v):
        if len(v) < 6 or len(v) > 255:
            raise ValueError('El nombre debe tener entre 6 y 255 caracteres')
        return v

    @validator('password')
    def password_length(cls, v):
        if len(v) < 6 or len(v) > 1024:
            raise ValueError('La contraseña debe tener entre 6 y 1024 caracteres')
        return v

class UserLogin(BaseModel):
    name: str
    password: str

    @validator('name')
    def name_length(cls, v):
        if len(v) < 6 or len(v) > 255:
            raise ValueError('El nombre debe tener entre 6 y 255 caracteres')
        return v

    @validator('password')
    def password_length(cls, v):
        if len(v) < 6 or len(v) > 1024:
            raise ValueError('La contraseña debe tener entre 6 y 1024 caracteres')
        return v

class User(BaseModel):
    name: str
    admin: bool
    place: str

class LoginResponse(BaseModel):
    token: str
    user: User

class CoffinStock(BaseModel):
    id_coffin: str
    units: int
    place: str

class MetalBoxGroup(BaseModel):
    size: str
    units: int
    supplier: str

class GeneralStock(BaseModel):
    id: str
    product: str
    amount: int
    place: str

class Deceased(BaseModel):
    id: str
    id_request: str
    name: str
    dob: int  # fecha de nacimiento date of birth
    dod: int  # fecha de fallecimiento  date of death
    pod: str  # place of death
    dni: str
    leyend: Optional[str] = None
    news_paper: Optional[str] = None
    news_paper_name: Optional[str] = None
    tombstone: bool
    cementery: str
    cementery_type: str  # parque(Lápida) o municipal(Placa)
    sector: Optional[str] = None
    parcel: Optional[str] = None
    level: Optional[int] = None
    first_level_name: Optional[str] = None
    second_level_name: Optional[str] = None
    religion_symbol: Optional[str] = None

class Material(BaseModel):
    id: str
    type: str
    size: str
    place: str
    metal_box: bool
    code: str
    units: int
    color: str

class CoffinGroup(BaseModel):
    id: str
    units: int
    size: str
    color: str
    type: str
    mbox: bool
    supplier: str

class AddCoffin(BaseModel):
    id: str
    date: int
    responsible: str
    place: str
    coffins: list[CoffinGroup]
    metal_box: list[MetalBoxGroup]
    status: str

    @validator('status')
    def validate_state(cls, value):
        valid_states = ['pending', 'deleted', 'done']
        if value not in valid_states:
            raise ValueError(f"'state' debe ser uno de {', '.join(valid_states)}")
        return value

class AddMetalBox(BaseModel):
    id: str
    size: str
    date: int
    responsible: str
    units: int
    supplier: str
    place: str

class Product(BaseModel):
    id:str
    name: str

class GroupProduct(BaseModel):
    product: Product
    units: int

class AddProducts(BaseModel):
    products: list[GroupProduct]
    date: int
    responsible: str
    place: str
    status: str
    @validator('status')
    def validate_state(cls, value):
        valid_states = ['pending', 'deleted', 'done']
        if value not in valid_states:
            raise ValueError(f"'state' debe ser uno de {', '.join(valid_states)}")
        return value

class Request(BaseModel):
    id: str # id de la solicitud
    date: int # fecha de solicitud
    place: str # lugar de solicitud
    funeral: str  # lugar de velatorio
    id_coffin_group: str  # tipo de cajon
    id_add: str  # id de la solicitud de cajon
    id_deceased: str  # id del difunto
    id_add_metal_box: Optional[str] = None  # id de la solicitud de metal_box
    id_metal_box_group: Optional[str] = None # id del metal_box_group
    holder_name: str  # titular que contrata el servicio
    holder_relationship: str  # parentezco del titular
    policy: str  # a,b,c,d,e...
    certificate_number: int
    way_to_pay: str  # forma de pago
    agreement: str  # convenio
    additional: str  # cargos adicionales
    wreath: bool  # corona
    present: str  # presente de funeral
    burial_place: str  # lugar de entierro
    burial_time: str  # hora de entierro
    cladding: str  # revestimiento
    service_improvement: str  # mejoramiento del servicio
    products: list[Product]  # productos

class New_Request(BaseModel):
    request: Request
    deceased: Deceased

class Prompt(BaseModel):
    data: str

class Transfer(BaseModel):
    id_destiny: str
    id_origin: str
    units: int

class Places(BaseModel):
    initials: str
    name: str

class Cementery(BaseModel):
    name: str
    place: str
    type: str

class DataAddDelete(BaseModel):
    id: str
    id_doc: str

class Transaction(BaseModel):
    date: int
    id_add: Optional[str] = None
    id_add_metal_box: Optional[str]= None
    id_group: Optional[str] = None
    type: str
    place: str
    products: Optional[list[Product]] = None
    @validator('type')
    def validate_type(cls, value):
        valid_types = ['transfer', 'delete', 'request_coffin','request_products', 'request_metal_box']
        if value not in valid_types:
            raise ValueError(f"'state' debe ser uno de {', '.join(valid_types)}")
        return value
    status: str
    
    @validator('status')
    def validate_status(cls, value):
        valid_types = ['approved', 'cancelled']
        if value not in valid_types:
            raise ValueError(f"'state' debe ser uno de {', '.join(valid_types)}")
        return value
