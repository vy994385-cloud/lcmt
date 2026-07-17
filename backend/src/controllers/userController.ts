import { Response } from "express"
import mongoose from "mongoose"
import User from "../models/User"
import { AuthRequest } from "../middleware/authMiddleware"


// Discover users
export async function discoverUsers(
  req: AuthRequest,
  res: Response
) {
  try {

    const users = await User.find({
      _id: { $ne: req.userId }
    })
    .select("-password")

    res.json(users)

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    })

  }
}


// Like user
export async function likeUser(
  req: AuthRequest,
  res: Response
) {
  try {

    const currentUserId = new mongoose.Types.ObjectId(
      req.userId as string
    )

    const likedUserId = req.params.id as string


    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }


    if (currentUserId.toString() === likedUserId) {
      return res.status(400).json({
        message: "Cannot like yourself"
      })
    }


    const currentUser = await User.findById(currentUserId)
const likedUser = await User.findById(likedUserId)

console.log("CURRENT USER ID:", currentUserId.toString())
console.log("LIKED USER ID:", likedUserId)
console.log("CURRENT USER FOUND:", currentUser?._id)
console.log("LIKED USER FOUND:", likedUser?._id)

    if (!currentUser || !likedUser) {
      return res.status(404).json({
        message: "User not found"
      })
    }


    const likedObjectId = new mongoose.Types.ObjectId(
      likedUserId
    )


    // Add like if not already liked
    if (
      !currentUser.likedUsers.some(
        id => id.toString() === likedObjectId.toString()
      )
    ) {
      currentUser.likedUsers.push(likedObjectId)
    }


    // Check mutual like = Match
    const isMatch = likedUser.likedUsers.some(
      id => id.toString() === currentUserId.toString()
    )


    if (isMatch) {

      if (
        !currentUser.matchedUsers.some(
          id => id.toString() === likedObjectId.toString()
        )
      ) {
        currentUser.matchedUsers.push(likedObjectId)
      }


      if (
        !likedUser.matchedUsers.some(
          id => id.toString() === currentUserId.toString()
        )
      ) {
        likedUser.matchedUsers.push(currentUserId)
      }


      await likedUser.save()
    }


    await currentUser.save()


    res.json({
      message: "User liked",
      matched: isMatch
    })


  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server error"
    })

  }
}