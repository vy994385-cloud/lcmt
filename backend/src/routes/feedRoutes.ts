import { Router } from "express"

import {
  getFeed,
  getPost,
  createFeedPost,
  likePost,
  addComment,
  deletePost,
  updatePost
} from "../controllers/feedController"

import { protect } from "../middleware/authMiddleware"

const router = Router()

router.get(
  "/",
  protect,
  getFeed
)

router.get(
  "/:id",
  protect,
  getPost
)

router.post(
  "/",
  protect,
  createFeedPost
)

router.put(
  "/:id",
  protect,
  updatePost
)

router.delete(
  "/:id",
  protect,
  deletePost
)

router.post(
  "/:id/like",
  protect,
  likePost
)

router.post(
  "/:id/comment",
  protect,
  addComment
)

export default router