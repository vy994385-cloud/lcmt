import type { User } from "./User"
import type { Community } from "./Community"


export interface Post {

  id: string

  author: User

  community: Community

  content: string

  image?: string

  tags: string[]

  likes: number

  comments: number

  shares: number

  createdAt: string

}