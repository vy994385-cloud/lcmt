import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import { connectDatabase } from "./config/database"
import authRoutes from "./routes/authRoutes"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: "http://localhost:5173",
  })
)

app.use(express.json())

app.use("/api/auth", authRoutes)

app.get("/api/status", (req, res) => {
  res.json({
    message: "LCMT Backend Running ❤️",
    database: "Connected",
  })
})

async function startServer() {
  await connectDatabase()

  app.listen(PORT, () => {
    console.log(`🚀 LCMT Backend running on port ${PORT}`)
  })
}

startServer()