import express from "express"

import { protect } from "../middleware/authMiddleware"

import {

createCommunityPost,
getCommunityPosts,
toggleLike,
toggleSave,
addComment,
togglePin,
deleteCommunityPost

} from "../controllers/community/communityPostController"

const router = express.Router()

// Create post
router.post(
  "/:communityId",
  protect,
  createCommunityPost
)

// Get community feed
router.get(
  "/:communityId",
  protect,
  getCommunityPosts
)

// Like / Unlike
router.put(
  "/like/:postId",
  protect,
  toggleLike
)

// Save / Unsave
router.put(
  "/save/:postId",
  protect,
  toggleSave
)

// Comment
router.post(
  "/comment/:postId",
  protect,
  addComment
)

// Pin / Unpin
router.put(
  "/pin/:postId",
  protect,
  togglePin
)

// Delete
router.delete(
  "/:postId",
  protect,
  deleteCommunityPost
)

export default router