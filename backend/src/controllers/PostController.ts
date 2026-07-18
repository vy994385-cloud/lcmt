import { Response } from "express"
import { AuthRequest } from "../middleware/authMiddleware"

import Post from "../models/Post"
import Community from "../models/Community"



export async function getCommunityPosts(
  req: AuthRequest,
  res: Response
) {

  try {

    const posts = await Post.find({
      community: req.params.id
    })
    .populate({
      path:"user",
      select:"name image"
    })
    .populate({
      path:"comments.user",
      select:"name image"
    })
    .sort({
      createdAt:-1
    })


    return res.json(posts)


  } catch(error) {


    console.log(error)


    return res.status(500).json({
      message:"Server error"
    })


  }

}





export async function createCommunityPost(
  req: AuthRequest,
  res: Response
) {

  try {


    const userId =
      req.userId || req.body.userId



    if(!userId){

      return res.status(401).json({
        message:"Unauthorized"
      })

    }



    const community =
      await Community.findById(
        req.params.id
      )


    if(!community){

      return res.status(404).json({
        message:"Community not found"
      })

    }



    const post =
      await Post.create({

        community:req.params.id,

        user:userId,

        content:req.body.content

      })



    const populatedPost =
      await Post.findById(post._id)
      .populate(
        "user",
        "name image"
      )



    return res.json({

      message:"Post created",

      post:populatedPost

    })


  } catch(error){


    console.log(error)


    return res.status(500).json({
      message:"Server error"
    })


  }

}