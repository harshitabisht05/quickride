from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db

router = APIRouter(prefix="/vehicles", tags=["Vehicles"])

# Add Vehicle
@router.post("/")
def add_vehicle(vehicle: schemas.VehicleCreate, db: Session = Depends(get_db)):
    new_vehicle = models.Vehicle(**vehicle.dict())
    db.add(new_vehicle)
    db.commit()
    db.refresh(new_vehicle)
    return {"message": "Vehicle added successfully", "vehicle": new_vehicle}

# Get  Vehicles
@router.get("/")
def get_vehicles(db: Session = Depends(get_db)):
    return db.query(models.Vehicle).all()
