import mongoose from 'mongoose'

const Keys = {
    validateUserId(userId: string){
        const keyIsValid = mongoose.Types.ObjectId.isValid(userId)

        return keyIsValid
    }
}

export default Keys