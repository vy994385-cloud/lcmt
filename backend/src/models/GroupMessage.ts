import mongoose,{
  Schema,
  Types,
  HydratedDocument
} from "mongoose"

export interface IGroupMessage{

  group:Types.ObjectId

  sender:Types.ObjectId

  text:string

  type:
    | "text"
    | "voice"
    | "file"
    | "video"

  url?:string

  createdAt?:Date

  updatedAt?:Date

}

export type GroupMessageDocument =
HydratedDocument<IGroupMessage>

const GroupMessageSchema =
new Schema<IGroupMessage>(

{

  group:{
    type:Schema.Types.ObjectId,
    ref:"Group",
    required:true
  },

  sender:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  text:{
    type:String,
    default:""
  },

  type:{
    type:String,
    enum:[
      "text",
      "voice",
      "file",
      "video"
    ],
    default:"text"
  },

  url:{
    type:String
  }

},

{
  timestamps:true
}

)

export default mongoose.model<IGroupMessage>(
  "GroupMessage",
  GroupMessageSchema
)