# 🏫 Test_School Competency Assessment Platform

A multi-stage digital competency assessment platform that evaluates users' skills from A1 → C2 levels using a secure 3-step process.

---

## 🚀 Features Implemented (Partial Completion)

- Authentication (Registration, Login, Logout)
- JWT Access & Refresh Token flow
- OTP verification (Email/SMS)
- Basic 3-step assessment logic
- Question management from MongoDB
- Timer system for quizzes
- Role-based access control (Admin, Student)
- Responsive UI with Tailwind CSS
- Redux + RTK Query for state management

---

## ⚙️ Tech Stack

### Frontend

- React.js + TypeScript
- Redux, RTK Query, Axios
- Tailwind CSS
- Redux Persist

### Backend

- Node.js + Express + TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer (Email OTP)

---

## 📂 Project Structure

```
root/
│── backend/        # Express + TypeScript backend
│── frontend/       # React + Tailwind + Redux frontend
│── database.pdf    # Database design document
│── README.md       # Project documentation
```

---

## 🛠 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Mashruf-Ahmed55/test-school-backend
cd Test_School
```

### 2️⃣ Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

### 3️⃣ Configure Environment Variables

#### Backend `.env`

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/test_school
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

#### Frontend `.env`

```
VITE_API_URL=http://localhost:5000
```

### 4️⃣ Run the project

#### Backend

```bash
cd backend
npm run dev
```

#### Frontend

```bash
cd frontend
npm run dev
```

---

## 🔑 Admin Credentials

```
Email: admin@example.com
Password: 12345678
```

---

## 📌 Notes

- This is a **partial implementation** due to health issues during the submission period.
- Core features have been implemented and tested.
- Future work includes Safe Exam Browser integration, advanced analytics, and full certification flow.
