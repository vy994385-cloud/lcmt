import { Router } from "express"
import { toggleReaction } from "../controllers/reactionController"
import { protect } from "../middleware/authMiddleware"

const router = Router()

router.put(
  "/:id",
  protect,
  toggleReaction
)

export default router