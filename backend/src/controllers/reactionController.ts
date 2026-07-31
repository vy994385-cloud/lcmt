import { Response } from "express"

import { AuthRequest } from "../middleware/authMiddleware"
import Message from "../models/Message"

export async function toggleReaction(
  req: AuthRequest,
  res: Response
) {
  try {
    const userId = req.userId

    const { emoji } = req.body

    const message = await Message.findById(
      req.params.id
    )

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      })
    }

    const reactions =
      (message.reactions as any[]) || []

    const existing = reactions.findIndex(
      (reaction: any) =>
        String(reaction.user) ===
        String(userId)
    )

    if (existing >= 0) {
      if (
        reactions[existing].emoji === emoji
      ) {
        reactions.splice(existing, 1)
      } else {
        reactions[existing].emoji = emoji
      }
    } else {
      reactions.push({
        emoji,
        user: userId,
      })
    }

    message.set("reactions", reactions)

    await message.save()

    res.json(message)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Server error",
    })
  }
}