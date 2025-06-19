import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique:true, minLength: 4},
    email: {type: String, required: true},
    passwordHash: String
})
//incase i needed to display the id in the frontend
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})


const User = mongoose.model('User', userSchema)

export default User