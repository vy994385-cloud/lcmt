import api from "../api/axios"



export async function getMyProfile(){

const response =
await api.get(
"/profile/me"
)

return response.data

}




export async function getProfile(
id:string
){

const response =
await api.get(
`/profile/${id}`
)

return response.data

}



export async function followUser(
id:string
){

const response =
await api.post(
`/follow/${id}`
)

return response.data

}




export async function unfollowUser(
id:string
){

const response =
await api.delete(
`/follow/${id}`
)

return response.data

}




export async function getFollowers(
id:string
){

const response =
await api.get(
`/follow/followers/${id}`
)

return response.data

}




export async function getFollowing(
id:string
){

const response =
await api.get(
`/follow/following/${id}`
)

return response.data

}



export async function updateProfile(
data:any
){

const response =
await api.put(
"/profile",
data
)

return response.data

}

export async function getFriends(
  id:string
){

  const response =
  await api.get(
    `/friends/${id}`
  )

  return response.data

}