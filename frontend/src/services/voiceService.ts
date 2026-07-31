import api from "../api/axios"

export async function uploadVoice(
  blob: Blob
) {

  const formData =
    new FormData()

  formData.append(
    "voice",
    blob,
    "voice.webm"
  )

  const response =
    await api.post(
      "/voice/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    )

  return response.data

}