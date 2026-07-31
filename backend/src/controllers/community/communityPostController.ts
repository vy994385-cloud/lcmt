import { Response } from "express"

import { AuthRequest } from "../../middleware/authMiddleware"

import CommunityPost from "../../models/community/CommunityPost"

import Community from "../../models/Community"

// Create post
export async function createCommunityPost(
  req: AuthRequest,
  res: Response
) {
  try {

    const community =
await Community.findById(req.params.communityId)

    if (!community) {
      return res.status(404).json({
        message: "Community not found"
      })
    }

    const post: any =
await CommunityPost.create({

        community: String(req.params.communityId),

        author: req.userId,

        text: req.body.text || "",

        images: req.body.images || [],

        videos: req.body.videos || [],

        files: req.body.files || [],

        type: req.body.type || "text",

        pollQuestion:
          req.body.pollQuestion || "",

        pollOptions:
          req.body.pollOptions || [],

        tags:
          req.body.tags || []

      })

    const populated =
      await CommunityPost.findById(post._id)
      .populate("author", "name image")

    res.json(populated)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server error"
    })

  }
}

// Feed
export async function getCommunityPosts(
  req: AuthRequest,
  res: Response
) {

  try {

    const posts =
      await CommunityPost.find({

        community: req.params.communityId

      })

      .populate("author", "name image")

      .sort({

        pinned: -1,

        createdAt: -1

      })

    res.json(posts)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server error"
    })

  }

}

// Like
export async function toggleLike(
  req: AuthRequest,
  res: Response
) {

  try {

    const post =
      await CommunityPost.findById(
        req.params.postId
      )

    if (!post) {

      return res.status(404).json({

        message: "Post not found"

      })

    }

    const id = String(req.userId)

    const exists =
      post.likes.some(
        (u: any) => String(u) === id
      )

    if (exists) {

      post.likes =
        post.likes.filter(
          (u: any) =>
            String(u) !== id
        ) as any

    } else {

      post.likes.push(req.userId as any)

    }

    await post.save()

    res.json(post)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server error"
    })

  }

}

// Save
export async function toggleSave(
  req: AuthRequest,
  res: Response
) {

  try {

    const post =
      await CommunityPost.findById(
        req.params.postId
      )

    if (!post) {

      return res.status(404).json({

        message: "Post not found"

      })

    }

    const id = String(req.userId)

    const exists =
      post.savedBy.some(
        (u: any) =>
          String(u) === id
      )

    if (exists) {

      post.savedBy =
        post.savedBy.filter(
          (u: any) =>
            String(u) !== id
        ) as any

    } else {

      post.savedBy.push(req.userId as any)

    }

    await post.save()

    res.json(post)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      message: "Server error"

    })

  }

}

// Comment
export async function addComment(
  req: AuthRequest,
  res: Response
) {

  try {

    const post =
      await CommunityPost.findById(
        req.params.postId
      )

    if (!post) {

      return res.status(404).json({

        message: "Post not found"

      })

    }

    post.comments.push({

      user: req.userId as any,

      text: req.body.text

    } as any)

    await post.save()

    res.json(post)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      message: "Server error"

    })

  }

}

// Pin
export async function togglePin(
  req: AuthRequest,
  res: Response
) {

  try {

    const post =
      await CommunityPost.findById(
        req.params.postId
      )

    if (!post) {

      return res.status(404).json({

        message: "Post not found"

      })

    }

    post.pinned =
      !post.pinned

    await post.save()

    res.json(post)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      message: "Server error"

    })

  }

}

// Delete
export async function deleteCommunityPost(
  req: AuthRequest,
  res: Response
) {

  try {

    await CommunityPost.findByIdAndDelete(
      req.params.postId
    )

    res.json({

      message: "Deleted"

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      message: "Server error"

    })

  }

}