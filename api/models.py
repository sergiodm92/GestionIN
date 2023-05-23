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
class Coffin(BaseModel):
    id: str
    #place: str constr(regex='^("PLACES")$')
    type: constr(regex='^(plano|liso_comun|liso_doble_cuerpo|ondeado|dos_panales|tres_paneles|paris_arito)$')
    size: constr(regex='^(160|170|180|normal|semi_extraordinario|extraordinario|super|super_extraordinario)$')
    color: constr(regex='^(roble|nogal|cedro|caoba|almendra|blanco)$')
    metal_box: bool
    
class Stock(BaseModel):
    id_coffin:str
    units: int
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

class Material(BaseModel):
    id: str
    type: constr(regex='^(plano|liso_comun|liso_doble_cuerpo|ondeado|dos_panales|tres_paneles|paris_arito)$')
    size: constr(regex='^(160|170|180|normal|semi_extraordinario|extraordinario|super|super_extraordinario)$')
    place: str
    metal_box: bool
    code: str
    units: int
    color: constr(regex='^(roble|nogal|cedro|caoba|almendra|blanco)$')

class Place(BaseModel):
    place: str
    @validator('place')
    def check_place_value(cls, v):
        if v not in ['san_salvador_de_jujuy', 'san_pedro', 'fraile_pintado', 'ledesma', 'salta', 'colonia', 'tartagal', 'embarcacion']:
            raise ValueError('El valor del campo "place" debe ser san_salvador_de_jujuy, san_pedro, fraile_pintado, ledesma,salta, colonia tartagal o embarcacion')
        return v

class Add(BaseModel):
    id: str
    id_coffin: str 
    date: int
    responsible: str
    units: int
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
    cetificate_number: int
    way_to_pay: str #forma de pago
    agreement: str  #convenio
    additional: str # cargos adicionales
    wreath: bool #corona
    present: str # presente de funeral
    cementery: str
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
