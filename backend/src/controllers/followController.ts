import { Response } from "express"
import mongoose from "mongoose"

import User from "../models/User"
import { AuthRequest } from "../middleware/authMiddleware"

// Follow User
export async function followUser(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      })
    }

    const targetId = String(req.params.id)

    if (req.userId === targetId) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      })
    }

    const currentUser = await User.findById(req.userId)
    const targetUser = await User.findById(targetId)

    if (!currentUser || !targetUser) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    const alreadyFollowing = currentUser.following.some(
      id => id.toString() === targetId
    )

    if (alreadyFollowing) {
      return res.status(400).json({
        message: "Already following",
      })
    }

    currentUser.following.push(
      new mongoose.Types.ObjectId(targetId)
    )

    targetUser.followers.push(
      new mongoose.Types.ObjectId(req.userId)
    )

    await currentUser.save()
    await targetUser.save()

    res.json({
      success: true,
      message: "User followed successfully",
    })

  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Server Error",
    })
  }
}

// Unfollow User
export async function unfollowUser(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      })
    }

    const targetId = String(req.params.id)

    const currentUser = await User.findById(req.userId)
    const targetUser = await User.findById(targetId)

    if (!currentUser || !targetUser) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    currentUser.following =
      currentUser.following.filter(
        id => id.toString() !== targetId
      )

    targetUser.followers =
      targetUser.followers.filter(
        id => id.toString() !== req.userId
      )

    await currentUser.save()
    await targetUser.save()

    res.json({
      success: true,
      message: "User unfollowed",
    })

  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Server Error",
    })
  }
}

// Get Followers
export async function getFollowers(
  req: AuthRequest,
  res: Response
) {
  try {
    const targetId = String(req.params.id)

    const user = await User.findById(targetId)
      .populate(
        "followers",
        "name username image headline"
      )

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    res.json(user.followers)

  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Server Error",
    })
  }
}

// Get Following
export async function getFollowing(
  req: AuthRequest,
  res: Response
) {
  try {
    const targetId = String(req.params.id)

    const user = await User.findById(targetId)
      .populate(
        "following",
        "name username image headline"
      )

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    res.json(user.following)

  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Server Error",
    })
  }
}