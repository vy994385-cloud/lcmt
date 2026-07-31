import { Response } from "express"
import { AuthRequest } from "../middleware/authMiddleware"
import Story from "../models/Story"

export async function getStories(
  _req: AuthRequest,
  res: Response
) {
  try {

    const stories =
      await Story.find()
        .populate(
          "user",
          "name image"
        )
        .sort({
          createdAt: -1,
        })

    res.json(stories)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server error",
    })

  }
}

export async function createStory(
  req: AuthRequest,
  res: Response
) {
  try {

    const story =
      await Story.create({

        ...req.body,

        user: req.userId,

      })

    res.status(201).json(story)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Unable to create story",
    })

  }
}

export async function viewStory(
  req: AuthRequest,
  res: Response
) {
  try {

    const story =
      await Story.findById(
        req.params.id
      )

    if (!story) {

      return res.status(404).json({
        message: "Story not found",
      })

    }

    const userId =
      String(req.userId)

    if (
      !story.viewers.some(
        viewer =>
          String(viewer) === userId
      )
    ) {

      story.viewers.push(
        req.userId as any
      )

      await story.save()

    }

    res.json(story)

  } catch {

    res.status(500).json({
      message: "Server error",
    })

  }
}

export async function reactStory(
  req: AuthRequest,
  res: Response
) {
  try {

    const story =
      await Story.findById(
        req.params.id
      )

    if (!story) {

      return res.status(404).json({
        message: "Story not found",
      })

    }

    story.reactions.push({

      user: req.userId as any,

      emoji:
        req.body.emoji || "❤️",

    })

    await story.save()

    res.json(story)

  } catch {

    res.status(500).json({
      message: "Server error",
    })

  }
}

export async function deleteStory(
  req: AuthRequest,
  res: Response
) {
  try {

    await Story.findByIdAndDelete(
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