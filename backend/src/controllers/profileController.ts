import { Response } from "express"
import User from "../models/User"
import { AuthRequest } from "../middleware/authMiddleware"

import Post from "../models/Post"

export async function updateProfile(
  req: AuthRequest,
  res: Response
){

try{

const user =
await User.findByIdAndUpdate(

req.userId,

{

username:req.body.username,

headline:req.body.headline,

bio:req.body.bio,

college:req.body.college,

course:req.body.course,

location:req.body.location,

image:req.body.image,

interests:req.body.interests,

coverImage:req.body.coverImage,

website:req.body.website,

profileVisibility:req.body.profileVisibility

},

{
new:true
}

).select("-password")

if(!user){

return res.status(404).json({

message:"User not found"

})

}

const posts = await Post.find({

user:user._id

})
.sort({

createdAt:-1

})

.populate(

"user",

"name username image"

)

.populate(

"community",

"name"

)

res.status(200).json({

message:"Profile updated successfully",

user

})


}
catch(error){

console.log(error)

res.status(500).json({

message:"Server Error"

})

}

}

export async function getMyProfile(
  req: AuthRequest,
  res: Response
){

try{

const user =
await User.findById(req.userId)
.select("-password")
.populate(
"communities",
"name icon"
)
.populate(
"friends",
"name username image headline"
)


if(!user){

return res.status(404).json({

message:"User not found"

})

}

const posts = await Post.find({

user:user._id

})

.sort({

createdAt:-1

})

.populate(

"user",

"name username image"

)

.populate(

"community",

"name"

)

res.status(200).json({

...user.toObject(),

posts

})


}
catch(error){

console.log(error)

res.status(500).json({

message:"Server Error"

})

}

}

export async function getUsers(
  req: AuthRequest,
  res: Response
) {
  try {
const users = await User.find({
  _id: {
    $ne: req.userId,
  },

  bio: {
    $ne: "",
  },

  college: {
    $ne: "",
  },

  course: {
    $ne: "",
  },
})

.select("-password")

.populate(
  "communities",
  "name icon"
)

.populate(
  "friends",
  "name username image"
)

    res.status(200).json(users)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Server Error",
    })
  }
}

export async function likeUser(
  req: AuthRequest,
  res: Response
) {
  try {
    const currentUserId = req.userId
    const likedUserId = req.params.userId

    if (currentUserId === likedUserId) {
      return res.status(400).json({
        message: "You cannot like yourself",
      })
    }

    const currentUser = await User.findById(currentUserId)
    const likedUser = await User.findById(likedUserId)

    if (!currentUser || !likedUser) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    const alreadyLiked = currentUser.likedUsers.some(
      (id: any) => id.toString() === likedUserId
    )

    if (alreadyLiked) {
      return res.status(200).json({
        message: "Already liked",
      })
    }

    currentUser.likedUsers.push(likedUser._id)

    let matched = false

    const mutualLike = likedUser.likedUsers.some(
      (id: any) => id.toString() === currentUserId
    )

    if (mutualLike) {
      matched = true

      if (
        !currentUser.matchedUsers.some(
          (id: any) => id.toString() === likedUserId
        )
      ) {
        currentUser.matchedUsers.push(likedUser._id)
      }

      if (
        !likedUser.matchedUsers.some(
          (id: any) => id.toString() === currentUserId
        )
      ) {
        likedUser.matchedUsers.push(currentUser._id)
      }

      await likedUser.save()
    }

    await currentUser.save()

    res.status(200).json({
      message: matched
        ? "It's a Match! ❤️"
        : "Liked successfully ❤️",
      matched,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Server Error",
    })
  }
}

export async function getMatches(
  req: AuthRequest,
  res: Response
) {
  try {
    const user = await User.findById(req.userId).populate({
      path: "matchedUsers",
      select: "-password",
    })

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    res.status(200).json(user.matchedUsers)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Server Error",
    })
  }
}

export async function getProfileById(
  req: AuthRequest,
  res: Response
){

try{

const user =
await User.findById(req.params.id)
.select("-password")
.populate(
  "communities"
)
.populate(
  "followers",
  "name username image"
)
.populate(
  "following",
  "name username image headline"
)
.populate(
  "friends",
  "name username image headline"
)

if(!user){

return res.status(404).json({
message:"User not found"
})

}

const currentUser =
await User.findById(req.userId)
.populate(
  "friends",
  "_id"
)

const isOwnProfile =
String(user._id) === String(req.userId)

const isFriend =
currentUser
?
currentUser.friends.some(
(friend:any)=>
String(friend._id || friend) ===
String(user._id)
)
:
false

const canView =
isOwnProfile ||
user.profileVisibility === "public" ||
isFriend

let sharedInterests:string[]=[]

if(currentUser){

sharedInterests =
user.interests.filter(
(item:string)=>
currentUser.interests.includes(item)
)

}

let mutualConnections:any[]=[]

if(currentUser){

const friendIds =
currentUser.friends.map(
(id:any)=>id.toString()
)

mutualConnections =
user.friends.filter(
(id:any)=>
friendIds.includes(
id.toString()
)
)

}

if(!canView){

return res.json({

_id:user._id,

name:user.name,

username:user.username,

image:user.image,

headline:user.headline,

verified:user.verified,

profileVisibility:user.profileVisibility,

followers:user.followers,

following:user.following,

communities:user.communities

})

}

const posts =
await Post.find({

user:user._id

})

.sort({

createdAt:-1

})

.populate(

"user",

"name username image"

)

.populate(

"community",

"name"

)

res.json({

...user.toObject(),

posts,

sharedInterests,

mutualConnections

})

}
catch(error){

console.log(error)

res.status(500).json({
message:"Profile fetch failed"
})

}

}