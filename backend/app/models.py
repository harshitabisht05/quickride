from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(10), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(20), default="user")

    bookings = relationship("Booking", back_populates="user")  # ✅ Must match Booking.user


class Vehicle(Base):
    __tablename__ = "vehicles"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    type = Column(String(50), nullable=False)
    price_per_hour = Column(Float, nullable=False)
    image_url = Column(String(500), nullable=True)
    description = Column(String(500), nullable=True)
    fuel_type = Column(String(30), nullable=True)
    transmission = Column(String(30), nullable=True)
    seats = Column(Integer, nullable=True)
    rating = Column(Float, default=4.5)
    pickup_location = Column(String(120), nullable=True)
    available = Column(Boolean, default=True)

    bookings = relationship("Booking", back_populates="vehicle")  # ✅ Must match Booking.vehicle


class Booking(Base):
    __tablename__ = "bookings"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"))
    start_time = Column(DateTime, default=datetime.utcnow)
    end_time = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="bookings")   # ✅ Must match User.bookings
    vehicle = relationship("Vehicle", back_populates="bookings")  # ✅ Must match Vehicle.bookings
