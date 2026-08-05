import mongoose,{ Schema } from "mongoose"

const PostSchema = new Schema({

community:{
type:Schema.Types.ObjectId,
ref:"Community"
},

user:{
type:Schema.Types.ObjectId,
ref:"User",
required:true
},

content:{
type:String,
default:"",
trim:true
},

image:{
type:String
},

isRepost:{
type:Boolean,
default:false
},

originalPost:{
type:Schema.Types.ObjectId,
ref:"Post",
default:null
},

shareCount:{
type:Number,
default:0
},

saveCount:{
type:Number,
default:0
},

savedBy:[{
type:Schema.Types.ObjectId,
ref:"User"
}],

likes:[{
type:Schema.Types.ObjectId,
ref:"User"
}],

comments:[{

user:{
type:Schema.Types.ObjectId,
ref:"User"
},

text:String,

createdAt:{
type:Date,
default:Date.now
}

}]

},{
timestamps:true
})

export default mongoose.model(
"Post",
PostSchema
)