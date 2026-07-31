import mongoose from "mongoose"

const storySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "image",
        "video",
        "text",
      ],
      default: "image",
    },

    media: {
      type: String,
      default: "",
    },

    text: {
      type: String,
      default: "",
    },

    background: {
      type: String,
      default: "#4f46e5",
    },

    viewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    reactions: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        emoji: {
          type: String,
          default: "❤️",
        },
      },
    ],

    privacy: {
      type: String,
      enum: [
        "public",
        "followers",
        "friends",
      ],
      default: "public",
    },

    expiresAt: {
      type: Date,
      default: () =>
        new Date(
          Date.now() +
          24 * 60 * 60 * 1000
        ),
    },
  },
  {
    timestamps: true,
  }
)

storySchema.index(
  {
    expiresAt: 1,
  },
  {
    expireAfterSeconds: 0,
  }
)

export default mongoose.model(
  "Story",
  storySchema
)