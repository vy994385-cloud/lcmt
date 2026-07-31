import { useEffect, useState } from "react"
import socket from "../../socket"

export default function useTyping(chatId?:string){

const [isTyping,setIsTyping]=
useState(false)

function emitTyping(sender:string){

socket.emit("typing",{

sender,

receiver:chatId

})

}

useEffect(()=>{

function typingHandler(data:any){

const sender=

typeof data.sender==="object"

? data.sender._id

: data.sender

if(sender!==chatId)return

setIsTyping(true)

const timer=

setTimeout(()=>{

setIsTyping(false)

},1500)

return()=>clearTimeout(timer)

}

socket.on(
"typing",
typingHandler
)

return()=>{

socket.off(
"typing",
typingHandler
)

}

},[chatId])

return{

isTyping,

emitTyping

}

}