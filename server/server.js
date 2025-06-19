import express from 'express'
import 'dotenv/config';
import dbConnection from './config/db.js'
import { registerHandler, loginHandler, logoutHandler, 
  afterLogoutHandler, forgotPasswordHandler, passwordResetHandler } from './controllers/authControllers.js';
import cors from 'cors'
import authMiddleware from './middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';

const app = express()

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}))


dbConnection()

app.use(express.json())
app.use(cookieParser())//parse the cookie header before its been used in userExtractor

app.use(authMiddleware.userExtractor)//non-blocking (a unprotected route)...available for public


app.get('/', (_, res)=> res.json("Api is working"))//public routes
app.post('/api/signup', registerHandler)
app.post('/api/login', loginHandler)
app.post('/api/forgot-password', forgotPasswordHandler)

app.post('/api/logout', authMiddleware.requireToken, logoutHandler)//blocking (a protected route)
app.post('/api/me', authMiddleware.requireToken, (req, res)=>{
  res.json({username: req.user.username})
})//blocking (a protected route)

app.post('/api/afterLogout', authMiddleware.requireToken, afterLogoutHandler)//blocking (a protected route)
app.post('/api/reset-password', authMiddleware.userExtractorForPassReset,
  authMiddleware.requireToken, passwordResetHandler)

app.use(authMiddleware.errorHandler)
const port = process.env.PORT || 5000

app.listen(port, ()=>{console.log(`server is running on port ${port}`)})

