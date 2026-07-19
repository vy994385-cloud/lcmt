import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import { connectDatabase } from "./config/database"

import authRoutes from "./routes/authRoutes"
import profileRoutes from "./routes/profileRoutes"
import userRoutes from "./routes/userRoutes"
import chatRoutes from "./routes/chatRoutes"
import communityRoutes from "./routes/communityRoutes"
import postRoutes from "./routes/postRoutes"
import communityPostRoutes from "./routes/communityPostRoutes"

import User from "./models/User"
import feedRoutes from "./routes/feedRoutes"


dotenv.config()


const app = express()

const PORT = process.env.PORT || 5000



app.use(
  cors({
    origin(origin, callback) {

      if (
        !origin ||
        origin.startsWith("http://localhost:") ||
        origin === "https://lcmt.vercel.app" ||
        origin === "https://lcmt1.vercel.app"
      ) {

        callback(null, true)

      } else {

        callback(
          new Error("Not allowed by CORS")
        )

      }

    },

    credentials: true,

  })
)



app.use(express.json())




// Routes


app.use(
  "/api/auth",
  authRoutes
)



app.use(
  "/api",
  profileRoutes
)



app.use(
  "/api/users",
  userRoutes
)



app.use(
  "/api/chat",
  chatRoutes
)



// Communities

app.use(
  "/api/communities",
  communityRoutes
)

app.use("/api/posts", postRoutes)


// Community posts

app.use(
  "/api/communities",
  communityPostRoutes
)

app.use("/api/feed", feedRoutes)




// Status route

app.get(
  "/api/status",
  (_req, res)=>{

    res.json({

      message:
      "LCMT Backend Running ❤️",

      database:
      "Connected"

    })

  }
)






// Available routes

app.get(
  "/api/routes",
  (_req,res)=>{

    res.json({

      routes:[

        "/api/status",

        "/api/auth/signup",
        "/api/auth/login",

        "/api/profile",
        "/api/profile/me",

        "/api/users/discover",
        "/api/users/like/:id",
        "/api/users/matches",

        "/api/chat",
        "/api/chat/:id",
        "/api/chat/send/:id",

        "/api/communities",
        "/api/communities/:id/join",

        "/api/communities/:id/posts"

      ]

    })

  }
)






// Temporary test route

app.get(
  "/api/test-users",
  async (_req,res)=>{

    try{

      const users =
        await User.find()
        .select(
          "name email"
        )


      res.json(users)


    }
    catch(error){

      console.log(error)


      res.status(500)
      .json({
        message:"Error"
      })

    }

  }
)








async function startServer(){

  await connectDatabase()


  app.listen(
    PORT,
    ()=>{

      console.log(
        `🚀 LCMT Backend running on port ${PORT}`
      )

    }
  )

}



startServer()