import mongoose from 'mongoose'
import { getEnv } from '../env'

const dbConnection = mongoose.connect(
    getEnv('MONGO_URI'),
    {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    (err) => {
        if(err){
            console.log(err);
            throw new Error(err.errmsg)
        }
        
        console.log("[Database] Database connected.")
    }
)

export default dbConnection