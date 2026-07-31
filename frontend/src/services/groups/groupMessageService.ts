import api from "../../api/axios"



export async function getGroupMessages(
id:string
){

const res =
await api.get(
`/group-messages/${id}`
)

return res.data

}




export async function sendGroupMessage(
id:string,
data:any
){

const res =
await api.post(
`/group-messages/${id}`,
data
)

return res.data

}