import { Response } from "express"
import Message from "../models/Message"
import User from "../models/User"
import { AuthRequest } from "../middleware/authMiddleware"


// Send Message
export async function sendMessage(
  req: AuthRequest,
  res: Response
) {
  try {
    const senderId = req.userId
    const receiverId = String(req.params.id)
    const { text } = req.body


    if (!text || text.trim() === "") {
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


    const message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      text,
    })


    res.json({
      message: "Message sent",
      data: message,
    })


  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Server error",
    })
  }
}



// Get conversation between two users
export async function getConversation(
  req: AuthRequest,
  res: Response
) {
  try {

    const currentUser = req.userId
    const otherUser = String(req.params.id)


    const messages = await Message.find({
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
    .sort({
      createdAt: 1,
    })


    res.json(messages)


  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server error",
    })

  }
}



// Get inbox
export async function getInbox(
  req: AuthRequest,
  res: Response
) {
  try {

    const userId = req.userId


    const messages = await Message.find({
      $or: [
        {
          sender: userId,
        },
        {
          receiver: userId,
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
      createdAt: -1,
    })


    const conversations:any = {}


    messages.forEach((message:any)=>{


      const otherUser =
        message.sender._id.toString() === userId

        ?

        message.receiver

        :

        message.sender



      conversations[
        otherUser._id
      ] = {

        user: otherUser,

        lastMessage:
          message.text,

        time:
          message.createdAt

      }


    })



    res.json(
      Object.values(conversations)
    )


  } catch(error){

    console.log(error)

    res.status(500).json({
      message:"Server error"
    })

  }
}