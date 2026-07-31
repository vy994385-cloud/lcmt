import mongoose from "mongoose"

const groupMessageSchema =
new mongoose.Schema({

group:{

type:mongoose.Schema.Types.ObjectId,

ref:"Group",

required:true

},

sender:{

type:mongoose.Schema.Types.ObjectId,

ref:"User",

required:true

},

text:{

type:String,

default:""

},

image:String,

video:String,

audio:String,

file:String,

fileName:String,

replyTo:{

type:mongoose.Schema.Types.ObjectId,

ref:"GroupMessage"

},

edited:{

type:Boolean,

default:false

},

deleted:{

type:Boolean,

default:false

},

reactions:[

{

user:{

type:mongoose.Schema.Types.ObjectId,

ref:"User"

},

emoji:String

}

],

readBy:[

{

type:mongoose.Schema.Types.ObjectId,

ref:"User"

}

]

},

{

timestamps:true

}

)

export default mongoose.model(

"GroupMessage",

groupMessageSchema

)