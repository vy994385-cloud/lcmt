import { Response } from "express"

import Community from "../../models/Community"

import {
 AuthRequest
} from "../../middleware/authMiddleware"

import { createSlug } from "../../utils/slug"

import { RESERVED_COMMUNITIES } from "../../config/reservedCommunities"

export async function getCommunities(
req:AuthRequest,
res:Response
){

try{

const communities =
await Community.find({
isPublic:true
})

res.json(
communities
)

}

catch(error){

console.log(error)

res.status(500).json({
message:"Server error"
})

}

}



export async function getCommunityById(
req:AuthRequest,
res:Response
){

try{

const community =
await Community.findById(
req.params.id
)
.populate(
"members",
"name image bio interests"
)
.populate(
"creator",
"name image"
)


if(!community){

return res.status(404).json({

message:"Community not found"

})

}


res.json(
community
)


}

catch(error){

console.log(error)

res.status(500).json({

message:"Server error"

})

}

}



export async function createCommunity(
req:AuthRequest,
res:Response
){

try{


const userId =
req.userId as string

const slug =
createSlug(req.body.name)

if(
RESERVED_COMMUNITIES.includes(slug)
){

return res.status(400).json({

message:"This community name is reserved."

})

}

const existing =
await Community.findOne({ slug })

if(existing){

return res.status(400).json({

message:"Community already exists."

})

}

const community =
await Community.create({

name:req.body.name,

slug,

description:req.body.description,

category:req.body.category,

creator:userId,

members:[userId]

})


res.json(
community
)


}

catch(error){

console.log(error)

res.status(500).json({

message:"Server error"

})

}

}