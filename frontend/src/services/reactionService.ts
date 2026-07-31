import api from "../api/axios"

export type Reaction = {
  emoji: string
  user: string
}

export async function toggleReaction(
  messageId: string,
  emoji: string
) {
  const response = await api.put(
    `/reactions/${messageId}`,
    {
      emoji,
    }
  )

  return response.data
}

export async function getReactions(
  messageId: string
) {
  const response = await api.get(
    `/reactions/${messageId}`
  )

  return response.data
}