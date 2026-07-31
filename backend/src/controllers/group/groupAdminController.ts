import { Response } from "express"

import Group from "../../models/Group"

import {
 AuthRequest
} from "../../middleware/authMiddleware"




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



if(
String(group.owner)!==
String(req.userId)
){

return res.status(403).json({

message:"Only owner can promote admins"

})

}



const exists =
group.admins.some(

(admin:any)=>

String(admin)===
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








// DEMOTE MEMBER

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

message:"Only owner can remove admins"

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