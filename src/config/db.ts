import mongoose from 'mongoose'
import dotenv from  'dotenv'

dotenv.config()
const MONGO_URL = process.env.MONGO_URI

export const connection = ()=> mongoose.connect(MONGO_URL)