import express from "express"

import { protect } from "../middleware/authMiddleware"

import {
  sendMessage,
  getConversation,
  getInbox,
  getChatUsers,
  markConversationRead,
  getUnreadCount,
  editMessage,
  deleteMessage,
  toggleStarMessage,
  reactToMessage,
} from "../controllers/chatController"

const router = express.Router()

// Inbox
router.get(
  "/",
  protect,
  getInbox
)

// Total unread messages
router.get(
  "/unread/count",
  protect,
  getUnreadCount
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

// Mark conversation as read
router.put(
  "/read/:id",
  protect,
  markConversationRead
)
// Edit message
router.patch(
  "/message/:id/edit",
  protect,
  editMessage
)

// Delete message
router.delete(
  "/message/:id",
  protect,
  deleteMessage
)

// Star / Unstar
router.patch(
  "/message/:id/star",
  protect,
  toggleStarMessage
)

// React to message
router.patch(
  "/message/:id/react",
  protect,
  reactToMessage
)

// Send message
router.post(
  "/send/:id",
  protect,
  sendMessage
)

export default router