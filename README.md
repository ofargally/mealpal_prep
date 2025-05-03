# MealPal Prep - Guest Check-in Application

This project is a simple full-stack application allowing guests to check in by providing their full name and phone number. It consists of a React frontend and a FastAPI backend.

## Overview

The application provides a web form where users can enter their details. Client-side validation ensures the name has at least two words and the phone number is valid (10 or 11 digits). On submission, the data is sent to the backend API. The backend validates the data again, checks if the phone number is already registered, and if not, saves the guest information to an SQLite database. The frontend displays success or error messages accordingly.

## Features

- **Frontend:**
  - React form for guest input (Full Name, Phone Number).
  - Client-side validation for name and phone number formats.
  - Integration with backend API using React Query for data submission.
  - Displays success message with guest name upon successful check-in.
  - Displays specific validation errors and API error messages.
  - Styled with Tailwind CSS.
- **Backend:**
  - FastAPI endpoint (`POST /guests`) to receive guest data.
  - Pydantic models for request data validation (name format, phone number format).
  - Checks for duplicate phone numbers in the database.
  - Stores valid guest data in an SQLite database using SQLAlchemy.
  - CORS enabled to allow requests from the frontend.

## Technology Stack

- **Frontend (`client/`):**
  - React 19
  - TypeScript
  - Vite
  - Tailwind CSS
  - React Query (`@tanstack/react-query`)
  - Axios
- **Backend (`server/`):**
  - Python 3
  - FastAPI
  - SQLAlchemy
  - Pydantic
  - SQLite
  - Uvicorn

## Setup and Installation

### Prerequisites

- Node.js and npm (or yarn/pnpm)
- Python 3.x and pip

### Backend Setup (`server/`)

1.  **Navigate to the backend directory:**
    ```bash
    cd server
    ```
2.  **Create and activate a virtual environment (recommended):**
    ```bash
    python -m venv .venv
    # On macOS/Linux
    source .venv/bin/activate
    # On Windows
    # .venv\Scripts\activate
    ```
3.  **Install Python dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Database Initialization:** The SQLite database (`guests.db`) and the `guests` table will be created automatically when the server starts for the first time, based on the code in `database.py`.

### Frontend Setup (`client/`)

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../client
    # Or from the root: cd client
    ```
2.  **Install Node.js dependencies:**
    ```bash
    npm install
    # or yarn install / pnpm install
    ```
3.  **Environment Variables:** The frontend expects the backend API URL. A default is provided in `.env.development` (`VITE_API_URL=http://localhost:8000`). If your backend runs on a different port or URL, modify this file accordingly.

## Running the Application

1.  **Start the Backend Server:**

    - Make sure you are in the `server/` directory with the virtual environment activated.
    - Run the Uvicorn server:
      ```bash
      uvicorn main:app --reload
      ```
    - The backend API will be running, typically at `http://localhost:8000`.

2.  **Start the Frontend Development Server:**
    - Open a _new_ terminal window.
    - Navigate to the `client/` directory.
    - Run the Vite development server:
      ```bash
      npm run dev
      # or yarn dev / pnpm dev
      ```
    - The frontend application will be available in your browser, typically at `http://localhost:5173`.

Now you can open the frontend URL in your browser and use the Guest Check-in form.

## API Endpoint

- **`POST /guests`**:
  - **Request Body:**
    ```json
    {
      "full_name": "string (min 2 words)",
      "phone_number": "string (10-11 digits)"
    }
    ```
  - **Success Response (201 Created):**
    ```json
    {
      "id": integer,
      "full_name": "string",
      "phone_number": "string (cleaned digits)"
    }
    ```
  - **Error Responses:**
    - `400 Bad Request`: If the phone number is already registered (`detail: "Phone number already registered."`).
    - `422 Unprocessable Entity`: If request data fails Pydantic validation (e.g., invalid name/phone format). The response detail will contain specifics about the validation error.
