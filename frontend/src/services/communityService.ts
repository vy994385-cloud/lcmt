import api from "../api/axios"


export async function getCommunities(){

const response =
await api.get(
"/communities"
)

return response.data

}



export async function joinCommunity(
id:string
){

const response =
await api.post(
`/communities/${id}/join`
)

return response.data

}



export async function inviteToCommunity(
userId:string,
communityId:string
){

const response =
await api.post(
`/communities/${communityId}/invite/${userId}`
)

return response.data

}