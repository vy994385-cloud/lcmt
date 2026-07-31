import mongoose from "mongoose"


const communitySchema =
new mongoose.Schema(

{

name:{

type:String,

required:true,

trim:true

},


slug:{

type:String,

required:true,

unique:true,

trim:true,

lowercase:true

},


verified:{

type:Boolean,

default:false

},


description:{

type:String,

default:""

},


icon:{

type:String,

default:"🌍"

},



coverImage:{

type:String,

default:""

},



category:{

type:String,

required:true

},



creator:{

type:mongoose.Schema.Types.ObjectId,

ref:"User",

required:true

},


createdBy:{

type:mongoose.Schema.Types.ObjectId,

ref:"User",

required:false

},



moderators:[

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




rules:[

{

type:String

}

],



isPublic:{

type:Boolean,

default:true

},



tags:[

{

type:String

}

]

},


{

timestamps:true

}

)



export default mongoose.model(

"Community",

communitySchema

)