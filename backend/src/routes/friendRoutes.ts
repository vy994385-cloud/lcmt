import express from "express"

import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriends
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


router.get(
  "/:id",
  protect,
  getFriends
)


export default router