import api from "../api/axios"

export async function getFeed(){

const response =
await api.get("/feed")

return response.data

}

export async function getPost(id:string){

const response =
await api.get(`/feed/${id}`)

return response.data

}

export async function createPost(data:any){

const response =
await api.post(
"/feed",
data
)

return response.data

}

export async function updatePost(
id:string,
data:any
){

const response =
await api.put(
`/feed/${id}`,
data
)

return response.data

}

export async function deletePost(id:string){

const response =
await api.delete(
`/feed/${id}`
)

return response.data

}

export async function likePost(id:string){

const response =
await api.post(
`/feed/${id}/like`
)

return response.data

}

export async function commentPost(
id:string,
text:string
){

const response =
await api.post(
`/feed/${id}/comment`,
{
text
}
)

return response.data

}

export async function toggleSavePost(
id:string
){

const response =
await api.post(
`/feed/${id}/save`
)

return response.data

}