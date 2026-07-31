import api from "../api/axios"

export interface GroupMember {
  _id: string
  name: string
  image?: string
  isOnline?: boolean
}

export interface GroupMessage {
  _id: string
  group: string

  sender: {
    _id: string
    name: string
    image?: string
  }

  text: string

  type:
    | "text"
    | "image"
    | "voice"
    | "video"
    | "file"

  url?: string

  createdAt: string
}

export interface GroupData {
  _id: string

  name: string

  description: string

  image?: string

  members: GroupMember[]
}

export async function getGroup(id: string) {
  const res = await api.get(`/groups/${id}`)
  return res.data
}

export async function getMessages(id: string) {
  const res = await api.get(`/groups/${id}/messages`)
  return res.data
}

export async function sendMessage(
  id: string,
  data: {
    text?: string
    type?: string
    url?: string
  }
) {
  const res = await api.post(
    `/groups/${id}/messages`,
    data
  )

  return res.data
}

export async function joinGroup(id: string) {
  return api.post(`/groups/${id}/join`)
}

export async function leaveGroup(id: string) {
  return api.post(`/groups/${id}/leave`)
}