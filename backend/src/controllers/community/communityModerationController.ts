import { Response } from "express"
import mongoose from "mongoose"

import Community from "../../models/Community"

import {
 AuthRequest
} from "../../middleware/authMiddleware"



export async function addModerator(
req:AuthRequest,
res:Response
){

try{


const community =
await Community.findById(
req.params.id
)


if(!community){

return res.status(404).json({

message:"Community not found"

})

}



if(
String(community.creator)!==
String(req.userId)
){

return res.status(403).json({

message:"Only creator can manage moderators"

})

}



community.moderators.push(

new mongoose.Types.ObjectId(

String(req.params.userId)

)

)


await community.save()


res.json({

message:"Moderator added",

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