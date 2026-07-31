import { Response } from "express"

import Group from "../models/Group"

import Community from "../models/Community"

import { AuthRequest } from "../middleware/authMiddleware"



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

visibility,

rules

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








// JOIN PUBLIC GROUP

export async function joinGroup(
req:AuthRequest,
res:Response
){

try{


const userId =
String(req.userId)



const group =
await Group.findById(
req.params.id
)



if(!group){

return res.status(404).json({

message:"Group not found"

})

}




if(group.isPublic === false){

return res.status(403).json({

message:"Private group. Request access."

})

}




const exists =

group.members.some(

(member:any)=>

String(member)===userId

)



if(!exists){

group.members.push(
userId as any
)

await group.save()

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







// LEAVE GROUP

export async function leaveGroup(
req:AuthRequest,
res:Response
){

try{


const group =

await Group.findById(
req.params.id
)



if(!group){

return res.status(404).json({

message:"Group not found"

})

}



group.members =

group.members.filter(

(member:any)=>

String(member)!==
String(req.userId)

)



await group.save()



res.json({

message:"Left group"

})


}

catch(error){

console.log(error)


res.status(500).json({

message:"Server error"

})

}

}

// REMOVE MEMBER

export async function removeGroupMember(
req:AuthRequest,
res:Response
){

try{


const group =
await Group.findById(
req.params.id
)


if(!group){

return res.status(404).json({

message:"Group not found"

})

}



const isAdmin =

String(group.owner) ===
String(req.userId)

||

group.admins.some(

(admin:any)=>

String(admin) ===
String(req.userId)

)



if(!isAdmin){

return res.status(403).json({

message:"Admin access required"

})

}



group.members =

group.members.filter(

(member:any)=>

String(member)!==
String(req.params.userId)

)



await group.save()


res.json({

message:"Member removed",

group

})


}

catch(error){

console.log(error)

res.status(500).json({

message:"Server error"

})

}

}







// PROMOTE MEMBER

export async function promoteMember(
req:AuthRequest,
res:Response
){

try{


const group =
await Group.findById(
req.params.id
)



if(!group){

return res.status(404).json({

message:"Group not found"

})

}



const isOwner =

String(group.owner) ===
String(req.userId)



if(!isOwner){

return res.status(403).json({

message:"Only owner can promote admins"

})

}



const exists =

group.admins.some(

(admin:any)=>

String(admin) ===
String(req.params.userId)

)



if(!exists){

group.admins.push(
req.params.userId as any
)

}



await group.save()



res.json({

message:"Member promoted",

group

})


}

catch(error){

console.log(error)

res.status(500).json({

message:"Server error"

})

}

}







// DEMOTE ADMIN

export async function demoteMember(
req:AuthRequest,
res:Response
){

try{


const group =
await Group.findById(
req.params.id
)



if(!group){

return res.status(404).json({

message:"Group not found"

})

}



if(
String(group.owner)!==
String(req.userId)
){

return res.status(403).json({

message:"Only owner can remove admin"

})

}



group.admins =

group.admins.filter(

(admin:any)=>

String(admin)!==
String(req.params.userId)

)



await group.save()



res.json({

message:"Admin removed",

group

})


}

catch(error){

console.log(error)

res.status(500).json({

message:"Server error"

})

}

}








// TRANSFER OWNERSHIP

export async function transferOwnership(
req:AuthRequest,
res:Response
){

try{


const group =
await Group.findById(
req.params.id
)



if(!group){

return res.status(404).json({

message:"Group not found"

})

}



if(
String(group.owner)!==
String(req.userId)
){

return res.status(403).json({

message:"Only owner can transfer ownership"

})

}




group.owner =
req.params.userId as any



if(

!group.admins.some(

(admin:any)=>

String(admin)===
String(req.params.userId)

)

){

group.admins.push(
req.params.userId as any
)

}



await group.save()



res.json({

message:"Ownership transferred",

group

})


}

catch(error){

console.log(error)

res.status(500).json({

message:"Server error"

})

}

}