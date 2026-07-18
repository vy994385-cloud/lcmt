import dotenv from "dotenv"
import mongoose from "mongoose"

import Community from "./models/Community"
import { connectDatabase } from "./config/database"


dotenv.config()



const communities = [

  {
    icon:"🤖",
    name:"AI & Machine Learning",
    description:
      "Explore AI projects, share ideas, and find teammates.",
    category:"Technology"
  },


  {
    icon:"💻",
    name:"Web Development",
    description:
      "Learn coding, build projects, and grow together.",
    category:"Technology"
  },


  {
    icon:"🚀",
    name:"Startup Builders",
    description:
      "Connect with founders and student entrepreneurs.",
    category:"Business"
  },


  {
    icon:"📸",
    name:"Photography",
    description:
      "Share creativity and capture campus moments.",
    category:"Creative"
  },


  {
    icon:"🎨",
    name:"Design Community",
    description:
      "UI/UX designers sharing ideas and feedback.",
    category:"Design"
  },


  {
    icon:"🎮",
    name:"Gaming Club",
    description:
      "Meet gamers and organize tournaments.",
    category:"Gaming"
  }

]



async function seed(){

  try{

    await connectDatabase()


    await Community.deleteMany()


    await Community.insertMany(
      communities
    )


    console.log(
      "Communities seeded successfully 🌱"
    )


    process.exit()


  }
  catch(error){

    console.log(error)

    process.exit(1)

  }

}


seed()