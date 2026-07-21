import { Response } from "express"
import mongoose from "mongoose"

import User from "../models/User"
import { AuthRequest } from "../middleware/authMiddleware"


// ======================
// Follow User
// ======================

export async function followUser(
  req: AuthRequest,
  res: Response
) {
  try {

    if (!req.userId) {
      return res.status(401).json({
        message:"Unauthorized"
      })
    }


    const currentUserId =
      new mongoose.Types.ObjectId(req.userId)


    const targetId =
      req.params.id as string


    const targetUserId =
      new mongoose.Types.ObjectId(targetId)



    if(
      currentUserId.toString() ===
      targetUserId.toString()
    ){

      return res.status(400).json({
        message:"You cannot follow yourself"
      })

    }



    const currentUser =
      await User.findById(currentUserId)


    const targetUser =
      await User.findById(targetUserId)



    if(!currentUser || !targetUser){

      return res.status(404).json({
        message:"User not found"
      })

    }



    const alreadyFollowing =
      currentUser.following.some(
        id =>
          id.toString() ===
          targetUserId.toString()
      )


    if(alreadyFollowing){

      return res.status(400).json({
        message:"Already following"
      })

    }



    currentUser.following.push(targetUserId)

    targetUser.followers.push(currentUserId)



    await currentUser.save()
    await targetUser.save()



    res.json({
      success:true,
      message:"Followed successfully"
    })


  }
  catch(error){

    console.log(error)

    res.status(500).json({
      message:"Server Error"
    })

  }
}






// ======================
// Unfollow User
// ======================

export async function unfollowUser(
  req: AuthRequest,
  res: Response
){

try{


if(!req.userId){

return res.status(401).json({
message:"Unauthorized"
})

}



const targetId =
req.params.id as string



const currentUser =
await User.findById(req.userId)



const targetUser =
await User.findById(targetId)



if(!currentUser || !targetUser){

return res.status(404).json({
message:"User not found"
})

}




currentUser.following =
currentUser.following.filter(
id =>
id.toString() !== targetId
)



targetUser.followers =
targetUser.followers.filter(
id =>
id.toString() !== req.userId
)



await currentUser.save()
await targetUser.save()



res.json({

success:true,

message:"Unfollowed successfully"

})


}
catch(error){

console.log(error)

res.status(500).json({
message:"Server Error"
})

}


}







// ======================
// Friend Request
// ======================


export async function sendFriendRequest(
req:AuthRequest,
res:Response
){

try{


if(!req.userId){

return res.status(401).json({
message:"Unauthorized"
})

}



const sender =
await User.findById(req.userId)



const receiver =
await User.findById(req.params.id)



if(!sender || !receiver){

return res.status(404).json({
message:"User not found"
})

}



if(
receiver.friendRequestsReceived.some(
id =>
id.toString() === sender._id.toString()
)
){

return res.status(400).json({
message:"Request already sent"
})

}



receiver.friendRequestsReceived.push(
sender._id
)



sender.friendRequestsSent.push(
receiver._id
)



await receiver.save()
await sender.save()



res.json({

success:true,

message:"Friend request sent"

})


}
catch(error){

console.log(error)

res.status(500).json({
message:"Server Error"
})

}

}









// ======================
// Accept Friend Request
// ======================


export async function acceptFriendRequest(
req:AuthRequest,
res:Response
){

try{


const user =
await User.findById(req.userId)


const requester =
await User.findById(req.params.id)



if(!user || !requester){

return res.status(404).json({
message:"User not found"
})

}



user.friendRequestsReceived =
user.friendRequestsReceived.filter(
id =>
id.toString() !== requester._id.toString()
)



requester.friendRequestsSent =
requester.friendRequestsSent.filter(
id =>
id.toString() !== user._id.toString()
)



user.friends.push(
requester._id
)


requester.friends.push(
user._id
)



await user.save()
await requester.save()



res.json({

success:true,

message:"Friend request accepted"

})


}
catch(error){

console.log(error)

res.status(500).json({
message:"Server Error"
})

}

}








// ======================
// Reject Friend Request
// ======================


export async function rejectFriendRequest(
req:AuthRequest,
res:Response
){

try{


const user =
await User.findById(req.userId)



if(!user){

return res.status(404).json({
message:"User not found"
})

}



user.friendRequestsReceived =
user.friendRequestsReceived.filter(

id =>
id.toString() !== req.params.id

)



await user.save()



res.json({

success:true,

message:"Request rejected"

})


}
catch(error){

console.log(error)

res.status(500).json({
message:"Server Error"
})

}

}









// ======================
// Followers
// ======================

export async function getFollowers(
req:AuthRequest,
res:Response
){

try{


const user =
await User.findById(req.params.id)
.populate(
"followers",
"name username image headline college course"
)



if(!user){

return res.status(404).json({
message:"User not found"
})

}


res.json(user.followers)


}
catch(error){

console.log(error)

res.status(500).json({
message:"Server Error"
})

}

}







// ======================
// Following
// ======================

export async function getFollowing(
req:AuthRequest,
res:Response
){

try{


const user =
await User.findById(req.params.id)
.populate(
"following",
"name username image headline college course"
)



if(!user){

return res.status(404).json({
message:"User not found"
})

}


res.json(user.following)


}
catch(error){

console.log(error)

res.status(500).json({
message:"Server Error"
})

}

}







// ======================
// Friends
// ======================

export async function getFriends(
req:AuthRequest,
res:Response
){

try{


const user =
await User.findById(req.params.id)
.populate(
"friends",
"name username image headline college course"
)



if(!user){

return res.status(404).json({
message:"User not found"
})

}


res.json(user.friends)


}
catch(error){

console.log(error)

res.status(500).json({
message:"Server Error"
})

}

}