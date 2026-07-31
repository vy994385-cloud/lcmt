import api from "../api/axios"


export async function getNotifications(){

const response =
await api.get("/notifications")

return response.data.notifications || []

}



export async function getUnreadCount(){

const response =
await api.get("/notifications/unread-count")

return response.data

}



export async function markNotificationRead(
id:string
){

const response =
await api.patch(
`/notifications/${id}/read`
)

return response.data

}



export async function markAllNotificationsRead(){

const response =
await api.patch(
"/notifications/read-all"
)

return response.data

}