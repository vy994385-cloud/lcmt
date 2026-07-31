import api from "../../api/axios"



export async function getGroups(){

const res = await api.get(
"/groups"
)

return res.data

}



export async function getGroupById(
id:string
){

const res = await api.get(
`/groups/${id}`
)

return res.data

}



export async function createGroup(
data:any
){

const res = await api.post(
"/groups",
data
)

return res.data

}



export async function joinGroup(
id:string
){

const res = await api.post(
`/groups/join/${id}`
)

return res.data

}


export async function leaveGroup(
id:string
){

const res =
await api.post(
`/groups/leave/${id}`
)

return res.data

}

export async function removeGroupMember(

groupId:string,

userId:string

){

const response =
await api.delete(

`/groups/${groupId}/member/${userId}`

)


return response.data.group

}
export async function promoteMember(
  groupId:string,
  userId:string
){

const res =
await api.put(
`/groups/${groupId}/promote/${userId}`
)

return res.data

}



export async function demoteMember(
  groupId:string,
  userId:string
){

const res =
await api.put(
`/groups/${groupId}/demote/${userId}`
)

return res.data

}



export async function transferOwnership(
  groupId:string,
  userId:string
){

const res =
await api.put(
`/groups/${groupId}/transfer/${userId}`
)

return res.data

}