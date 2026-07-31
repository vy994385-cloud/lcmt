import { useEffect } from "react"

import socket from "../socket"


export function useNotifications(
  userId:string | undefined,
  callback:(data:any)=>void
){

useEffect(()=>{

if(!userId){
return
}


socket.emit(
"join",
userId
)


socket.on(
"notification",
(data)=>{

callback(data)

}
)


return ()=>{

socket.off(
"notification"
)

}


},[
userId
])

}