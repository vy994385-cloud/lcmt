import mongoose from "mongoose"


const communitySchema = new mongoose.Schema(

{

  name: {

    type:String,

    required:true

  },


  description: {

    type:String,

    required:true

  },


  category: {

    type:String,

    required:true

  },


  icon: {

    type:String,

    default:"🌍"

  },


  members:[

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
  "Community",
  communitySchema
)