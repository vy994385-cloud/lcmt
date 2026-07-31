import express from "express"

import upload from "../middleware/upload"

import { protect } from "../middleware/authMiddleware"

import {
  uploadMedia,
} from "../controllers/mediaController"

const router = express.Router()

router.post(

  "/upload",

  protect,

  upload.single("file"),

  uploadMedia

)

export default router