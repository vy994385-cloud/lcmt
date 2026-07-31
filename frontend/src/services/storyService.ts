import api from "../api/axios"

export const getStories = () =>
  api.get("/stories")

export const createStory = (
  data: any
) =>
  api.post("/stories", data)

export const viewStory = (
  id: string
) =>
  api.post(`/stories/${id}/view`)

export const reactStory = (
  id: string,
  emoji: string
) =>
  api.post(
    `/stories/${id}/react`,
    { emoji }
  )

export const deleteStory = (
  id: string
) =>
  api.delete(`/stories/${id}`)