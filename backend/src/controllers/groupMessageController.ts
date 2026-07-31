import {
 Response
} from "express"

import {
 AuthRequest
} from "../middleware/authMiddleware"

import GroupMessage from "../models/GroupMessage"
import Group from "../models/Group"
import { getIO } from "../socket"


// Send group message

export async function sendGroupMessage(
req:AuthRequest,
res:Response
){

try{


const userId=req.userId

const groupId = String(req.params.id)

const {
text,
type,
url
}=req.body



const group =
await Group.findById(groupId)


if(!group){

return res.status(404)
.json({
message:"Group not found"
})

}



const member =
group.members.some(
(member:any)=>
String(member)===String(userId)
)



if(!member){

return res.status(403)
.json({
message:"Not a group member"
})

}

let message = await GroupMessage.create({

group:groupId,

sender:userId,

text:text || "",

type:type || "text",

url

})



const populated =
await message.populate(
"sender",
"name image"
)



const io=getIO()



io.to(
groupId
)
.emit(
"group-message",
populated
)



res.json(populated)



}

catch(error){

console.log(error)

res.status(500)
.json({
message:"Server error"
})

}


}