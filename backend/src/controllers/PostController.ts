import { Response } from "express"
import { AuthRequest } from "../middleware/authMiddleware"

import Post from "../models/Post"
import Community from "../models/Community"



export async function getCommunityPosts(
  req: AuthRequest,
  res: Response
) {

  try {


    const communityId =
      String(req.params.id)



    const posts =
      await Post.find({
        community: communityId
      })
      .populate({
        path: "user",
        select: "name image"
      })
      .populate({
        path: "comments.user",
        select: "name image"
      })
      .sort({
        createdAt: -1
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



    const communityId =
      String(req.params.id)



    const community =
      await Community.findById(
        communityId
      )



    if(!community){

      return res.status(404).json({

        message:"Community not found"

      })

    }





    const post =
      await Post.create({

        community: communityId,

        user: userId,

        content: req.body.content

      })





    const populatedPost =
      await Post.findById(
        post._id
      )
      .populate({

        path:"user",

        select:"name image"

      })





    return res.json({

      message:"Post created",

      post: populatedPost

    })




  } catch(error){


    console.log(error)



    return res.status(500).json({

      message:"Server error"

    })


  }

}

export async function getAllPosts(
  req: AuthRequest,
  res: Response
) {

  try {

    const posts =
      await Post.find()

      .populate({
        path:"user",
        select:"name image"
      })

      .populate({
        path:"comments.user",
        select:"name image"
      })

      .populate({
        path:"community",
        select:"name"
      })

      .populate({
  path:"originalPost",
  populate:{
    path:"user",
    select:"name username image"
  }
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

export async function repostPost(
  req: AuthRequest,
  res: Response
){

try{

const userId =
req.userId

if(!userId){

return res.status(401).json({
message:"Unauthorized"
})

}

const original =
await Post.findById(
req.params.id
)

if(!original){

return res.status(404).json({
message:"Post not found"
})

}

const repost =
await Post.create({

user:userId,

community:original.community,

content:original.content,

image:original.image,

isRepost:true,

originalPost:original._id

})

original.shareCount += 1

await original.save()

const populated =
await Post.findById(repost._id)

.populate(
"user",
"name username image"
)

.populate(
"originalPost"
)

.populate(
"community",
"name"
)

res.json({

success:true,

post:populated

})

}
catch(error){

console.log(error)

res.status(500).json({

message:"Server Error"

})

}

}