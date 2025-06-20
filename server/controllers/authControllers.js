import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import nodemailer from 'nodemailer'

const loginHandler = async (req, res) => {
  const {username, password} = req.body
  const userFound = await User.findOne({username})
  const isPassCorrect = userFound === null? false: 
        await bcrypt.compare(password, userFound.passwordHash)

  if(!isPassCorrect){
      return res.status(401).json({
          error: "Invalid username or/and password!"
      })
  }
  const userToken = {
      username: userFound.username,
      id: userFound._id
  }
  const token = jwt.sign(userToken, process.env.SECRET, {expiresIn: 60*60*24})

  res.cookie('token', token, {
        httpOnly: true,     
        secure: true,       //true in production
        sameSite: 'None', 
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({ message: 'Logged in', username}); 
}

const registerHandler = async (req, res) => { 
    const {username, email, password} = req.body

    const userFound = await User.findOne({username})

    if(userFound){
        return res.status(400).json({
            error: `${username} already exists. Try logging in.`
        })
    }
    //handle db level errors in middleware
    if (password.length < 8) {
    
    return res.status(400).json({
      error: 'password must be at least 8 characters long'
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const userCreated = new User({
    username,
    email,
    passwordHash
  })

  const savedUser = await userCreated.save()
  
  const userToken = {
      username: savedUser.username,
      id: savedUser._id
    }  
  const token = jwt.sign(userToken, process.env.SECRET, {expiresIn: 60*60*24})

  res.cookie('token', token, {
      httpOnly: true,     
      secure: true,       //true in production
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .json({ message: 'signed up', username}); 
  
}

const logoutHandler = (req, res) => {
 
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,       //true in production
    sameSite: 'None',
  })
  res.json({ message: 'Logged out' })
}

const afterLogoutHandler =(req, res)=>{
  const {name} = req.body

  res.send(`${name} responded from server`)
}

const forgotPasswordHandler = async(req, res)=>{

 const {resetEmail} = req.body

 const foundUser = await User.findOne({email: resetEmail})

 if(!foundUser){
  return res.status(401).json({
    error: "Email not registered please try again!"
  })
 }
 const user ={
  id: foundUser._id,
  username: foundUser.username,
 }
const resetToken = jwt.sign(user, process.env.SECRET, {expiresIn: '15m'})

//email sending part
const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    to: resetEmail,
    from: `"${process.env.EMAIL_USER_NAME}" <${process.env.EMAIL_USER}>`,
    subject: 'Password Reset',
    html: `<p>Click the link below to reset your password:</p>
           <a href="${resetUrl}">${resetUrl}</a>`
  };

  await transporter.sendMail(mailOptions);

  return res.status(200).json({ message: 'Reset email sent.' });

}
const passwordResetHandler =async (req, res)=>{

try {
const findUser = await User.findOne({username: req.user.username})
const newPasswordHashed = await bcrypt.hash(req.body.newPassword, 10)
const updatedUser = await User.findByIdAndUpdate(findUser._id, {passwordHash: newPasswordHashed}, {new:true})

//signin the user automatically
  const userToken = {
      username: updatedUser.username,
      id: updatedUser._id
    }  
  const token = jwt.sign(userToken, process.env.SECRET, {expiresIn: 60*60*24})
  res.cookie('token', token, {
      httpOnly: true,     
      secure: true,       //true in production
      sameSite: 'None',     //none in prod   
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days      
    }).status(200).json({message: "Password reset successful!", 
                         username:updatedUser.username})
} catch (error) {
  console.log("Error updaitng password: ", error)
}

}
export {loginHandler, registerHandler, logoutHandler, 
        afterLogoutHandler, forgotPasswordHandler, 
        passwordResetHandler}