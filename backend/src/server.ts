import express from "express"
import http from "http"
import { Server } from "socket.io"

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
import { setIO } from "./socket"
import socialRoutes from "./routes/socialRoutes"
import friendRoutes from "./routes/friendRoutes"

dotenv.config()


const app = express()

const server = http.createServer(app)

const PORT = process.env.PORT || 5000



app.use(
  cors({

    origin(origin, callback){

      if(
        !origin ||
        origin.startsWith("http://localhost:") ||
        origin === "https://lcmt.vercel.app" ||
        origin === "https://lcmt1.vercel.app"
      ){

        callback(null,true)

      }
      else{

        callback(
          new Error("Not allowed by CORS")
        )

      }

    },

    credentials:true,

    allowedHeaders:[
      "Content-Type",
      "Authorization"
    ],

    methods:[
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS"
    ]

  })
)



const io = new Server(
  server,
  {

    cors:{

      origin:[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://lcmt.vercel.app",
        "https://lcmt1.vercel.app"
      ],

      methods:[
        "GET",
        "POST"
      ],

      credentials:true

    }

  }
)



setIO(io)



app.use(
  express.json()
)





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
  "/api/social",
  socialRoutes
)

app.use(
  "/api/chat",
  chatRoutes
)



app.use(
  "/api/communities",
  communityRoutes
)



app.use(
  "/api/posts",
  postRoutes
)



app.use(
  "/api/communities",
  communityPostRoutes
)



app.use(
  "/api/feed",
  feedRoutes
)

app.use(
"/api/friends",
friendRoutes
)







// Status

app.get(
  "/api/status",
  (_req,res)=>{

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

      

       routes: [

  "/api/status",

  "/api/auth/signup",
  "/api/auth/login",

  "/api/profile",
  "/api/profile/me",

  "/api/users/discover",

  "/api/social/follow/:id",
  "/api/social/unfollow/:id",
  "/api/social/followers/:id",
  "/api/social/following/:id",
  "/api/social/friends/:id",
  "/api/social/friend-request/:id",

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








// Test users

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








// Socket

io.on(
  "connection",
  (socket)=>{


    console.log(
      "🟢 User connected:",
      socket.id
    )





    // Join user room

    socket.on(
      "join",
      async(userId:string)=>{


        socket.join(
          userId
        )


        socket.data.userId =
          userId



        await User.findByIdAndUpdate(
          userId,
          {
            isOnline:true
          }
        )



        console.log(
          `👤 ${userId} joined room`
        )



        io.emit(
          "user-online",
          userId
        )


      }
    )







    // Typing indicator

    socket.on(
      "typing",
      (data)=>{


        io.to(
          data.receiver
        )
        .emit(
          "typing",
          {
            sender:data.sender
          }
        )


      }
    )








    // Disconnect

    socket.on(
      "disconnect",
      async()=>{


        const userId =
          socket.data.userId



        if(userId){


          await User.findByIdAndUpdate(
            userId,
            {

              isOnline:false,

              lastSeen:new Date()

            }
          )



          console.log(
            `🔴 ${userId} offline`
          )



          io.emit(
            "user-offline",
            {

              userId,

              lastSeen:new Date()

            }
          )


        }



        console.log(
          "🔴 User disconnected:",
          socket.id
        )


      }
    )



  }
)








async function startServer(){


  await connectDatabase()



  server.listen(
    PORT,
    ()=>{


      console.log(
        `🚀 LCMT Backend running on port ${PORT}`
      )


    }
  )


}



startServer()