import express from "express"

import {
  discoverUsers,
  likeUser,
  getMatches,
} from "../controllers/userController"

import { protect } from "../middleware/authMiddleware"

const router = express.Router()

// User Discovery

router.get(
  "/discover",
  protect,
  discoverUsers
)

// Temporary (Legacy Dating APIs)

router.post(
  "/like/:id",
  protect,
  likeUser
)

router.get(
  "/matches",
  protect,
  getMatches
)

// Development

router.get(
  "/test/:id",
  async (req, res) => {

    const User =
      (await import("../models/User")).default

    const user =
      await User.findById(req.params.id)

    res.json({

      found: !!user,

      user

    })

  }
)

export default router