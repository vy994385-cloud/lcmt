import { Response } from "express"

import Group from "../../models/Group"
import Community from "../../models/Community"

import {
 AuthRequest
} from "../../middleware/authMiddleware"



// CREATE GROUP / ROOM

export async function createGroup(
req:AuthRequest,
res:Response
){

try{


const userId =
String(req.userId)



const {

name,

description,

community,

type,

visibility

}=req.body



if(!community){

return res.status(400).json({

message:"Community required"

})

}



const parentCommunity =
await Community.findById(
community
)



if(!parentCommunity){

return res.status(404).json({

message:"Community not found"

})

}



const group =
await Group.create({

name,

description,

community,

type:
type || "discussion",

isPublic:
visibility !== "private",

owner:userId,

admins:[userId],

members:[userId]

})


res.json(group)


}

catch(error){

console.log(
"CREATE GROUP ERROR:",
error
)


res.status(500).json({

message:"Server error"

})

}

}






// GET MY GROUPS

export async function getGroups(
req:AuthRequest,
res:Response
){

try{


const groups =

await Group.find({

members:req.userId

})

.populate(
"community",
"name icon category"
)

.populate(
"members",
"name image"
)

.sort({

updatedAt:-1

})



res.json(groups)


}

catch(error){

console.log(error)


res.status(500).json({

message:"Server error"

})

}

}







// GET SINGLE GROUP

export async function getGroupById(
req:AuthRequest,
res:Response
){

try{


const group =

await Group.findById(
req.params.id
)

.populate(
"community",
"name icon"
)

.populate(
"members",
"name image"
)



if(!group){

return res.status(404).json({

message:"Group not found"

})

}



res.json(group)


}

catch(error){

console.log(error)


res.status(500).json({

message:"Server error"

})

}

}