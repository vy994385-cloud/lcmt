import express from "express"

import { protect } from "../middleware/authMiddleware"

import {
  sendMessage,
  getConversation,
  getInbox,
  getChatUsers
} from "../controllers/chatController"



const router = express.Router()



// Inbox
router.get(
  "/",
  protect,
  getInbox
)


// Search users
router.get(
  "/users",
  protect,
  getChatUsers
)


// Conversation
router.get(
  "/:id",
  protect,
  getConversation
)


// Send message
router.post(
  "/send/:id",
  protect,
  sendMessage
)



export default router