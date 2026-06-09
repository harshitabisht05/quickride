from pydantic import BaseModel
from typing import Optional
from pydantic import BaseModel, constr

# User Registration
class UserCreate(BaseModel):
    name: str
    phone: constr(pattern=r'^\d{10}$')
    password: str

# User Login
class UserLogin(BaseModel):
    phone: str
    password: str

# User Response (no password)
class UserResponse(BaseModel):
    id: int
    phone: str
    role: str

    class Config:
        from_attributes = True

# Vehicle Create
class VehicleCreate(BaseModel):
    name: str
    type: str
    price_per_hour: float
    available: bool = True

# Vehicle Response
class VehicleResponse(BaseModel):
    id: int
    name: str
    type: str
    price_per_hour: float
    available: bool

    class Config:
        from_attributes = True

from datetime import datetime

class BookingCreate(BaseModel):
    vehicle_id: int
    start_time: datetime
    end_time: datetime

class BookingResponse(BaseModel):
    id: int
    vehicle_id: int
    user_id: int
    start_time: datetime
    end_time: datetime
    
    vehicle_name: str
    
    class Config:
        from_attributes = True
