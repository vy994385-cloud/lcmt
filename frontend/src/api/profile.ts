import api from "./axios"


export async function getMyProfile(){

  const response =
    await api.get(
      "/profile/me"
    )

  return response.data

}