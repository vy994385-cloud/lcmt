import { Response } from "express"
import Message from "../models/Message"
import User from "../models/User"
import { AuthRequest } from "../middleware/authMiddleware"
import { getIO } from "../socket"

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


    let message = await Message.create({

  sender: senderId,

  receiver: receiverId,

  text,

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

if(String(senderId) !== receiverId){

  io.to(String(senderId)).emit(
    "receive-message",
    message
  )

}

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
// Get conversation between two users
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


    if(!user){

      return res.status(404).json({
        message:"User not found"
      })

    }



   const messages =
await Message.find({

  $or:[

    {
      sender:currentUser,
      receiver:otherUser
    },

    {
      sender:otherUser,
      receiver:currentUser
    }

  ]

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
  createdAt:1
})




    res.json({

      user,

      messages

    })


  }
  catch(error){

    console.log(error)

    res.status(500).json({

      message:"Server error"

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

// Search users for new chat
export async function getChatUsers(
  req: AuthRequest,
  res: Response
) {

  try {

    const currentUser = req.userId

    const search =
      String(req.query.search || "")


    const users = await User.find({

      _id:{
        $ne: currentUser
      },

      name:{
        $regex: search,
        $options:"i"
      }

    })
    .select(
      "name image college course"
    )
    .limit(20)



    res.json(users)


  }
  catch(error){

    console.log(error)

    res.status(500).json({
      message:"Server error"
    })

  }

}