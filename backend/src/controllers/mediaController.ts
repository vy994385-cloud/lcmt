import { Request, Response } from "express"

export async function uploadMedia(
  req: Request,
  res: Response
) {
  try {

    if (!req.file) {

      return res.status(400).json({

        message: "No file uploaded",

      })

    }

    const url =
      `/uploads/${
        req.file.destination
          .split("/")
          .pop()
      }/${req.file.filename}`

    res.json({

      message: "Upload successful",

      file: {

        name: req.file.originalname,

        filename: req.file.filename,

        type: req.file.mimetype,

        size: req.file.size,

        url,

      },

    })

  }
  catch (error) {

    console.log(error)

    res.status(500).json({

      message: "Upload failed",

    })

  }
}