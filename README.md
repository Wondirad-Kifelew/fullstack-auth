#  Fullstack JWT Auth App (Cookies Only)

A secure fullstack authentication app using JWT stored in **HTTP-only cookies**, built with **React**, **Express**, and **MongoDB**.

---

##  Features

-  Secure user registration and login
-  JWT stored in HTTP-only cookies (no localStorage)
-  Fetch current user session via cookie
-  Logout (clears cookie)
-  Password reset via email link
-  REST Client file for testing endpoints (`routeCheck.rest`)

---

##  Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Node.js (Express)
- **Database**: MongoDB (Mongoose)
- **Email**: Nodemailer (Gmail SMTP)
- **Deployments**:
  - Frontend: Vercel
  - Backend: Render

---

##  Installation

### Backend

```bash

cd server
npm install
cp .env
# Fill in values like MONGO_URI, SECRET,
# EMAIL_USER, EMAIL_PASS, CLIENT_URL, EMAIL_USER_NAME
npm run server
```
### Frontend (open other terminal)

```bash

cd client
npm install
cp  .env
# Fill in VITE_API_URL=https://your-backend.render.com (The back end url) 
npm run dev
```

## API Endpoints

| Method | Endpoint               | Purpose                          |
|--------|------------------------|----------------------------------|
| POST   | `/api/signup`          | Register a new user              |
| POST   | `/api/login`           | Log in and set auth cookie       |
| POST   | `/api/me`              | Get user info from backend for   |   
|        |                        | page reloads                     |
| POST   | `/api/logout`          | Clear auth cookie                |
| POST   | `/api/forgot-password` | Send reset link via email        |
| POST   | `/api/reset-password`  | Set new password via token       |

--> Use `routeCheck.rest` file with REST Client in VS Code to test the routes.

---

##  Auth Flow Summary

A. Logging in
1. User logs in → JWT is sent in an HTTP-only cookie.
2. Frontend automatically includes the cookie on all requests.
3. Backend middleware verifies JWT from the cookie.
4. Logging out clears the cookie from the browser.

B. Signing up
- User signs up → user info saved in data base and automatically
   logs in (repeats the process of logging in)  

C. Forgetting Password
1. User enters email → backend sends a reset link to that account
2. User redirected to a new password entry page and sets a new password
3. Automatically logs in 

---

##  Deployment

- **Frontend**: Deployed on [Vercel](https://fullstack-auth-weld.vercel.app/)
- **Backend**: Deployed on [Render](https://fullstack-auth-o3vq.onrender.com/)

##  Notes

- Passwords are hashed using **bcrypt**.
- Uses **Gmail SMTP** for password reset emails (App password required).
- Auth is entirely handled using **HTTP-only cookies**.
- No refresh tokens or localStorage involved.

---

## 🚧 Coming Soon

-  Role-based access control
-  Refresh token implementation
-  Phone verification using OTP

---
