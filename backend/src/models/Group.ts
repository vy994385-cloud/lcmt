import mongoose from "mongoose"


const groupSchema = new mongoose.Schema(

{

name:{

type:String,

required:true,

trim:true

},


description:{

type:String,

default:""

},


image:{

type:String,

default:""

},


// parent community

community:{

type:mongoose.Schema.Types.ObjectId,

ref:"Community",

required:true

},



// public/private room

isPublic:{

type:Boolean,

default:true

},



// room category

type:{

type:String,

enum:[

"chat",

"voice",

"debate",

"fanclub",

"discussion"

],

default:"chat"

},



owner:{

type:mongoose.Schema.Types.ObjectId,

ref:"User",

required:true

},



admins:[

{

type:mongoose.Schema.Types.ObjectId,

ref:"User"

}

],



members:[

{

type:mongoose.Schema.Types.ObjectId,

ref:"User"

}

],



lastMessage:{

type:mongoose.Schema.Types.ObjectId,

ref:"Message",

default:null

}

},


{

timestamps:true

}

)



export default mongoose.model(
"Group",
groupSchema
)