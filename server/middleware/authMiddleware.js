import jwt from 'jsonwebtoken'

const userExtractorForPassReset = async (req, res, next)=>{
  const token = req.body.token
    if (!token) return res.status(400).json({ error: 'Token required' });


    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded;
    } catch (err) {
      console.log("token invalid block")
      res.status(401).json({error: err.message})
      console.warn("Invalid token", err.message);
      req.user = null;
    }
  
  next()
} 


const userExtractor = async (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded;
    } catch (err) {
      console.log("token invalid block")
      console.warn("Invalid token", err.message);
      req.user = null;
    }
  }

  next(); 
};

const authorizeRole = (requiredRole)=>{
    return (req, res, next)=>{
      if(req.user.role !== requiredRole)
        return res.status(403).json({error: `Forbidden with "${req.user.role}" role`})
      next()  
  }
    }
const requireToken = async (req, res, next) =>{
  if(!req.user) return res.status(401).send("Unauthorized!")
    next()
}

const errorHandler = (error, request, response, next) => {


  if (error.name === 'ValidationError') {
    console.log("valid errror mess: ", error.message)
    return response.status(400).send({ error: error.message })
    
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }
  next(error)
}

export default { errorHandler, userExtractor, requireToken,
                userExtractorForPassReset,authorizeRole
              }