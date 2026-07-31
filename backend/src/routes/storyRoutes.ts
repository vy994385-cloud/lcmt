import { Router } from "express"

import { protect } from "../middleware/authMiddleware"

import {

  getStories,
  createStory,
  viewStory,
  reactStory,
  deleteStory,

} from "../controllers/storyController"

const router = Router()

router.get(
  "/",
  protect,
  getStories
)

router.post(
  "/",
  protect,
  createStory
)

router.post(
  "/:id/view",
  protect,
  viewStory
)

router.post(
  "/:id/react",
  protect,
  reactStory
)

router.delete(
  "/:id",
  protect,
  deleteStory
)

export default router