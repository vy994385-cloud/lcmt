import { Response } from "express"
import mongoose from "mongoose"

import Community from "../../models/Community"
import User from "../../models/User"

import {
 AuthRequest
} from "../../middleware/authMiddleware"

import {
 createNotification
} from "../../services/notificationService"



export async function joinCommunity(
req:AuthRequest,
res:Response
){

try{


const userId =
req.userId as string


const community =
await Community.findById(
req.params.id
)


if(!community){

return res.status(404).json({

message:"Community not found"

})

}



const exists =
community.members.some(

(member:any)=>

String(member)===userId

)


if(!exists){

community.members.push(
new mongoose.Types.ObjectId(userId)
)

await community.save()


await User.findByIdAndUpdate(

userId,

{

$addToSet:{
communities:community._id
}

}

)


await createNotification({

receiver:String(
community.creator
),

sender:userId,

type:"community_join",

title:"New community member",

message:
`${userId} joined ${community.name}`,

community:String(
community._id
)

})

}



res.json({

message:"Joined community",

community

})


}

catch(error){

console.log(error)

res.status(500).json({

message:"Server error"

})

}

}





export async function leaveCommunity(
req:AuthRequest,
res:Response
){

try{


const userId =
req.userId as string


const community =
await Community.findById(
req.params.id
)


if(!community){

return res.status(404).json({

message:"Community not found"

})

}



community.members =
community.members.filter(

(member:any)=>

String(member)!==userId

)


await community.save()


await User.findByIdAndUpdate(

userId,

{

$pull:{
communities:community._id
}

}

)


res.json({

message:"Left community"

})


}

catch(error){

console.log(error)

res.status(500).json({

message:"Server error"

})

}

}