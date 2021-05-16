import { Router } from 'express'
import UserController from '../controllers/UserController'

const routes = Router()

routes.get("/api/v1/user", UserController.get)
routes.get("/api/v1/user/:id", UserController.getOne)
routes.post("/api/v1/user", UserController.create)
routes.put("/api/v1/user/:id", UserController.update)
routes.delete("/api/v1/user/:id", UserController.destroy)

export default routes