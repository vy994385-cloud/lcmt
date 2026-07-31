import express from "express"

import {
getNotifications,
markNotificationRead,
markAllRead,
getUnreadCount
} from "../controllers/notificationController"

import {
protect
} from "../middleware/authMiddleware"



const router =
express.Router()



router.get(
"/",
protect,
getNotifications
)



router.get(
"/unread-count",
protect,
getUnreadCount
)



router.patch(
"/:id/read",
protect,
markNotificationRead
)



router.patch(
"/read-all",
protect,
markAllRead
)



export default router