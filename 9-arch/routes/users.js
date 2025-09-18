import { Router } from "express"
import { addUser, getUsers } from "../controllers/userController"


const router = Router()

router.get('/', getUsers)
router.push('/', addUser)


export default router;