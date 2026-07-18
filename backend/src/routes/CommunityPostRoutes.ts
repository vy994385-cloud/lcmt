import express from "express"

import {
  getCommunityPosts,
  createCommunityPost
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


export default router