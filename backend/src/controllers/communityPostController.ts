import { Response } from "express"
import mongoose from "mongoose"

import { AuthRequest } from "../middleware/authMiddleware"
import Community from "../models/Community"
import Post from "../models/Post"

export async function getCommunityPosts(
  req: AuthRequest,
  res: Response
) {
  try {

    const community = await Community.findById(
      req.params.id as string
    )

    if (!community) {
      return res.status(404).json({
        message: "Community not found"
      })
    }

    const posts = await Post.find({
      community: new mongoose.Types.ObjectId(
        req.params.id as string
      )
    })
      .populate("user", "name image")
      .sort({ createdAt: -1 })

    return res.json(posts)

  } catch (error) {

    console.log(error)

    return res.status(500).json({
      message: "Server error"
    })

  }
}

export async function createCommunityPost(
  req: AuthRequest,
  res: Response
) {
  try {

    const userId =
      req.userId || req.body.userId

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }

    const community = await Community.findById(
      req.params.id as string
    )

    if (!community) {
      return res.status(404).json({
        message: "Community not found"
      })
    }

    const post = new Post({
      community: new mongoose.Types.ObjectId(
        req.params.id as string
      ),
      user: new mongoose.Types.ObjectId(
        userId
      ),
      content: req.body.content
    })

    await post.save()

    const populatedPost = await Post.findById(
      post._id
    ).populate(
      "user",
      "name image"
    )

    return res.json({
      message: "Post created successfully",
      post: populatedPost
    })

  } catch (error) {

    console.log(error)

    return res.status(500).json({
      message: "Server error"
    })

  }
}