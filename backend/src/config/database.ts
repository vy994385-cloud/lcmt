import mongoose from "mongoose"

export async function connectDatabase() {
  try {

    console.log("⏳ Connecting to MongoDB...")

    await mongoose.connect(process.env.MONGODB_URI as string)

    console.log("✅ MongoDB Connected Successfully")

  } catch (error) {

    console.error("❌ MongoDB Connection Failed")
    console.error(error)

    process.exit(1)

  }
}