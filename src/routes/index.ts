import { Router } from 'express'
import UserController from '../controllers/UserController'
import RequestValidator from './middlewares/RequestValidator'

const routes = Router()

routes.get("/api/v1/user", UserController.get)
routes.get("/api/v1/user/:id", UserController.getOne)
routes.post("/api/v1/user", RequestValidator.validateCreate, UserController.create)
routes.put("/api/v1/user/:id", RequestValidator.validateUpdate, UserController.update)
routes.delete("/api/v1/user/:id", UserController.destroy)

export default routes