import mongoose from 'mongoose'

const connDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.error("Error in connecting to mongoDB",error)
        process.exit(1)
    }
}

export default connDB;