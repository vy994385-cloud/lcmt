import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      default: 18,
    },

    gender: {
      type: String,
      default: "",
    },

    college: {
      type: String,
      default: "",
    },

    course: {
      type: String,
      default: "",
    },

    year: {
      type: Number,
      default: 1,
    },

    bio: {
      type: String,
      default: "",
    },

    interests: {
      type: [String],
      default: [],
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("User", userSchema)