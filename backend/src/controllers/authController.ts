import { Request, Response } from "express"
import bcrypt from "bcrypt"

import User from "../models/User"

export async function signup(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    res.status(201).json({
      message: "Account created successfully",
      user,
    })

  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Server Error",
    })
  }
}