import mongoose, { Schema } from "mongoose"


const PostSchema = new Schema(

{

community:{

type:mongoose.Schema.Types.ObjectId,

ref:"Community",

required:false

},


user:{

type:mongoose.Schema.Types.ObjectId,

ref:"User",

required:true

},


content:{

type:String,

default:"",

trim:true

},


image:{

type:String,

required:false

},


likes:[

{

type:mongoose.Schema.Types.ObjectId,

ref:"User"

}

],


comments:[

{

user:{

type:mongoose.Schema.Types.ObjectId,

ref:"User"

},

text:String,


createdAt:{

type:Date,

default:Date.now

}

}

]


},

{

timestamps:true

}

)


export default mongoose.model(
"Post",
PostSchema
)
