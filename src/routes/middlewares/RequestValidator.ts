import { Request, Response, NextFunction } from 'express'

const RequestValidators = {
    validateCreate(req: Request, res: Response, next: NextFunction) {
        const { username, password, email, profile } = req.body

        if (!username || !password || !email || !profile || !profile.name || !profile.gender) {
            res.statusCode = 400

            res.json({
                message: "Invalid request body.",
                data: []
            })
        }

        next()
    },

    validateUpdate(req: Request, res: Response, next: NextFunction) {
        const fillableFields = ["username", "password", "email", "profile.name", "profile.gender"]

        const { update } = req.body

        const updateFieldIsValid = fillableFields.includes(update)

        if (!updateFieldIsValid) {
            res.statusCode = 400

            res.json({
                message: "Invalid update request.",
                data: []
            })
        }

        next()
    },
}

export default RequestValidators