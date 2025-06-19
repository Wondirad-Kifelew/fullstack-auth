import mongoose from "mongoose";
const dbConnection = async ()=>{
try {

    await mongoose.connect(process.env.MONGODB_URI)
    console.log("connected to database")
} catch (error) {
    console.log("Error: ", error.message)
}
}

export default dbConnection