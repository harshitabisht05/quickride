# 🚗 QuickRide Backend

QuickRide is a rental vehicle booking platform backend built with **FastAPI** and **MySQL**.
It supports:
- User registration & login
- Vehicle management
- Booking management

---

## 📌 Tech Stack
- **Backend Framework:** FastAPI
- **Database:** MySQL (via SQLAlchemy ORM)
- **Authentication:** JWT tokens (login endpoint only)
- **ORM:** SQLAlchemy
- **Environment:** Python 3.10+

---

## 📂 Project Structure
```bash
backend/
│── app/
│   ├── main.py          # Entry point and startup behavior
│   ├── database.py      # SQLAlchemy engine and session setup
│   ├── config.py        # Loads DATABASE_URL from .env
│   ├── models.py        # SQLAlchemy models for users, vehicles, bookings
│   ├── schemas.py       # Pydantic request/response schemas
│   ├── auth.py          # Password hashing and JWT helpers
│   ├── routes/
│   │   ├── auth_routes.py    # /auth/register, /auth/login
│   │   ├── vehicle_routes.py # /vehicles endpoints
│   │   └── booking_routes.py # /bookings endpoints
│── venv/                # Virtual environment
│── requirements.txt     # Dependencies
│── .env.example         # Example environment file
│── .gitignore           # Ignore rules
│── README.md            # Documentation
```

---

## ⚡ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/quickride-backend.git
cd quickride-backend
```

### 2️⃣ Create a virtual environment
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

> If you use cmd.exe instead of PowerShell, run:
> ```cmd
> venv\Scripts\activate
> ```

### 3️⃣ Install dependencies
```powershell
pip install -r requirements.txt
```

### 4️⃣ Configure the database
1. Copy the example file:
   ```powershell
   copy .env.example .env
   ```
2. Open `.env` and update the connection string:
   ```text
   DATABASE_URL=mysql+pymysql://username:password@localhost/quickride
   ```

> For a remote MySQL server, use the remote host:
> ```text
> DATABASE_URL=mysql+pymysql://username:password@db.example.com:3306/quickride
   ```

### 5️⃣ Create the database
Run this in your MySQL client:
```sql
CREATE DATABASE quickride;
```

If you want a dedicated MySQL user:
```sql
CREATE USER 'quickride_user'@'localhost' IDENTIFIED BY 'yourpassword';
GRANT ALL PRIVILEGES ON quickride.* TO 'quickride_user'@'localhost';
FLUSH PRIVILEGES;
```

### 6️⃣ Run the server
```powershell
uvicorn app.main:app --reload
```

Visit API docs:
```text
http://127.0.0.1:8000/docs
```

---

## 🌱 Automatic Database Seed
On startup, the backend will automatically:
- create missing tables
- insert example vehicles if none exist
- create a default admin user if no users exist

Default seeded admin credentials:
- **phone:** `9999999999`
- **password:** `admin123`

> Note: current booking implementation uses a fixed user with `user_id=1`.

---

## 📌 API Endpoints
### Auth
| Method | Endpoint         | Description            |
| ------ | ---------------- | ---------------------- |
| POST   | `/auth/register` | Register a new user    |
| POST   | `/auth/login`    | Login user and receive JWT token |

### Vehicles
| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| POST   | `/vehicles/` | Add a new vehicle |
| GET    | `/vehicles/` | Get all available vehicles |

### Bookings
| Method | Endpoint     | Description      |
| ------ | ------------ | ---------------- |
| POST   | `/bookings/` | Book a vehicle   |
| GET    | `/bookings/` | Get all bookings |

---

## 🧪 Example Requests
### Register
```json
POST /auth/register
{
  "name": "Test User",
  "phone": "9999999990",
  "password": "test123"
}
```

### Login
```json
POST /auth/login
{
  "phone": "9999999990",
  "password": "test123"
}
```

### Add vehicle
```json
POST /vehicles/
{
  "name": "Sedan",
  "type": "Car",
  "price_per_hour": 10.0,
  "available": true
}
```

### Create booking
```json
POST /bookings/
{
  "vehicle_id": 1,
  "start_time": "2026-06-07T10:00:00",
  "end_time": "2026-06-07T12:00:00"
}
```

---

## 🧩 Notes
- The backend currently does not enforce route-level authentication.
- Booking creation uses a placeholder `user_id=1` until login-based user association is implemented.
- Pydantic schemas use `from_attributes = True` for model serialization.

---

## 📌 Dependencies
fastapi==0.104.1
uvicorn==0.24.0
pydantic==2.4.2
SQLAlchemy==2.0.23
pymysql==1.1.0
python-dotenv==1.0.0
python-jose==3.3.0
passlib==1.7.4
bcrypt==4.0.1
cryptography==41.0.4
python-multipart==0.0.6

---

### 👩‍💻 Author
Harshita Bisht
B.Tech CSE (Cloud Computing) @ UPES Dehradun

