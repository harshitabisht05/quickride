from fastapi import FastAPI
from app.database import engine, Base, SessionLocal
from app import models, auth
from app.routes import auth_routes, vehicle_routes, booking_routes
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import inspect, text

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

VEHICLE_IMAGE_URLS = {
    "sedan": "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=80",
    "hatchback": "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=900&q=80",
    "car": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
    "bike": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80",
}

VEHICLE_COLUMN_DEFINITIONS = {
    "image_url": "VARCHAR(500)",
    "description": "VARCHAR(500)",
    "fuel_type": "VARCHAR(30)",
    "transmission": "VARCHAR(30)",
    "seats": "INTEGER",
    "rating": "FLOAT DEFAULT 4.5",
    "pickup_location": "VARCHAR(120)",
}

def default_vehicle_details(vehicle):
    vehicle_name = (vehicle.name or "").lower()
    vehicle_type = (vehicle.type or "").lower()

    if "sedan" in vehicle_name:
        return {
            "image_url": VEHICLE_IMAGE_URLS["sedan"],
            "description": "Comfortable city sedan with smooth handling and roomy luggage space.",
            "fuel_type": "Petrol",
            "transmission": "Automatic",
            "seats": 5,
            "rating": 4.7,
            "pickup_location": "Downtown Hub",
        }
    if "hatchback" in vehicle_name:
        return {
            "image_url": VEHICLE_IMAGE_URLS["hatchback"],
            "description": "Compact hatchback built for easy parking and efficient daily trips.",
            "fuel_type": "Petrol",
            "transmission": "Manual",
            "seats": 5,
            "rating": 4.5,
            "pickup_location": "City Center",
        }
    if "bike" in vehicle_type or "scooter" in vehicle_name:
        return {
            "image_url": VEHICLE_IMAGE_URLS["bike"],
            "description": "Light two-wheeler for quick solo rides across town.",
            "fuel_type": "Petrol",
            "transmission": "Automatic",
            "seats": 2,
            "rating": 4.6,
            "pickup_location": "Metro Station",
        }
    return {
        "image_url": VEHICLE_IMAGE_URLS["car"],
        "description": "Reliable self-drive car suited for errands, commutes, and short getaways.",
        "fuel_type": "Petrol",
        "transmission": "Manual",
        "seats": 5,
        "rating": 4.5,
        "pickup_location": "Main Garage",
    }

def ensure_vehicle_columns():
    inspector = inspect(engine)

    if "vehicles" not in inspector.get_table_names():
        return

    column_names = [column["name"] for column in inspector.get_columns("vehicles")]
    missing_columns = {
        name: definition
        for name, definition in VEHICLE_COLUMN_DEFINITIONS.items()
        if name not in column_names
    }

    if missing_columns:
        with engine.begin() as connection:
            for name, definition in missing_columns.items():
                connection.execute(text(f"ALTER TABLE vehicles ADD COLUMN {name} {definition}"))

def seed_initial_data():
    db = SessionLocal()
    try:
        seeded = False

        if db.query(models.Vehicle).count() == 0:
            vehicles = [
                models.Vehicle(
                    name="Sedan",
                    type="Car",
                    price_per_hour=10.0,
                    image_url=VEHICLE_IMAGE_URLS["sedan"],
                    description="Comfortable city sedan with smooth handling and roomy luggage space.",
                    fuel_type="Petrol",
                    transmission="Automatic",
                    seats=5,
                    rating=4.7,
                    pickup_location="Downtown Hub",
                    available=True,
                ),
                models.Vehicle(
                    name="Hatchback",
                    type="Car",
                    price_per_hour=8.0,
                    image_url=VEHICLE_IMAGE_URLS["hatchback"],
                    description="Compact hatchback built for easy parking and efficient daily trips.",
                    fuel_type="Petrol",
                    transmission="Manual",
                    seats=5,
                    rating=4.5,
                    pickup_location="City Center",
                    available=True,
                ),
                models.Vehicle(
                    name="Scooter",
                    type="Bike",
                    price_per_hour=5.0,
                    image_url=VEHICLE_IMAGE_URLS["bike"],
                    description="Light two-wheeler for quick solo rides across town.",
                    fuel_type="Petrol",
                    transmission="Automatic",
                    seats=2,
                    rating=4.6,
                    pickup_location="Metro Station",
                    available=True,
                ),
            ]
            db.add_all(vehicles)
            seeded = True
        else:
            for vehicle in db.query(models.Vehicle).all():
                defaults = default_vehicle_details(vehicle)

                for field, value in defaults.items():
                    current_value = getattr(vehicle, field)
                    if current_value is None or current_value == "":
                        setattr(vehicle, field, value)
                        seeded = True

        if db.query(models.User).count() == 0:
            admin_user = models.User(
                name="Admin",
                phone="9999999999",
                password=auth.hash_password("admin123"),
                role="admin",
            )
            db.add(admin_user)
            seeded = True

        if seeded:
            db.commit()
            print("✅ Initial data seeded")
    except Exception as e:
        db.rollback()
        print("❌ Seed error:", e)
    finally:
        db.close()


# Create tables and seed data on startup
@app.on_event("startup")
def startup_event():
    try:
        Base.metadata.create_all(bind=engine)
        ensure_vehicle_columns()
        seed_initial_data()
        app.include_router(auth_routes.router)
        app.include_router(vehicle_routes.router)
        app.include_router(booking_routes.router)
        print("✅ Connected to MySQL!")
    except Exception as e:
        print("❌ Error:", e)

@app.get("/")
def read_root():
    return {"message": "QuickRide Backend Running 🚗"}
