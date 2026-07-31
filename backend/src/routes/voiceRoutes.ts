import { Router } from "express"
import multer from "multer"
import path from "path"

import {
  uploadVoice,
} from "../controllers/voiceController"

const router = Router()

const storage = multer.diskStorage({

  destination(
    req,
    file,
    cb
  ) {

    cb(
      null,
      path.join(
        __dirname,
        "../uploads/voice"
      )
    )

  },

  filename(
    req,
    file,
    cb
  ) {

    cb(
      null,
      Date.now() +
      "-" +
      file.originalname
    )

  },

})

const upload = multer({
  storage,
})

router.post(

  "/upload",

  upload.single("voice"),

  uploadVoice

)

export default router