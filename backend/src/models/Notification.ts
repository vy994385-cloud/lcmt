import mongoose from "mongoose"


const notificationSchema =
new mongoose.Schema(

{

receiver:{

type:
mongoose.Schema.Types.ObjectId,

ref:"User",

required:true

},


sender:{

type:
mongoose.Schema.Types.ObjectId,

ref:"User"

},


type:{

type:String,

enum:[

"follow",

"friend_request",

"friend_accept",

"community_invite",

"community_join",

"community_post",

"community_announcement",

"post_like",

"post_comment",

"post_reply",

"mention",

"message",

"system"

],

required:true

},


title:{

type:String,

required:true

},


message:{

type:String,

default:""

},


post:{

type:
mongoose.Schema.Types.ObjectId,

ref:"Post"

},


community:{

type:
mongoose.Schema.Types.ObjectId,

ref:"Community"

},


referenceId:{

type:
mongoose.Schema.Types.ObjectId,

default:null

},


read:{

type:Boolean,

default:false

}

},

{

timestamps:true

}

)


notificationSchema.index({

receiver:1,

read:1,

createdAt:-1

})


export default mongoose.model(
"Notification",
notificationSchema
)