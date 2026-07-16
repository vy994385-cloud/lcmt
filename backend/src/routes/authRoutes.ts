import express from "express"
import { signup, login } from "../controllers/authController"

const router = express.Router()

router.post("/signup", signup)
router.post("/login-test", login)

export default router