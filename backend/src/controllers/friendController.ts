import { Response } from "express"

import User from "../models/User"

import { AuthRequest } from "../middleware/authMiddleware"




// Send Friend Request

export async function sendFriendRequest(
  req: AuthRequest,
  res: Response
){

try{


if(!req.userId){

return res.status(401).json({
message:"Unauthorized"
})

}



const sender =
await User.findById(
req.userId
)



const receiver =
await User.findById(
req.params.id
)



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








// Accept Friend Request

export async function acceptFriendRequest(
req:AuthRequest,
res:Response
){

try{


const user =
await User.findById(
req.userId
)


const requester =
await User.findById(
req.params.id
)



if(!user || !requester){

return res.status(404).json({
message:"User not found"
})

}




user.friendRequestsReceived =
user.friendRequestsReceived.filter(

id =>
id.toString()
!== requester._id.toString()

)



requester.friendRequestsSent =
requester.friendRequestsSent.filter(

id =>
id.toString()
!== user._id.toString()

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









// Reject Friend Request

export async function rejectFriendRequest(
req:AuthRequest,
res:Response
){

try{


const user =
await User.findById(
req.userId
)



if(!user){

return res.status(404).json({
message:"User not found"
})

}




user.friendRequestsReceived =
user.friendRequestsReceived.filter(

id =>
id.toString()
!== req.params.id

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