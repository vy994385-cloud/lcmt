import { Response } from "express"
import Event from "../models/Event"
import { AuthRequest } from "../middleware/authMiddleware"

export async function getEvents(
  _req: AuthRequest,
  res: Response
) {
  try {

    const events = await Event.find()
      .populate(
        "createdBy",
        "name image"
      )
      .sort({
        startTime: 1,
      })

    res.json(events)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server error",
    })

  }
}

export async function getEvent(
  req: AuthRequest,
  res: Response
) {
  try {

    const event = await Event.findById(
      req.params.id
    )
      .populate(
        "createdBy",
        "name image"
      )
      .populate(
        "attendees",
        "name image"
      )

    if (!event) {

      return res.status(404).json({
        message: "Event not found",
      })

    }

    res.json(event)

  } catch {

    res.status(500).json({
      message: "Server error",
    })

  }
}

export async function createEvent(
  req: AuthRequest,
  res: Response
) {
  try {

    const event = await Event.create({

      ...req.body,

      createdBy: req.userId,

    })

    res.status(201).json(event)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Unable to create event",
    })

  }
}

export async function joinEvent(
  req: AuthRequest,
  res: Response
) {
  try {

    const event =
      await Event.findById(
        req.params.id
      )

    if (!event) {

      return res.status(404).json({
        message: "Event not found",
      })

    }

    const id = String(req.userId)

    if (
      !event.attendees.some(
        user => String(user) === id
      )
    ) {

      event.attendees.push(req.userId as any)

      await event.save()

    }

    res.json(event)

  } catch {

    res.status(500).json({
      message: "Server error",
    })

  }
}

export async function leaveEvent(
  req: AuthRequest,
  res: Response
) {
  try {

    const event =
      await Event.findById(
        req.params.id
      )

    if (!event) {

      return res.status(404).json({
        message: "Event not found",
      })

    }

    event.attendees =
      event.attendees.filter(
        user =>
          String(user) !==
          String(req.userId)
      )

    await event.save()

    res.json(event)

  } catch {

    res.status(500).json({
      message: "Server error",
    })

  }
}

export async function deleteEvent(
  req: AuthRequest,
  res: Response
) {
  try {

    await Event.findByIdAndDelete(
      req.params.id
    )

    res.json({
      message: "Deleted",
    })

  } catch {

    res.status(500).json({
      message: "Server error",
    })

  }
}