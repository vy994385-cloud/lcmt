import api from "../../api/axios"

export async function uploadFile(
  file:File
){

  const formData =
    new FormData()

  formData.append(
    "file",
    file
  )

  const res =
    await api.post(
      "/media/upload",
      formData,
      {
        headers:{
          "Content-Type":
          "multipart/form-data"
        }
      }
    )

  return res.data.file.url

}