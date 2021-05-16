import { Request, Response } from 'express'
import User from '../models/User'

const userController = {
    async get(req: Request, res: Response) {
        const response = await User.find()

        res.json({
            message: "Users recovered",
            data: response
        })
    },

    async getOne(req: Request, res: Response) {
        const { id } = req.params

        const response = await User.findById(id)

        res.json({
            message: "User recovered",
            data: response
        })
    },

    async create(req: Request, res: Response) {
        const { username, password, email, profile } = req.body

        const user = new User({
            username,
            password,
            email,
            profile
        })

        const response = await user.save()

        res.send({
            message: `User ${username} created with ID ${response._id}.`,
            data: []
        })
    },

    async update(req: Request, res: Response) {
        const {id} = req.params
        const payload = req.body

        const response = await User.updateOne({
            _id: id,
        }, {
            ...payload
        })

        res.send({
            message: `User with id ${id} updated.`,
            data: []
        })
    },

    async destroy(req: Request, res: Response) {
        const {id} = req.params

        const response = await User.deleteOne({
            _id: id
        })

        res.send({
            message: `User with id ${id} deleted.`,
            data: []
        })
    },
}

export default userController