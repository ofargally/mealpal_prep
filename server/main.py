from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware

from database import get_db, Guest
from models import GuestCreate, GuestResponse
from sqlalchemy.orm import Session


app = FastAPI(title="MealPal Case Study Backend")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/guests", status_code=status.HTTP_201_CREATED, response_model=GuestResponse)
async def create_guest(guest_data: GuestCreate, db: Session = Depends(get_db)):
    existing_guest = db.query(Guest).filter(
        Guest.phone_number == guest_data.phone_number).first()
    if existing_guest:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Phone number already registered."
        )

    db_guest = Guest(
        full_name=guest_data.full_name,
        phone_number=guest_data.phone_number
    )

    db.add(db_guest)
    db.commit()
    db.refresh(db_guest)
    return db_guest


@app.get("/")
async def root():
    return {"message": "Hello World"}
