import { Request, Response } from 'express'
import User from '../models/User'
import Keys from '../utils/keys'

const userController = {
    async get(req: Request, res: Response) {
        try {
            const response = await User.find()

            res.json({
                message: "Users recovered",
                data: response
            })
        } catch (err) {
            res.statusCode = 500

            res.json({
                message: "Internal server error",
                data: []
            })
        }
    },

    async getOne(req: Request, res: Response) {
        try {
            const { id } = req.params

            if (Keys.validateUserId(id)) {
                const response = await User.findById(id)

                if (response)
                    res.json({
                        message: "User recovered",
                        data: response
                    })
                else
                    res.json({
                        message: "User not found",
                        data: response
                    })
            } else {
                res.json({
                    message: "Invalid user id",
                    data: []
                })
            }
        } catch (err) {
            res.statusCode = 500

            res.json({
                message: "Internal server error",
                data: []
            })
        }


    },
    async create(req: Request, res: Response) {
        try {
            const { username, password, email, profile } = req.body

            const searchResult = await User.findOne({
                $or: [
                    { username },
                    { email },
                ]
            })

            if (!searchResult) {
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
            } else {
                res.send({
                    message: `Username or email already exists.`,
                    data: []
                })
            }

        } catch (err) {
            res.statusCode = 500

            res.json({
                message: "Internal server error",
                data: []
            })
        }

    },

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { update, to } = req.body

            if (Keys.validateUserId(id)) {
                const response = await User.updateOne({
                    _id: id,
                }, {
                    [update]: to
                })

                if (response.nModified != 0)
                    res.send({
                        message: `User updated.`,
                        data: []
                    })

                if (response.n != 0)
                    res.send({
                        message: `User not updated because the request and existing data are the same.`,
                        data: []
                    })
            } else {
                res.send({
                    message: `Invalid user id`,
                    data: [],
                })
            }
        } catch (err) {
            res.statusCode = 500

            res.send({
                message: `Internal server error`,
                data: [],
            })
        }
    },

    async destroy(req: Request, res: Response) {
        try {
            const { id } = req.params

            if (Keys.validateUserId(id)) {
                const response = await User.deleteOne({
                    _id: id
                })

                if (response.deletedCount != 0)
                    res.send({
                        message: `User deleted.`,
                        data: []
                    })

                res.send({
                    message: `User not found.`,
                    data: []
                })
            } else {
                res.send({
                    message: `Invalid user id.`,
                    data: []
                })
            }
        } catch (err) {
            res.statusCode = 500

            res.send({
                message: `Internal server error`,
                data: [],
            })
        }
    },
}

export default userController