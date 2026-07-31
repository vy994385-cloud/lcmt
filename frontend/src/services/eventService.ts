import api from "../api/axios"

export const getEvents = () =>
  api.get("/events")

export const getEvent = (
  id: string
) =>
  api.get(`/events/${id}`)

export const createEvent = (
  data: any
) =>
  api.post("/events", data)

export const joinEvent = (
  id: string
) =>
  api.post(`/events/${id}/join`)

export const leaveEvent = (
  id: string
) =>
  api.post(`/events/${id}/leave`)

export const deleteEvent = (
  id: string
) =>
  api.delete(`/events/${id}`)