import multer from "multer"
import path from "path"
import fs from "fs"

const storage = multer.diskStorage({

  destination(req, file, cb) {

    let folder = "src/uploads/files"

    if (file.mimetype.startsWith("image")) {
      folder = "src/uploads/images"
    }

    if (file.mimetype.startsWith("audio")) {
      folder = "src/uploads/audio"
    }

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, {
        recursive: true,
      })
    }

    cb(null, folder)
  },

  filename(req, file, cb) {

    const unique =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9)

    cb(
      null,
      unique +
      path.extname(file.originalname)
    )

  },

})

export default multer({

  storage,

  limits: {

    fileSize:
      50 * 1024 * 1024,

  },

})