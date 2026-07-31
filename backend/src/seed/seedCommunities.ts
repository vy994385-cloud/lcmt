import dotenv from "dotenv"
import mongoose from "mongoose"

import Community from "../models/Community"

dotenv.config()

async function seed() {

  try {

    await mongoose.connect(
      process.env.MONGO_URI!
    )

    console.log("MongoDB Connected")

    await Community.deleteMany({})

    const communities = [

      {
        name:"Cricket",
        category:"Sports",
        icon:"🏏",
        description:"Everything about international cricket, IPL, domestic cricket and discussions.",
        tags:["cricket","ipl","sports"],
        isPublic:true
      },

      {
        name:"Football",
        category:"Sports",
        icon:"⚽",
        description:"Premier League, La Liga, Champions League and more.",
        tags:["football","sports"],
        isPublic:true
      },

      {
        name:"Artificial Intelligence",
        category:"Technology",
        icon:"🤖",
        description:"AI, LLMs, Machine Learning and future technology.",
        tags:["ai","machine learning","technology"],
        isPublic:true
      },

      {
        name:"Programming",
        category:"Technology",
        icon:"💻",
        description:"Coding discussions, projects, careers and learning.",
        tags:["coding","programming","development"],
        isPublic:true
      },

      {
        name:"Gaming",
        category:"Entertainment",
        icon:"🎮",
        description:"PC, PlayStation, Xbox, Mobile and Esports.",
        tags:["gaming","esports"],
        isPublic:true
      },

      {
        name:"Movies",
        category:"Entertainment",
        icon:"🎬",
        description:"Hollywood, Bollywood and world cinema.",
        tags:["movies","films"],
        isPublic:true
      },

      {
        name:"Music",
        category:"Entertainment",
        icon:"🎵",
        description:"Artists, albums, concerts and playlists.",
        tags:["music"],
        isPublic:true
      },

      {
        name:"Anime",
        category:"Entertainment",
        icon:"🎌",
        description:"Anime, manga and fan discussions.",
        tags:["anime","manga"],
        isPublic:true
      },

      {
        name:"Photography",
        category:"Creative",
        icon:"📷",
        description:"Photography tips, cameras and editing.",
        tags:["photography"],
        isPublic:true
      },

      {
        name:"Startups",
        category:"Business",
        icon:"🚀",
        description:"Build companies, products and ideas together.",
        tags:["startup","business"],
        isPublic:true
      }

    ]

    await Community.insertMany(communities)

    console.log("Communities seeded successfully.")

    process.exit(0)

  } catch (error) {

    console.error(error)

    process.exit(1)

  }

}

seed()