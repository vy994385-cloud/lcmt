import { useEffect } from "react"

import socket from "../../socket"

export default function useChatSocket(

userId?:string

){

useEffect(()=>{

if(!userId)return

socket.emit(
"join",
userId
)

return()=>{

socket.emit(
"leave",
userId
)

}

},[userId])

return socket

}