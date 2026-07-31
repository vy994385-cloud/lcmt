import { Request, Response } from "express"

export async function uploadVoice(
  req: Request,
  res: Response
) {

  try {

    const file = req.file

    if (!file) {

      return res.status(400).json({
        message: "No voice file uploaded",
      })

    }

    res.json({

      success: true,

      url: `/uploads/voice/${file.filename}`,

    })

  }

  catch (error) {

    console.log(error)

    res.status(500).json({

      message: "Upload failed",

    })

  }

}