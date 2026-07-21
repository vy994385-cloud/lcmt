import express from "express"

import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest
} from "../controllers/friendController"

import {
  protect
} from "../middleware/authMiddleware"


const router = express.Router()



router.post(
  "/request/:id",
  protect,
  sendFriendRequest
)



router.post(
  "/accept/:id",
  protect,
  acceptFriendRequest
)



router.post(
  "/reject/:id",
  protect,
  rejectFriendRequest
)



export default router