import { Response } from "express"

import { AuthRequest } from "../middleware/authMiddleware"

import { getExploreData } from "../services/exploreService"

export async function explore(
  req: AuthRequest,
  res: Response
) {

  try {

    const data =
      await getExploreData(req.userId)

    return res.json(data)

  }

  catch (error) {

    console.error(error)

    return res.status(500).json({

      message:
        "Failed to load explore data"

    })

  }

}