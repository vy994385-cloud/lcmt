import express from "express"

import {
  getAllPosts,
  repostPost
} from "../controllers/PostController"

import {
protect
} from "../middleware/authMiddleware"

const router = express.Router()

router.get(
"/",
getAllPosts
)

router.post(
"/:id/repost",
protect,
repostPost
)

export default router