import { Router } from "express"
import { getFeed } from "../controllers/feedController"
import { protect } from "../middleware/authMiddleware"

const router = Router()

router.get(
  "/",
  protect,
  getFeed
)

export default router