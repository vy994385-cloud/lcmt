import { Router } from "express"

import { protect } from "../middleware/authMiddleware"

import {

  getEvents,
  getEvent,
  createEvent,
  joinEvent,
  leaveEvent,
  deleteEvent,

} from "../controllers/eventController"

const router = Router()

router.get(
  "/",
  protect,
  getEvents
)

router.get(
  "/:id",
  protect,
  getEvent
)

router.post(
  "/",
  protect,
  createEvent
)

router.post(
  "/:id/join",
  protect,
  joinEvent
)

router.post(
  "/:id/leave",
  protect,
  leaveEvent
)

router.delete(
  "/:id",
  protect,
  deleteEvent
)

export default router