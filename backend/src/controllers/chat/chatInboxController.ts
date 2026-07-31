import { Response } from "express"
import Message from "../../models/Message"
import User from "../../models/User"
import { AuthRequest } from "../../middleware/authMiddleware"

// Inbox
export async function getInbox(
  req: AuthRequest,
  res: Response
) {

  try {

    const userId = req.userId

    const messages =
      await Message.find({

        $or: [

          { sender: userId },

          { receiver: userId },

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
          createdAt: -1,
        })

    const conversations: any = {}

    for (const message of messages as any[]) {

      const otherUser =

        message.sender._id.toString() === userId

          ? message.receiver

          : message.sender

      if (!conversations[otherUser._id]) {

        const unread =
          await Message.countDocuments({

            sender: otherUser._id,

            receiver: userId,

            read: false,

          })

        conversations[otherUser._id] = {

          user: otherUser,
          lastMessage: message.text,
          time: message.createdAt,
          unread,

        }

      }

    }

    res.json(
      Object.values(conversations)
    )

  }
  catch (error) {

    console.log(error)

    res.status(500).json({

      message: "Server error",

    })

  }

}

// Search users
export async function getChatUsers(
  req: AuthRequest,
  res: Response
) {

  try {

    const currentUser = req.userId

    const search =
      String(req.query.search || "")

    const users = await User.find({

      _id: {
        $ne: currentUser,
      },

      name: {
        $regex: search,
        $options: "i",
      },

    })
      .select(
        "name image college course"
      )
      .limit(20)

    res.json(users)

  }
  catch (error) {

    console.log(error)

    res.status(500).json({

      message: "Server error",

    })

  }

}

// Total unread messages
export async function getUnreadCount(
  req: AuthRequest,
  res: Response
) {

  try {

    const count =
      await Message.countDocuments({

        receiver: req.userId,
        read: false,

      })

    res.json({

      unread: count,

    })

  }
  catch (error) {

    console.log(error)

    res.status(500).json({

      message: "Server error",

    })

  }

}