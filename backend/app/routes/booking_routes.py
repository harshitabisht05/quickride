from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db

router = APIRouter(prefix="/bookings", tags=["Bookings"])

# Create Booking
@router.post("/")
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    vehicle = db.query(models.Vehicle).filter(models.Vehicle.id == booking.vehicle_id, models.Vehicle.available == True).first()
    if not vehicle:
        raise HTTPException(status_code=400, detail="Vehicle not available")

    # Create booking
    new_booking = models.Booking(
        user_id=1,  # 🚨 For now we’ll use a fixed user (later replace with logged-in user)
        vehicle_id=booking.vehicle_id,
        start_time=booking.start_time,
        end_time=booking.end_time
    )
    vehicle.available = False  # Mark as booked
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)

    return {"message": "Booking created successfully", "booking": new_booking}

# Get All Bookings
@router.get("/")
def get_bookings(db: Session = Depends(get_db)):
    bookings = db.query(models.Booking).all()
    return bookings
