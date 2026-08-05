import { Response } from "express"

import {
  AuthRequest
} from "../middleware/authMiddleware"

import User from "../models/User"

import {
  createNotification
} from "../services/notificationService"



// =========================
// SEND FRIEND REQUEST
// =========================

export async function sendFriendRequest(
  req: AuthRequest,
  res: Response
) {

  try {

    const senderId = String(req.userId)
    const receiverId = String(req.params.id)

    if (senderId === receiverId) {

      return res.status(400).json({
        message: "You cannot connect with yourself"
      })

    }

    const sender =
      await User.findById(senderId)

    const receiver =
      await User.findById(receiverId)

    if (!sender || !receiver) {

      return res.status(404).json({
        message: "User not found"
      })

    }

    sender.friendRequestsSent ??= []
    receiver.friendRequestsReceived ??= []

    sender.friends ??= []
    receiver.friends ??= []

    const alreadyFriends =
      sender.friends.some(
        (id: any) =>
          String(id) === receiverId
      )

    if (alreadyFriends) {

      return res.status(400).json({
        message: "Already connected"
      })

    }

    const alreadySent =
      sender.friendRequestsSent.some(
        (id: any) =>
          String(id) === receiverId
      )

    if (alreadySent) {

      return res.status(400).json({
        message: "Request already sent"
      })

    }

    sender.friendRequestsSent.push(
      receiver._id
    )

    receiver.friendRequestsReceived.push(
      sender._id
    )

    await sender.save()
    await receiver.save()

    await createNotification({

      receiver: receiverId,

      sender: senderId,

      type: "friend_request",

      title: "New Connection Request",

      message: `${sender.name} sent you a connection request.`

    })

    return res.json({

      message: "Friend request sent"

    })

  }

  catch (error) {

    console.log(error)

    return res.status(500).json({

      message: "Server error"

    })

  }

}



// =========================
// ACCEPT FRIEND REQUEST
// =========================

export async function acceptFriendRequest(
  req: AuthRequest,
  res: Response
) {

  try {

    const userId =
      String(req.userId)

    const senderId =
      String(req.params.id)

    const user =
      await User.findById(userId)

    const sender =
      await User.findById(senderId)

    if (!user || !sender) {

      return res.status(404).json({

        message: "User not found"

      })

    }

    user.friendRequestsReceived ??= []
    sender.friendRequestsSent ??= []

    user.friends ??= []
    sender.friends ??= []

    user.friendRequestsReceived =
      user.friendRequestsReceived.filter(

        (id: any) =>

          String(id) !== senderId

      )

    sender.friendRequestsSent =
      sender.friendRequestsSent.filter(

        (id: any) =>

          String(id) !== userId

      )

    if (

      !user.friends.some(

        (id: any) =>

          String(id) === senderId

      )

    ) {

      user.friends.push(
        sender._id
      )

    }

    if (

      !sender.friends.some(

        (id: any) =>

          String(id) === userId

      )

    ) {

      sender.friends.push(
        user._id
      )

    }

    await user.save()

    await sender.save()

    await createNotification({

      receiver: senderId,

      sender: userId,

      type: "friend_accept",

      title: "Connection Accepted",

      message:
        `${user.name} accepted your connection request.`

    })

    return res.json({

      message: "Friend request accepted"

    })

  }

  catch (error) {

    console.log(error)

    return res.status(500).json({

      message: "Server error"

    })

  }

}



// =========================
// REJECT FRIEND REQUEST
// =========================

export async function rejectFriendRequest(
  req: AuthRequest,
  res: Response
) {

  try {

    const userId =
      String(req.userId)

    const senderId =
      String(req.params.id)

    const user =
      await User.findById(userId)

    const sender =
      await User.findById(senderId)

    if (!user || !sender) {

      return res.status(404).json({

        message: "User not found"

      })

    }

    user.friendRequestsReceived ??= []
    sender.friendRequestsSent ??= []

    user.friendRequestsReceived =
      user.friendRequestsReceived.filter(

        (id: any) =>

          String(id) !== senderId

      )

    sender.friendRequestsSent =
      sender.friendRequestsSent.filter(

        (id: any) =>

          String(id) !== userId

      )

    await user.save()

    await sender.save()

    return res.json({

      message: "Friend request rejected"

    })

  }

  catch (error) {

    console.log(error)

    return res.status(500).json({

      message: "Server error"

    })

  }

}

// =========================
// GET USER FRIENDS
// =========================

export async function getFriends(
  req: AuthRequest,
  res: Response
){

  try{

    const user =
      await User.findById(req.params.id)
      .populate(
        "friends",
        "name image username bio college course"
      )

    if(!user){

      return res.status(404).json({
        message:"User not found"
      })

    }


    return res.json(
      user.friends || []
    )


  }
  catch(error){

    console.log(error)

    return res.status(500).json({
      message:"Server error"
    })

  }

}

