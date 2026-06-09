from fastapi import FastAPI
from app.database import engine, Base, SessionLocal
from app import models, auth
from app.routes import auth_routes, vehicle_routes, booking_routes
from fastapi.middleware.cors import CORSMiddleware

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

def seed_initial_data():
    db = SessionLocal()
    try:
        seeded = False

        if db.query(models.Vehicle).count() == 0:
            vehicles = [
                models.Vehicle(name="Sedan", type="Car", price_per_hour=10.0, available=True),
                models.Vehicle(name="Hatchback", type="Car", price_per_hour=8.0, available=True),
                models.Vehicle(name="Scooter", type="Bike", price_per_hour=5.0, available=True),
            ]
            db.add_all(vehicles)
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
