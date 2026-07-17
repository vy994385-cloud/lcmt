import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import { connectDatabase } from "./config/database"
import authRoutes from "./routes/authRoutes"
import profileRoutes from "./routes/profileRoutes"
import userRoutes from "./routes/userRoutes"

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
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  })
)

app.use(express.json())


// Routes
app.use("/api/auth", authRoutes)

app.use("/api", profileRoutes)

app.use("/api/users", userRoutes)


app.get("/api/status", (req, res) => {
  res.json({
    message: "LCMT Backend Running ❤️",
    database: "Connected",
  })
})


app.get("/api/routes", (_req, res) => {
  res.json({
    routes: [
      "/api/status",
      "/api/auth/signup",
      "/api/auth/login",
      "/api/profile",
      "/api/profile/me",
      "/api/users/discover",
      "/api/users/like/:id",
    ],
  })
})


async function startServer() {
  await connectDatabase()

  app.listen(PORT, () => {
    console.log(`🚀 LCMT Backend running on port ${PORT}`)
  })
}


startServer()