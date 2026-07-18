import { Response } from "express"

import Community from "../models/Community"
import { AuthRequest } from "../middleware/authMiddleware"


export async function getCommunityPosts(
  req: AuthRequest,
  res: Response
) {

  try {

    const community =
      await Community.findById(
        req.params.id
      )


    if (!community) {

      return res.status(404).json({
        message:"Community not found"
      })

    }


    return res.json([])


  } catch(error){

    console.log(error)

    return res.status(500).json({
      message:"Server error"
    })

  }

}





export async function createCommunityPost(
  req: AuthRequest,
  res: Response
){

  try {


    return res.json({

      message:
      "Post created successfully"

    })


  } catch(error){

    console.log(error)

    return res.status(500).json({
      message:"Server error"
    })

  }

}