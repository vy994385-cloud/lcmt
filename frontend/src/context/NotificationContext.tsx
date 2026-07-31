import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react"

import toast from "react-hot-toast"

import socket from "../socket"

import {
  getUnreadCount
} from "../services/notificationService"


interface NotificationContextType {

  unread:number

  latestNotification:any

  increaseUnread:()=>void

  decreaseUnread:()=>void

  clearUnread:()=>void

  refreshUnread:()=>void

}


const NotificationContext =
createContext<NotificationContextType | null>(null)



export function NotificationProvider({
children
}:{
children:React.ReactNode
}){


const [unread,setUnread] =
useState(0)


const [
latestNotification,
setLatestNotification
]=useState<any>(null)





async function refreshUnread(){

try{

const data =
await getUnreadCount()

setUnread(
data.count || 0
)

}

catch(error){

console.log(
"Unread count error",
error
)

}

}





function increaseUnread(){

setUnread(
prev=>prev+1
)

}




function decreaseUnread(){

setUnread(
prev =>
prev > 0
?
prev - 1
:
0
)

}





function clearUnread(){

setUnread(0)

}





useEffect(()=>{


refreshUnread()



function handleNotification(
notification:any
){


setLatestNotification(
notification
)


increaseUnread()



toast.success(

`${

notification.sender?.name ||

"Someone"

} ${

notification.message ||

"sent you a notification"

}`,

{

duration:3000

}

)


}



socket.on(
"notification",
handleNotification
)



return()=>{

socket.off(
"notification",
handleNotification
)

}


},[])







return(

<NotificationContext.Provider

value={{

unread,

latestNotification,

increaseUnread,

decreaseUnread,

clearUnread,

refreshUnread

}}

>

{children}

</NotificationContext.Provider>

)


}





export function useNotifications(){

const context =
useContext(
NotificationContext
)


if(!context){

throw new Error(
"NotificationProvider missing"
)

}


return context

}