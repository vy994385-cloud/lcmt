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


    // Basic Profile

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


    // About User

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


    // LCMT Compatibility System

    lookingFor: {
      type: String,
      default: "",
    },

    values: {
      type: [String],
      default: [],
    },

    personality: {
      type: String,
      default: "",
    },

    answers: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

  },
  {
    timestamps: true,
  }
)

export default mongoose.model("User", userSchema)