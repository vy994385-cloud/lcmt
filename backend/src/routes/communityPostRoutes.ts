import express from "express"

import {
  getCommunityPosts,
  createCommunityPost,
  toggleLike,
  addComment
} from "../controllers/communityPostController"

const router = express.Router()

router.get(
  "/:id/posts",
  getCommunityPosts
)

router.post(
  "/:id/posts",
  createCommunityPost
)

router.post(
  "/posts/:postId/like",
  toggleLike
)

router.post(
  "/posts/:postId/comment",
  addComment
)

export default router