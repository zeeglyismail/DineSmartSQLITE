==============================
   Project Setup Instructions
==============================

This project includes two parts:
1. Backend (Django - Python)
2. Frontend (Node.js)

Follow the steps below to set up and run the application.

------------------------------
1. Backend Setup (Django)
------------------------------

Step 1: Navigate to the backend directory
> cd backend

Step 2: Create a virtual environment
> python -m venv venv

Step 3: Activate the virtual environment
- On Windows:
> venv\Scripts\activate
- On macOS/Linux:
> source venv/bin/activate

Step 4: (Optional) Install dependencies
> pip install -r requirements.txt

Step 5: Apply database migrations
> python manage.py migrate

Step 6: Start the development server
> python manage.py runserver

Backend will be available at: http://127.0.0.1:8000


-------------------------------
2. Frontend Setup (React/Node)
-------------------------------

Step 1: Navigate to the frontend directory
> cd frontend

Step 2: Install dependencies
> npm install

Step 3: Start the development server
> npm run dev

Frontend will typically run at: http://localhost:5173


------------------------------
3. Additional Notes
------------------------------
- Ensure both Python and Node.js are installed and properly configured.
- Make sure to create `.env` files if your project requires them.
- If you encounter port conflicts, modify the default port in your settings/config files.

