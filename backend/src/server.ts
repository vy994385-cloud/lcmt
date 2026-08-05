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


import User from "./models/User"
import feedRoutes from "./routes/feedRoutes"
import { setIO } from "./socket"

import friendRoutes from "./routes/friendRoutes"
import networkRoutes from "./routes/networkRoutes"
import followRoutes from "./routes/followRoutes"
import socialRoutes from "./routes/socialRoutes"
import notificationRoutes from "./routes/notificationRoutes"
import path from "path"
import mediaRoutes from "./routes/mediaRoutes"
import groupRoutes from "./routes/groupRoutes"
import groupMessageRoutes from "./routes/groupMessageRoutes"
import voiceRoutes from "./routes/voiceRoutes"
import reactionRoutes from "./routes/reactionRoutes"
import eventRoutes from "./routes/eventRoutes"
import storyRoutes from "./routes/storyRoutes"

import { registerGroupSocket }
from "./socket/groups/groupSocket"

import communityFeedRoutes from "./routes/communityFeedRoutes"

import exploreRoutes from "./routes/exploreRoutes"

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
  "PATCH",
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
  express.json({
    limit:"5mb"
  })
)

app.use(
  express.urlencoded({
    extended:true,
    limit:"5mb"
  })
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
  "/api/feed",
  feedRoutes
)

app.use(
"/api/friends",
friendRoutes
)

app.use("/api/follow", followRoutes)

app.use(
  "/api/social",
  socialRoutes
)

app.use("/api/network", networkRoutes)

app.use(
"/api/notifications",
notificationRoutes
)

app.use(
  "/api/group-messages",
  groupMessageRoutes
)

app.use(
  "/api/voice",
  voiceRoutes
)

app.use(
  "/api/explore",
  exploreRoutes
)

app.use(
  "/uploads",
  express.static(
    path.join(
      process.cwd(),
      "src/uploads"
    )
  )
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

app.use(
  "/api/media",
  mediaRoutes
)


app.use(
  "/api/groups",
  groupRoutes
)

app.use(
  "/api/reactions",
  reactionRoutes
)

app.use(
  "/api/events",
  eventRoutes
)

app.use(
  "/api/stories",
  storyRoutes
)

app.use(
  "/api/community-feed",
  communityFeedRoutes
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

  "/api/friends/request/:id",
  "/api/friends/accept/:id",
  "/api/friends/reject/:id",

  "/api/follow/:id",
  "/api/follow/followers/:id",
  "/api/follow/following/:id",

  "/api/network",

  "/api/chat",
  "/api/chat/:id",
  "/api/chat/send/:id",

  "/api/communities",
  "/api/communities/:id/join",
  "/api/community-feed/:communityId",
"/api/community-feed/:communityId (POST)",
"/api/community-feed/like/:postId",
"/api/community-feed/comment/:postId",
"/api/community-feed/save/:postId",
"/api/community-feed/pin/:postId",

"/api/notifications",
"/api/notifications/unread-count",
"/api/notifications/:id/read",
"/api/notifications/read-all",

  "/api/groups",
"/api/groups/:id",
"/api/groups/:id/join",
"/api/groups/:id/leave",

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

    registerGroupSocket(io,socket)

    console.log("🟢 User connected:", socket.id)

    socket.on(
  "join-group",
  (groupId:string)=>{

    socket.join(
      `group:${groupId}`
    )

    console.log(
      `Joined group ${groupId}`
    )

  }
)


socket.on(
  "leave-group",
  (groupId:string)=>{

    socket.leave(
      `group:${groupId}`
    )

    console.log(
      `Left group ${groupId}`
    )

  }
)


socket.on(
  "group-typing",
  (data)=>{

    socket
      .to(`group:${data.groupId}`)
      .emit(
        "group-typing",
        data
      )

  }
)

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