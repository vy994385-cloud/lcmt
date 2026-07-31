import mongoose from "mongoose"

const commentSchema = new mongoose.Schema(

{

user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

text:{
type:String,
required:true,
trim:true
},

likes:[
{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}
],

createdAt:{
type:Date,
default:Date.now
}

},

{
_id:true
}

)

const pollOptionSchema = new mongoose.Schema(

{

text:{
type:String,
required:true
},

votes:[
{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}
]

},

{
_id:true
}

)

const communityPostSchema = new mongoose.Schema(

{

community:{
type:mongoose.Schema.Types.ObjectId,
ref:"Group",
required:true
},

author:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

text:{
type:String,
default:"",
trim:true
},

images:[
String
],

videos:[
String
],

files:[
String
],

type:{
type:String,
enum:[
"text",
"image",
"video",
"poll",
"question",
"file"
],
default:"text"
},

pollQuestion:{
type:String,
default:""
},

pollOptions:[
pollOptionSchema
],

likes:[
{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}
],

savedBy:[
{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}
],

comments:[
commentSchema
],

tags:[
String
],

pinned:{
type:Boolean,
default:false
},

shares:{
type:Number,
default:0
},

views:{
type:Number,
default:0
}

},

{

timestamps:true

}

)

export default mongoose.model(

"CommunityPost",

communityPostSchema

)