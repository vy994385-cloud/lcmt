import express from "express"
import { protect } from "../middleware/authMiddleware"
import {
  sendMessage,
  getConversation,
  getInbox,
} from "../controllers/chatController"

const router = express.Router()

router.get("/", protect, getInbox)

router.get("/:id", protect, getConversation)

router.post("/send/:id", protect, sendMessage)

export default router