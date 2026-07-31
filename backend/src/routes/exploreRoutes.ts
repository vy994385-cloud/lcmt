import { Router } from "express"

import { protect } from "../middleware/authMiddleware"

import { explore } from "../controllers/exploreController"

const router = Router()

router.get(
  "/",
  protect,
  explore
)

export default router