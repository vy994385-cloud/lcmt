import { Response } from "express"

import Group from "../../models/Group"

import {
 AuthRequest
} from "../../middleware/authMiddleware"



// JOIN GROUP

export async function joinGroup(
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


if(!group.isPublic){

return res.status(403).json({

message:"Private group. Request access."

})

}



const userId =
String(req.userId)



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



const admin =

String(group.owner) ===
String(req.userId)

||

group.admins.some(

(a:any)=>

String(a)===String(req.userId)

)



if(!admin){

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