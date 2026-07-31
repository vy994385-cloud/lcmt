import { Response } from "express"

import { AuthRequest } from "../../middleware/authMiddleware"

import Group from "../../models/Group"

import GroupMessage from "../../models/groups/GroupMessage"

import { getIO } from "../../socket"


export async function sendGroupMessage(

req:AuthRequest,

res:Response

){

try{

const userId =
req.userId as string


const groupId =
String(req.params.id)



const group =
await Group.findById(groupId)



if(!group){

return res.status(404).json({

message:"Group not found"

})

}



if(
!group.members.includes(userId as any)
){

return res.status(403).json({

message:"Not a member"

})

}



const message = await GroupMessage.create({

group:groupId,

sender:userId,

text:req.body.text || "",

image:req.body.image || "",

file:req.body.file || "",

audio:req.body.audio || ""

})



const populated =
await GroupMessage.findById(
message._id
)
.populate(
"sender",
"name image"
)



const io =
getIO()


io.to(groupId)
.emit(
"receive-group-message",
populated
)



res.json(populated)


}

catch(error){

console.log(error)


res.status(500).json({

message:"Server error"

})

}

}





export async function getGroupMessages(

req:AuthRequest,

res:Response

){

try{


const messages =

await GroupMessage.find({

group:String(req.params.id)

})

.populate(

"sender",

"name image"

)

.sort({

createdAt:1

})



res.json(messages)



}

catch(error){

console.log(error)


res.status(500).json({

message:"Server error"

})

}

}