import mongoose, { Document } from "mongoose"

const userSchema = new mongoose.Schema(
  {
    // Authentication

    name: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      unique: true,
      sparse: true,
      default: "",
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

    // Profile

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

    headline: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    coverImage: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    // Interests

    interests: {
      type: [String],
      default: [],
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

    // Social Graph

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    friendRequestsReceived: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
],

friendRequestsSent: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
],

    communities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
      },
    ],

    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

    blockedUsers: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
],

verified: {
  type: Boolean,
  default: false,
},

profileVisibility: {
  type: String,
  enum: [
    "public",
    "friends",
    "private",
  ],
  default: "public",
},

    // Temporary (keep until controllers are migrated)

    lookingFor: {
      type: String,
      default: "",
    },

    likedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    matchedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Chat

    isOnline: {
      type: Boolean,
      default: false,
    },

    lastSeen: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

export interface IUser extends Document {
  name: string
  username: string
  email: string
  password: string

  age: number
  gender: string
  college: string
  course: string
  year: number

  headline: string
  bio: string
  image: string
  coverImage: string
  location: string
  website: string

  interests: string[]
  values: string[]
  personality: string
  answers: any

  followers: mongoose.Types.ObjectId[]
  following: mongoose.Types.ObjectId[]
  friends: mongoose.Types.ObjectId[]
  friendRequestsReceived: mongoose.Types.ObjectId[]
friendRequestsSent: mongoose.Types.ObjectId[]
  communities: mongoose.Types.ObjectId[]
  savedPosts: mongoose.Types.ObjectId[]
  blockedUsers: mongoose.Types.ObjectId[]

verified: boolean

profileVisibility: string

  // Temporary
  lookingFor: string
  likedUsers: mongoose.Types.ObjectId[]
  matchedUsers: mongoose.Types.ObjectId[]

  isOnline: boolean
  lastSeen: Date
}

export default mongoose.model<IUser>("User", userSchema)