import { Response } from "express"

import Notification from "../models/Notification"

import { AuthRequest } from "../middleware/authMiddleware"



// Get my notifications

export async function getNotifications(
req:AuthRequest,
res:Response
){

try{


if(!req.userId){

return res.status(401).json({
message:"Unauthorized"
})

}



const notifications =
await Notification.find({
receiver:req.userId
})

.populate(
"sender",
"name image username"
)

.populate(
"community",
"name icon"
)

.populate(
"post",
"_id"
)
.sort({
createdAt:-1
})



const unread =
notifications.filter(
(item)=>!item.read
).length

res.json({

notifications,

unread

})



}
catch(error){

console.log(error)

res.status(500).json({
message:"Server Error"
})

}

}








// Mark notification as read

export async function markNotificationRead(
req:AuthRequest,
res:Response
){

try{


await Notification.findOneAndUpdate(

{
_id:req.params.id,
receiver:req.userId
},

{
read:true
}

)



res.json({

success:true

})


}
catch(error){

console.log(error)

res.status(500).json({
message:"Server Error"
})

}


}








// Mark all as read

export async function markAllRead(
req:AuthRequest,
res:Response
){

try{


await Notification.updateMany(

{
receiver:req.userId
},

{
read:true
}

)



res.json({

success:true

})


}
catch(error){

console.log(error)

res.status(500).json({
message:"Server Error"
})

}

}

// Get unread notification count

export async function getUnreadCount(
req:AuthRequest,
res:Response
){

try{


if(!req.userId){

return res.status(401).json({
message:"Unauthorized"
})

}



const count =
await Notification.countDocuments({

receiver:req.userId,

read:false

})



res.json({

count

})


}

catch(error){

console.log(error)

res.status(500).json({
message:"Server Error"
})

}


}