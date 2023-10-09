from pydantic import BaseModel, validator, constr
from typing import Optional

class User_register(BaseModel):
    name: str
    password: str
    admin:bool
    place:str
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

class User_login(BaseModel):
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

#stock de cajones 
class CoffinStock(BaseModel):
    id_coffin:str
    units: int
    place: str
#stock de cajas metalicas
class MetalBoxStock(BaseModel):
    id: str
    size:str
    units: int
    place: str

#stock general
class GeneralStock(BaseModel):
    id: str
    product:str
    amount: int
    place: str

class Deceased(BaseModel):
    id: str
    id_request: str
    name: str
    dob: int #fecha de nacimiento date of birth
    dod: int #fecha de fallecimiento  date of death
    pod: str #place of death
    dni: str
    leyend: Optional[str]
    news_paper: Optional[str]
    news_paper_name: Optional[str]
    tombstone: bool
    cementery: str
    cementery_type: str   #parque(Lápida) o municipal(Placa)
    sector: Optional[str]
    parcel: Optional[str]
    level: Optional[int]
    first_level_name: Optional[str]
    second_level_name: Optional[str]
    religion_symbol: Optional[str]

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
    transaction_id: list[str]

class AddCoffin(BaseModel):
    id: str
    date: int
    responsible: str
    place: str
    coffins: list[CoffinGroup]    
    state: str 
    @validator('state')
    def validate_state(cls, value):
        valid_states = ['new' ,'pending', 'deleted', 'done']
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

class AddGeneralStock(BaseModel):
    id: str
    product: str 
    date: int
    responsible: str
    amount: int
    supplier: str
    place: str

class Request(BaseModel):
    id: str
    date: int
    place: str
    funeral: str #lugar de velatorio
    id_coffin: str # tipo de cajon
    id_deceased: str# id del difunto
    holder_name:str #titular que contrata el servicio
    holder_relationship: str #parentezco del titular
    policy: str   # a,b,c,d,e...
    certificate_number: int
    way_to_pay: str #forma de pago
    agreement: str  #convenio
    additional: str # cargos adicionales
    wreath: bool #corona
    present: str # presente de funeral
    burial_place: str #lugar donde se entierra
    burial_time: str #hora de entierro
    cladding: str #revestimiento
    service_improvement: str #mejoramiento del servicio

class New_request(BaseModel):
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
    id:str
    id_doc:str

class Transaction(BaseModel):
    id: str
    date: int
    add_id: str
    type_coffin: str
    type: str
    @validator('type')
    def validate_type(cls, value):
        valid_types = ['request' ,'transfer']
        if value not in valid_types:
            raise ValueError(f"'state' debe ser uno de {', '.join(valid_types)}")
        return value
    status: str
    @validator('status')
    def validate_type(cls, value):
        valid_types = ['approved' ,'cancelled']
        if value not in valid_types:
            raise ValueError(f"'state' debe ser uno de {', '.join(valid_types)}")
        return value