import { Response } from "express"
import { AuthRequest } from "../middleware/authMiddleware"
import Post from "../models/Post"
import User from "../models/User"

import {
  createNotification
} from "../services/notificationService"

export async function getFeed(
  req: AuthRequest,
  res: Response
) {

  try {

    const page =
      Number(req.query.page) || 1

    const limit =
      Number(req.query.limit) || 10


    const type =
      req.query.type || "forYou"


    const skip =
      (page - 1) * limit


    let filter:any = {}


    const user =
      await User.findById(req.userId)


    /*
      Following feed
      Posts from people user follows
    */

    if(type === "following"){

      filter.user = {
        $in:user?.following || []
      }

    }


    /*
      Community feed
      Posts from joined communities
    */

    if(type === "communities"){

      filter.community = {
        $in:user?.communities || []
      }

    }



    const posts =
      await Post.find(filter)


      .populate(
        "user",
        "name image username"
      )

      .populate(
        "community",
        "name icon"
      )

      .populate(
        "comments.user",
        "name image"
      )


      /*
        Basic ranking:
        engagement + freshness

        score =
        likes*2
        comments*3
        + recent boost
      */

      .lean()



    const ranked =
      posts.map((post:any)=>{


        const hours =
          Math.max(
            1,
            (
              Date.now()
              -
              new Date(post.createdAt).getTime()
            )
            /
            (1000*60*60)
          )


        const engagement =
          (
            (post.likes?.length || 0) * 2
            +
            (post.comments?.length || 0) * 3
          )


        const score =
          engagement
          +
          (24 / hours)



        return {
          ...post,
          score
        }


      })


      .sort(
        (a:any,b:any)=>
          b.score-a.score
      )


      .slice(
        skip,
        skip + limit
      )



    const formatted =
      ranked.map((post:any)=>{


        const saved =
          user?.savedPosts?.some(
            (id:any)=>
              String(id)
              ===
              String(post._id)
          )


        return {

          ...post,

          saved

        }


      })



    const total =
      await Post.countDocuments(filter)



    return res.json({

      posts:formatted,

      page,

      limit,

      total,

      hasMore:
        skip + limit < total

    })


  }

  catch(error){

    console.log(error)

    return res.status(500).json({

      message:"Server error"

    })

  }

}

export async function getPost(
  req: AuthRequest,
  res: Response
) {

  try {

    const post = await Post.findById(req.params.id)

      .populate(
        "user",
        "name image username"
      )

      .populate(
        "community",
        "name icon"
      )

      .populate(
        "comments.user",
        "name image"
      )

    if (!post) {

      return res.status(404).json({
        message: "Post not found"
      })

    }

    return res.json(post)

  }

  catch (error) {

    console.log(error)

    return res.status(500).json({
      message: "Server error"
    })

  }

}

export async function createFeedPost(
  req: AuthRequest,
  res: Response
) {

  try {

    console.log("CREATE POST BODY:", req.body)

    if (!req.userId) {

      return res.status(401).json({
        message: "Unauthorized"
      })

    }

    if (
      !req.body.content?.trim() &&
      !req.body.image
    ) {

      return res.status(400).json({
        message: "Post must contain text or image"
      })

    }

    const post = await Post.create({

      user: req.userId,

      community: req.body.community || null,

      content: req.body.content,

      image: req.body.image || ""

    })

    const populated = await Post.findById(post._id)

      .populate(
        "user",
        "name image username"
      )

      .populate(
        "community",
        "name icon"
      )

      .populate(
        "comments.user",
        "name image"
      )

    return res.json(populated)

  } catch (error: any) {

    console.error("CREATE POST ERROR")
    console.error(error)
    console.error(error?.message)
    console.error(error?.stack)

    return res.status(500).json({
      message: error?.message || "Server error"
    })

  }

}

export async function deletePost(
  req: AuthRequest,
  res: Response
) {

  try {

    if (!req.userId) {

      return res.status(401).json({
        message: "Unauthorized"
      })

    }

    const post = await Post.findById(
      req.params.id
    )

    if (!post) {

      return res.status(404).json({
        message: "Post not found"
      })

    }

    if (
      post.user.toString() !== req.userId
    ) {

      return res.status(403).json({
        message: "Not allowed"
      })

    }

    await post.deleteOne()

    return res.json({
      message: "Post deleted"
    })

  }

  catch (error) {

    console.log(error)

    return res.status(500).json({
      message: "Server error"
    })

  }

}

