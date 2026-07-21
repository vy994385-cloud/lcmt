export interface User {
  id: string
  _id?: string

  name: string
  email?: string

  avatar?: string
  image?: string

  bio?: string

  college?: string
  course?: string
  year?: string

  interests?: string[]
  values?: string[]

  personality?: string

  followers?: number
  following?: number

  communities?: number

  verified?: boolean
}