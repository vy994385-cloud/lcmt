import { Response } from "express"
import { AuthRequest } from "../middleware/authMiddleware"
import Post from "../models/Post"
import User from "../models/User"

import {
  createNotification
} from "../services/notificationService"

export async function getFeed(
  req: AuthRequest,
  res: Response
) {
  try {

    const posts = await Post.find()

      .populate(
        "user",
        "name image username"
      )

      .populate(
        "community",
        "name icon"
      )

      .populate(
        "comments.user",
        "name image"
      )

      .sort({
        createdAt: -1
      })

    return res.json(posts)

  } catch (error) {

    console.log(error)

    return res.status(500).json({
      message: "Server error"
    })

  }
}

export async function getPost(
  req: AuthRequest,
  res: Response
) {

  try {

    const post = await Post.findById(req.params.id)

      .populate(
        "user",
        "name image username"
      )

      .populate(
        "community",
        "name icon"
      )

      .populate(
        "comments.user",
        "name image"
      )

    if (!post) {

      return res.status(404).json({
        message: "Post not found"
      })

    }

    return res.json(post)

  }

  catch (error) {

    console.log(error)

    return res.status(500).json({
      message: "Server error"
    })

  }

}

export async function createFeedPost(
  req: AuthRequest,
  res: Response
) {

  try {

    console.log("CREATE POST BODY:", req.body)

    if (!req.userId) {

      return res.status(401).json({
        message: "Unauthorized"
      })

    }

    if (
      !req.body.content?.trim() &&
      !req.body.image
    ) {

      return res.status(400).json({
        message: "Post must contain text or image"
      })

    }

    const post = await Post.create({

      user: req.userId,

      community: req.body.community || null,

      content: req.body.content,

      image: req.body.image || ""

    })

    const populated = await Post.findById(post._id)

      .populate(
        "user",
        "name image username"
      )

      .populate(
        "community",
        "name icon"
      )

      .populate(
        "comments.user",
        "name image"
      )

    return res.json(populated)

  } catch (error: any) {

    console.error("CREATE POST ERROR")
    console.error(error)
    console.error(error?.message)
    console.error(error?.stack)

    return res.status(500).json({
      message: error?.message || "Server error"
    })

  }

}

export async function deletePost(
  req: AuthRequest,
  res: Response
) {

  try {

    if (!req.userId) {

      return res.status(401).json({
        message: "Unauthorized"
      })

    }

    const post = await Post.findById(
      req.params.id
    )

    if (!post) {

      return res.status(404).json({
        message: "Post not found"
      })

    }

    if (
      post.user.toString() !== req.userId
    ) {

      return res.status(403).json({
        message: "Not allowed"
      })

    }

    await post.deleteOne()

    return res.json({
      message: "Post deleted"
    })

  }

  catch (error) {

    console.log(error)

    return res.status(500).json({
      message: "Server error"
    })

  }

}

export async function likePost(
  req: AuthRequest,
  res: Response
) {

  try {

    if (!req.userId) {

      return res.status(401).json({
        message: "Unauthorized"
      })

    }

    const post = await Post.findById(
      req.params.id
    )

    if (!post) {

      return res.status(404).json({
        message: "Post not found"
      })

    }

    const liked = post.likes.some(
      id => id.toString() === req.userId
    )

    if (liked) {

      post.likes = post.likes.filter(
        id => id.toString() !== req.userId
      )

    } else {

      post.likes.push(req.userId as any)

      if (
        post.user.toString() !== req.userId
      ) {

        const sender =
          await User.findById(req.userId)

        await createNotification({

          receiver: post.user.toString(),

          sender: req.userId,

          type: "post_like",

          title: "New Like",

          message: `${sender?.name || "Someone"} liked your post.`,

          post: post._id.toString()

        })

      }

    }

    await post.save()

    return res.json({

      liked: !liked,

      likes: post.likes.length

    })

  } catch (error) {

    console.log(error)

    return res.status(500).json({
      message: "Server error"
    })

  }

}

export async function addComment(
  req: AuthRequest,
  res: Response
) {

  try {

    if (!req.userId) {

      return res.status(401).json({
        message: "Unauthorized"
      })

    }

    const post = await Post.findById(
      req.params.id
    )

    if (!post) {

      return res.status(404).json({
        message: "Post not found"
      })

    }

    post.comments.push({

      user: req.userId,

      text: req.body.text

    } as any)

    await post.save()

    if (
      post.user.toString() !== req.userId
    ) {

      const sender =
        await User.findById(req.userId)

      await createNotification({

        receiver: post.user.toString(),

        sender: req.userId,

        type: "post_comment",

        title: "New Comment",

        message: `${sender?.name || "Someone"} commented on your post.`,

        post: post._id.toString()

      })

    }

    const updated = await Post.findById(post._id)

      .populate(
        "comments.user",
        "name image"
      )

    return res.json(updated?.comments)

  } catch (error) {

    console.log(error)

    return res.status(500).json({
      message: "Server error"
    })

  }

}

export async function updatePost(
  req: AuthRequest,
  res: Response
) {

  try {

    if (!req.userId) {

      return res.status(401).json({
        message: "Unauthorized"
      })

    }

    const post = await Post.findById(
      req.params.id
    )

    if (!post) {

      return res.status(404).json({
        message: "Post not found"
      })

    }

    if (
      post.user.toString() !== req.userId
    ) {

      return res.status(403).json({
        message: "Not allowed"
      })

    }

    post.content =
      req.body.content ?? post.content

    if (
      req.body.image !== undefined
    ) {

      post.image = req.body.image

    }

    await post.save()

    const updated = await Post.findById(
      post._id
    )

    .populate(
      "user",
      "name image username"
    )

    .populate(
      "community",
      "name icon"
    )

    .populate(
      "comments.user",
      "name image"
    )

    return res.json(updated)

  }

  catch(error){

    console.log(error)

    return res.status(500).json({
      message:"Server error"
    })

  }

}

