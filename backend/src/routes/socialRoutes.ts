import express from "express"

import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getFriends,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest
} from "../controllers/socialController"

import {
  protect
} from "../middleware/authMiddleware"


const router = express.Router()



// ======================
// Follow System
// ======================


router.post(
  "/follow/:id",
  protect,
  followUser
)



router.delete(
  "/follow/:id",
  protect,
  unfollowUser
)





// ======================
// Friends System
// ======================


router.post(
  "/friend-request/:id",
  protect,
  sendFriendRequest
)



router.post(
  "/friend-request/accept/:id",
  protect,
  acceptFriendRequest
)



router.post(
  "/friend-request/reject/:id",
  protect,
  rejectFriendRequest
)






// ======================
// Social Graph
// ======================


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



router.get(
  "/friends/:id",
  protect,
  getFriends
)



export default router