import { Response } from "express"

import GroupMessage from "../../models/groups/GroupMessage"

import { AuthRequest } from "../../middleware/authMiddleware"

import mongoose from "mongoose"

export async function getGroupMessages(

req:AuthRequest,

res:Response

){

try{

const messages=

await GroupMessage.find({

group:new mongoose.Types.ObjectId(
req.params.id as string
)

})

.populate(
"sender",
"name image"
)

.populate(
"replyTo"
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

export async function sendGroupMessage(

req:AuthRequest,

res:Response

){

try{

const message=

new GroupMessage({

group:new mongoose.Types.ObjectId(
req.params.id as string
),

sender:new mongoose.Types.ObjectId(
req.userId as string
),

text:req.body.text||"",

image:req.body.image,

video:req.body.video,

audio:req.body.audio,

file:req.body.file,

fileName:req.body.fileName,

replyTo:req.body.replyTo

})

await message.save()

const populated=

await GroupMessage.findById(

message._id

)

.populate(
"sender",
"name image"
)

.populate(
"replyTo"
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