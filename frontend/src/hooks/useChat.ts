import { useEffect, useState } from "react"
import api from "../api/axios"

export interface ChatMessage{

_id:string

text?:string

type?:string

image?:string

video?:string

audio?:string

file?:string

fileName?:string

sender:any

receiver:any

createdAt:string

delivered?:boolean

read?:boolean

edited?:boolean

deleted?:boolean

reactions?:any[]

}

export default function useChat(chatId?:string){

const[messages,setMessages]=
useState<ChatMessage[]>([])

const[user,setUser]=
useState<any>(null)

async function loadConversation(){

if(!chatId)return

try{

const res=

await api.get(
`/chat/${chatId}`
)

setMessages(
res.data.messages||[]
)

setUser(
res.data.user
)

await api.put(
`/chat/read/${chatId}`
)

}catch(err){

console.log(err)

}

}

useEffect(()=>{

loadConversation()

},[chatId])

return{

messages,

setMessages,

chatUser:user,

reload:loadConversation

}

}