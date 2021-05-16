import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    profile: {
        name: { type: String, required: true },
        gender: { type: String, required: true },
        photo: { type: String, default: "null" },
        rating: { type: [Number], default: [0, 0, 0, 0, 0] },
        productsId: { type: String, default: "null" }
    }
})

const User = mongoose.model("User", UserSchema)

export default User