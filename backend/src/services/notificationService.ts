import Notification from "../models/Notification"

import { sendNotificationSocket } from "./notificationSocket"

interface CreateNotificationData{

receiver:string

sender?:string

type:
| "follow"
| "friend_request"
| "friend_accept"
| "community_invite"
| "community_join"
| "community_post"
| "community_announcement"
| "post_like"
| "post_comment"
| "post_reply"
| "mention"
| "message"
| "system"

title:string

message:string

referenceId?:string

post?:string

community?:string

}

export async function createNotification(
data:CreateNotificationData
){

try{

const notification=
await Notification.create({

receiver:data.receiver,

sender:data.sender,

type:data.type,

title:data.title,

message:data.message,

referenceId:
data.referenceId || null,

post:
data.post || null,

community:
data.community || null

})

sendNotificationSocket(
data.receiver,
notification
)

return notification

}
catch(error){

console.log(
"Notification error:",
error
)

return null

}

}

export async function getNotifications(
userId:string
){

return await Notification.find({

receiver:userId

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

}

export async function markNotificationRead(
id:string
){

return await Notification.findByIdAndUpdate(

id,

{

read:true

},

{

new:true

}

)

}