export async function likePost(
  req: AuthRequest,
  res: Response
) {

  try {

    if (!req.userId) {

      return res.status(401).json({
        message: "Unauthorized"
      })

    }

    const post = await Post.findById(
      req.params.id
    )

    if (!post) {

      return res.status(404).json({
        message: "Post not found"
      })

    }

    const liked = post.likes.some(
      id => id.toString() === req.userId
    )

    if (liked) {

      post.likes = post.likes.filter(
        id => id.toString() !== req.userId
      )

    } else {

      post.likes.push(req.userId as any)

      if (
        post.user.toString() !== req.userId
      ) {

        const sender =
          await User.findById(req.userId)

        await createNotification({

          receiver: post.user.toString(),

          sender: req.userId,

          type: "post_like",

          title: "New Like",

          message: `${sender?.name || "Someone"} liked your post.`,

          post: post._id.toString()

        })

      }

    }

    await post.save()

    return res.json({

      liked: !liked,

      likes: post.likes.length

    })

  } catch (error) {

    console.log(error)

    return res.status(500).json({
      message: "Server error"
    })

  }

}

export async function addComment(
  req: AuthRequest,
  res: Response
) {

  try {

    if (!req.userId) {

      return res.status(401).json({
        message: "Unauthorized"
      })

    }

    const post = await Post.findById(
      req.params.id
    )

    if (!post) {

      return res.status(404).json({
        message: "Post not found"
      })

    }

    post.comments.push({

      user: req.userId,

      text: req.body.text

    } as any)

    await post.save()

    if (
      post.user.toString() !== req.userId
    ) {

      const sender =
        await User.findById(req.userId)

      await createNotification({

        receiver: post.user.toString(),

        sender: req.userId,

        type: "post_comment",

        title: "New Comment",

        message: `${sender?.name || "Someone"} commented on your post.`,

        post: post._id.toString()

      })

    }

    const updated = await Post.findById(post._id)

      .populate(
        "comments.user",
        "name image"
      )

    return res.json(updated?.comments)

  } catch (error) {

    console.log(error)

    return res.status(500).json({
      message: "Server error"
    })

  }

}

export async function updatePost(
  req: AuthRequest,
  res: Response
) {

  try {

    if (!req.userId) {

      return res.status(401).json({
        message: "Unauthorized"
      })

    }

    const post = await Post.findById(
      req.params.id
    )

    if (!post) {

      return res.status(404).json({
        message: "Post not found"
      })

    }

    if (
      post.user.toString() !== req.userId
    ) {

      return res.status(403).json({
        message: "Not allowed"
      })

    }

    post.content =
      req.body.content ?? post.content

    if (
      req.body.image !== undefined
    ) {

      post.image = req.body.image

    }

    await post.save()

    const updated = await Post.findById(
      post._id
    )

    .populate(
      "user",
      "name image username"
    )

    .populate(
      "community",
      "name icon"
    )

    .populate(
      "comments.user",
      "name image"
    )

    return res.json(updated)

  }

  catch(error){

    console.log(error)

    return res.status(500).json({
      message:"Server error"
    })

  }

}

export async function toggleSavePost(
  req: AuthRequest,
  res: Response
){

  try{

    if(!req.userId){

      return res.status(401).json({
        message:"Unauthorized"
      })

    }

    const post = await Post.findById(
      req.params.id
    )

    if(!post){

      return res.status(404).json({
        message:"Post not found"
      })

    }

    const user = await User.findById(
      req.userId
    )

    if(!user){

      return res.status(404).json({
        message:"User not found"
      })

    }

    const alreadySaved =
      post.savedBy.some(
        id=>id.toString()===req.userId
      )

    if(alreadySaved){

      post.savedBy =
        post.savedBy.filter(
          id=>id.toString()!==req.userId
        )

      user.savedPosts =
        user.savedPosts.filter(
          (id:any)=>
          id.toString()!==post._id.toString()
        )

    }

    else{

      post.savedBy.push(
        req.userId as any
      )

      user.savedPosts.push(
        post._id as any
      )

    }

    post.saveCount = post.savedBy.length

    await post.save()

    await user.save()

    return res.json({

      saved:!alreadySaved,

      saveCount:post.saveCount

    })

  }

  catch(error){

    console.log(error)

    return res.status(500).json({
      message:"Server error"
    })

  }

}