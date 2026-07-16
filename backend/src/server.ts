import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import { connectDatabase } from "./config/database"
import authRoutes from "./routes/authRoutes"
import profileRoutes from "./routes/profileRoutes"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: [
  "http://localhost:5173",
  "http://localhost:5175",
  "https://lcmt.vercel.app",
  "https://lcmt1.vercel.app",
],
  })
)

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api", profileRoutes)

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
      "/api/users",
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