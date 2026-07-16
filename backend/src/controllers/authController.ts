import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import User from "../models/User"

export async function signup(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body

if (!name || !email || !password) {
  return res.status(400).json({
    message: "All fields are required",
  })
}

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

    const userResponse = {
  _id: user._id,
  name: user.name,
  email: user.email,
  age: user.age,
  bio: user.bio,
  image: user.image,
}

res.status(201).json({
  message: "Account created successfully",
  user: userResponse,
})

  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Server Error",
    })
  }
}
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      })
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    )

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        bio: user.bio,
        image: user.image,
      },
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Server Error",
    })
  }
}