import { Request, Response } from "express"
import Post from "../models/Post"

export async function getFeed(
  req: Request,
  res: Response
) {
  try {

    const posts = await Post.find()
      .populate("user", "name image")
      .populate("community", "name")
      .populate("comments.user", "name image")
      .sort({ createdAt: -1 })

    return res.json(posts)

  } catch (error) {

    console.log(error)

    return res.status(500).json({
      message: "Server error"
    })

  }
}