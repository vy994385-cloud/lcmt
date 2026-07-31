import { Response } from "express"

import User from "../models/User"

import { AuthRequest } from "../middleware/authMiddleware"


export async function getNetwork(
  req: AuthRequest,
  res: Response
){

  try{

    if(!req.userId){

      return res.status(401).json({
        message:"Unauthorized"
      })

    }


    const user = await User.findById(req.userId)

      .populate(
        "friends",
        "name image bio interests"
      )

      .populate(
        "friendRequestsReceived",
        "name image bio interests"
      )

      .populate(
        "communities",
        "name description members tags"
      )


    if(!user){

      return res.status(404).json({
        message:"User not found"
      })

    }



    const friendIds =
      user.friends.map(
        (friend:any)=>
          friend._id
      )



    const requestIds =
      user.friendRequestsReceived.map(
        (request:any)=>
          request._id
      )



    const discover =
      await User.find({

        _id:{

          $nin:[

            req.userId,

            ...friendIds,

            ...requestIds

          ]

        }

      })

      .limit(10)

      .select(
        "name image bio interests"
      )



    const requests =
      user.friendRequestsReceived || []



    const connections =
      user.friends || []



    const communities =
      user.communities || []



    res.json({

      requests,


      discover,


      connections,


      communities,


      stats:{

        requests:
          requests.length,


        connections:
          connections.length,


        communities:
          communities.length

      }


    })


  }
  catch(error){

    console.log(
      "NETWORK ERROR:",
      error
    )


    res.status(500).json({

      message:"Server Error"

    })

  }

}