import api from "../api/axios"

export async function editMessage(
  id: string,
  text: string
) {
  const { data } = await api.patch(
    `/chat/message/${id}/edit`,
    { text }
  )

  return data
}

export async function deleteMessage(
  id: string,
  everyone = false
) {
  const { data } = await api.delete(
    `/chat/message/${id}?everyone=${everyone}`
  )

  return data
}

export async function starMessage(
  id: string
) {
  const { data } = await api.patch(
    `/chat/message/${id}/star`
  )

  return data
}

export async function reactToMessage(
  id: string,
  emoji: string
) {
  const { data } = await api.patch(
    `/chat/message/${id}/react`,
    { emoji }
  )

  return data
}