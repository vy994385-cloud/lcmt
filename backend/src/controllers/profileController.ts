import { Response } from "express"
import User from "../models/User"
import { AuthRequest } from "../middleware/authMiddleware"

export async function updateProfile(
  req: AuthRequest,
  res: Response
) {
  try {
    const {
      age,
      gender,
      college,
      course,
      year,
      bio,
      interests,
      image,
      lookingFor,
      values,
      personality,
    } = req.body

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        age,
        gender,
        college,
        course,
        year,
        bio,
        interests,
        image,
        lookingFor,
        values,
        personality,
      },
      {
        new: true,
      }
    ).select("-password")

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Server Error",
    })
  }
}

export async function getMyProfile(
  req: AuthRequest,
  res: Response
) {
  try {
    const user = await User.findById(req.userId).select("-password")

    res.status(200).json(user)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Server Error",
    })
  }
}

export async function getUsers(
  req: AuthRequest,
  res: Response
) {
  try {
    const users = await User.find({
      _id: { $ne: req.userId },
    }).select("-password")

    res.status(200).json(users)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Server Error",
    })
  }
}