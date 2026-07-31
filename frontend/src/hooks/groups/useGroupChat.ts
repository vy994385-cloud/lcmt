import {
useEffect,
useState
} from "react"

import socket from "../../socket"

import {
getGroupMessages,
sendGroupMessage
}
from "../../services/groups/groupMessageService"



export default function useGroupChat(

groupId:string

){

const [messages,setMessages]
=
useState<any[]>([])



useEffect(()=>{


if(!groupId)
return



getGroupMessages(groupId)

.then(setMessages)



socket.emit(

"join-group",

groupId

)



function receive(
message:any
){

setMessages(prev=>[

...prev,

message

])

}



socket.on(

"group-message",

receive

)



return()=>{


socket.emit(

"leave-group",

groupId

)


socket.off(

"group-message",

receive

)


}



},[groupId])





async function send(

text:string

){

if(!text.trim())
return



await sendGroupMessage(

groupId,

{

text

}

)


}



return{

messages,

send

}


}