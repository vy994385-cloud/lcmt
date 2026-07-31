import api from "../api/axios"


export async function followUser(id:string){

const response =
await api.post(
`/social/follow/${id}`
)

return response.data

}



export async function unfollowUser(id:string){

const response =
await api.delete(
`/social/follow/${id}`
)

return response.data

}



export async function getFollowers(id:string){

const response =
await api.get(
`/social/followers/${id}`
)

return response.data

}



export async function getFollowing(id:string){

const response =
await api.get(
`/social/following/${id}`
)

return response.data

}
