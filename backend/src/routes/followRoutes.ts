import express from "express"

import { protect } from "../middleware/authMiddleware"

import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} from "../controllers/followController"

const router = express.Router()

// Follow / Unfollow

router.post(
  "/:id",
  protect,
  followUser
)

router.delete(
  "/:id",
  protect,
  unfollowUser
)

// Followers / Following

router.get(
  "/followers/:id",
  protect,
  getFollowers
)

router.get(
  "/following/:id",
  protect,
  getFollowing
)

export default router