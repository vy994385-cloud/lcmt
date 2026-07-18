import { Response } from "express"
import mongoose from "mongoose"

import Community from "../models/Community"
import { AuthRequest } from "../middleware/authMiddleware"

export async function getCommunities(
  req: AuthRequest,
  res: Response
) {
  try {

    const communities = await Community.find().populate({
      path: "members",
      model: "User",
      select: "name image"
    })

    return res.json(communities)

  } catch (error) {

    console.log(error)

    return res.status(500).json({
      message: "Server error"
    })

  }
}

export async function joinCommunity(
  req: AuthRequest,
  res: Response
) {

  console.log("🔥 JOIN CONTROLLER HIT")

  try {

    const userId =
      req.userId || req.body.userId

    console.log("JOIN USER ID:", userId)

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }

    console.log("Searching community:", req.params.id)

try {

  const community =
    await Community.findById(req.params.id)

  console.log("Query completed")
  console.log(community)

  if (!community) {
    return res.status(404).json({
      message: "Community not found"
    })
  }

  console.log("COMMUNITY FOUND:", community.name)

} catch (err) {

  console.log("findById ERROR:", err)

  return res.status(500).json({
    message: "findById failed"
  })

}

    const updatedCommunity =
      await Community.findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: {
            members: new mongoose.Types.ObjectId(userId)
          }
        },
        {
          new: true
        }
      ).populate({
        path: "members",
        model: "User",
        select: "name image"
      })

    console.log("UPDATED COMMUNITY:", updatedCommunity)

    return res.json({
      message: "Joined community",
      community: updatedCommunity
    })

  } catch (error) {

    console.log("JOIN ERROR:", error)

    return res.status(500).json({
      message: "Server error"
    })

  }

}