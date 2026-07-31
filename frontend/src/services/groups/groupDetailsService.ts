import api from "../../api/axios"


export async function getGroupDetails(
id:string
){

const res =
await api.get(
`/groups/${id}`
)

return res.data

}