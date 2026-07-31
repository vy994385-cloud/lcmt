import api from "../../api/axios"

export function getConversation(id:string){

return api.get(`/chat/${id}`)

}

export function sendMessage(

id:string,

data:any

){

return api.post(

`/chat/send/${id}`,

data

)

}

export function markRead(

id:string

){

return api.put(

`/chat/read/${id}`

)

}