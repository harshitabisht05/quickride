from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db
from app.auth import get_current_user

router = APIRouter(prefix="/bookings", tags=["Bookings"])

# Create Booking
@router.post("/")
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    vehicle = db.query(models.Vehicle).filter(models.Vehicle.id == booking.vehicle_id, models.Vehicle.available == True).first()
    if not vehicle:
        raise HTTPException(status_code=400, detail="Vehicle not available")

    # Create booking
    new_booking = models.Booking(
        user_id=current_user.id,
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
def get_bookings(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    bookings = (
        db.query(models.Booking)
        .filter(
            models.Booking.user_id == current_user.id
        )
        .all()
    )

    return [
    {
        "id": booking.id,
        "vehicle_id": booking.vehicle_id,
        "user_id": booking.user_id,
        "start_time": booking.start_time,
        "end_time": booking.end_time,
        "vehicle_name": booking.vehicle.name
    }
    for booking in bookings
]

@router.delete("/{booking_id}")
def cancel_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    booking = (
        db.query(models.Booking)
        .filter(
            models.Booking.id == booking_id,
            models.Booking.user_id == current_user.id
        )
        .first()
    )

    if not booking:
        raise HTTPException(
            status_code=404,
            detail="Booking not found"
        )

    vehicle = (
        db.query(models.Vehicle)
        .filter(
            models.Vehicle.id == booking.vehicle_id
        )
        .first()
    )

    vehicle.available = True

    db.delete(booking)

    db.commit()

    return {"message": "Booking cancelled successfully"}