import express from "express"

import {
 getAllPosts
} from "../controllers/PostController"


const router = express.Router()


router.get(
 "/",
 getAllPosts
)


export default router
