import { Response } from "express"
import Message from "../models/Message"
import User from "../models/User"
import { AuthRequest } from "../middleware/authMiddleware"
import { getIO } from "../socket"
import { createNotification } from "../services/notificationService"
export {
  getInbox,
  getChatUsers,
  getUnreadCount
} from "./chat/chatInboxController"

// Send Message
export async function sendMessage(
  req: AuthRequest,
  res: Response
) {
  try {

    const senderId = req.userId
    const receiverId = String(req.params.id)
    const {
  text,
  type,
  audio,
  image,
  video,
  file,
  fileName,
  replyTo
} = req.body

    if (
  !text &&
  !audio &&
  !image &&
  !file
) {
  return res.status(400).json({
    message: "Message cannot be empty",
  })
}
    const receiver = await User.findById(receiverId)

    if (!receiver) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    let message = await Message.create({

  sender: senderId,

  receiver: receiverId,

  text: text || "",

  type: type || "text",

  audio: audio || "",

  image: image || "",

  video: video || "",

  file: file || "",

  fileName: fileName || "",

  replyTo: replyTo || null,

  delivered: true,

  read: false,

})
    message = await message.populate(
      "sender",
      "name image"
    )

    message = await message.populate(
      "receiver",
      "name image"
    )

    const io = getIO()

    io.to(receiverId).emit(
      "receive-message",
      message
    )

    if (String(senderId) !== receiverId) {

      io.to(String(senderId)).emit(
        "receive-message",
        message
      )

    }

    await createNotification({

receiver:receiverId,

sender:String(senderId),

type:"message",

title:"New Message",

message:text

})

    res.json({
      message: "Message sent",
      data: message,
    })

  }
  catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server error",
    })

  }
}

// Get Conversation
export async function getConversation(
  req: AuthRequest,
  res: Response
) {

  try {

    const currentUser = req.userId
    const otherUser = String(req.params.id)

    const user = await User.findById(otherUser)
      .select(
        "name image bio college course year isOnline lastSeen"
      )

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      })

    }

    const messages =
      await Message.find({

        $or: [

          {
            sender: currentUser,
            receiver: otherUser,
          },

          {
            sender: otherUser,
            receiver: currentUser,
          },

        ],

      })
        .populate(
          "sender",
          "name image"
        )
        .populate(
          "receiver",
          "name image"
        )
        .sort({
          createdAt: 1,
        })

    res.json({

      user,
      messages,

    })

  }
  catch (error) {

    console.log(error)

    res.status(500).json({

      message: "Server error",

    })

  }

}

// Mark conversation as read
export async function markConversationRead(
  req: AuthRequest,
  res: Response
) {

  try {

    const currentUser = req.userId
    const otherUser = String(req.params.id)

    await Message.updateMany(

      {

        sender: otherUser,
        receiver: currentUser,
        read: false,

      },

      {

        $set: {
          read: true,
        },

      }

    )

    try {

      const io = getIO()

      io.to(otherUser).emit(
        "message-read",
        {
          reader: currentUser,
        }
      )

    }
    catch {

      // Socket may not be ready.

    }

    res.json({

      message: "Conversation marked as read",

    })

  }
  catch (error) {

    console.log(error)

    res.status(500).json({

      message: "Server error",

    })

  }

}
export async function editMessage(
  req: AuthRequest,
  res: Response
) {
  try {

    const message =
      await Message.findById(req.params.id)

    if (!message) {

      return res.status(404).json({
        message: "Message not found"
      })

    }

    if (
      String(message.sender) !== req.userId
    ) {

      return res.status(403).json({
        message: "Not allowed"
      })

    }

    message.text = req.body.text
    message.edited = true

    await message.save()

    res.json(message)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server error"
    })

  }
}

export async function deleteMessage(
  req: AuthRequest,
  res: Response
) {
  try {

    const message =
      await Message.findById(req.params.id)

    if (!message) {

      return res.status(404).json({
        message: "Not found"
      })

    }

    const everyone =
      req.query.everyone === "true"

    if (
      everyone &&
      String(message.sender) === req.userId
    ) {

      message.deleted = true
      message.text = ""

    } else {

      if (
  !message.deletedFor.some(
    (id: any) =>
      String(id) === String(req.userId)
  )
) {
  message.deletedFor.push(req.userId as any)
}
    }

    await message.save()

    res.json(message)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server error"
    })

  }
}

export async function toggleStarMessage(
  req: AuthRequest,
  res: Response
) {
  try {

    const message =
      await Message.findById(req.params.id)

    if (!message) {

      return res.status(404).json({
        message: "Not found"
      })

    }

    const id = String(req.userId)

    const exists =
      message.starredBy.some(
        (u: any) => String(u) === id
      )

    if (exists) {

      message.starredBy =
        message.starredBy.filter(
          (u: any) =>
            String(u) !== id
        )

    } else {

      message.starredBy.push(req.userId as any)

    }

    await message.save()

    res.json(message)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server error"
    })

  }
}

export async function reactToMessage(
  req: AuthRequest,
  res: Response
) {
  try {

    const message =
      await Message.findById(req.params.id)

    if (!message) {

      return res.status(404).json({
        message: "Not found"
      })

    }

    const existingIndex =
  message.reactions.findIndex(
    (r: any) =>
      String(r.user) === String(req.userId)
  )

if (existingIndex !== -1) {

  message.reactions.splice(
    existingIndex,
    1
  )

}

message.reactions.push({

  user: req.userId as any,

  emoji: req.body.emoji,

})

    await message.save()

const populated =
await message.populate(
  "reactions.user",
  "name image"
)

try {

  const io = getIO()

  io.to(
    String(message.sender)
  ).emit(
    "message-reaction",
    populated
  )

  io.to(
    String(message.receiver)
  ).emit(
    "message-reaction",
    populated
  )

} catch {}

res.json(populated)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server error"
    })

  }
}