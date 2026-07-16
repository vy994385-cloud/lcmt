import express from "express"

import {
  updateProfile,
  getMyProfile,
  getUsers,
  likeUser,
} from "../controllers/profileController"

import { protect } from "../middleware/authMiddleware"


const router = express.Router()



router.put(
  "/profile",
  protect,
  updateProfile
)



router.get(
  "/profile/me",
  protect,
  getMyProfile
)



router.get(
  "/users",
  protect,
  getUsers
)



// Like a user
router.post(
  "/users/:userId/like",
  protect,
  likeUser
)



export default router