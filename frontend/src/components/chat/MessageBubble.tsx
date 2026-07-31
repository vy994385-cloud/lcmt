import "./MessageBubble.css"

import { useState } from "react"

import MessageActions from "./MessageActions"

import ReactionBar,{
type MessageReaction
} from "./reactions/ReactionBar"

import MessageMedia from "./message/MessageMedia"

import MessageContent from "./message/MessageContent"

import MessageReply from "./message/MessageReply"

import MessageStatus from "./message/MessageStatus"

type Message={

_id:string

text?:string

type?:string

image?:string

video?:string

audio?:string

file?:string

fileName?:string

createdAt:string

edited?:boolean

deleted?:boolean

delivered?:boolean

read?:boolean

replyTo?:{

sender?:string

text?:string

}

reactions?:MessageReaction[]

}

interface Props{

message:Message

mine:boolean

onReaction?:(emoji:string)=>void

onOpenMenu?:()=>void

}

export default function MessageBubble({

message,

mine,

onReaction,

onOpenMenu

}:Props){

const[showMenu,setShowMenu]=
useState(false)

return(

<div
className={
mine
?
"message mine"
:
"message"
}
>

<div

className="bubble"

onContextMenu={(e)=>{

e.preventDefault()

setShowMenu(true)

onOpenMenu?.()

}}

>

<MessageReply
reply={message.replyTo}
/>

<MessageMedia
message={message}
/>

<MessageContent

text={message.text}

deleted={message.deleted}

/>

<ReactionBar

reactions={
message.reactions||[]
}

onReact={onReaction}

/>

{

showMenu&&

<MessageActions

mine={mine}

onReply={()=>{
setShowMenu(false)
}}

onCopy={()=>{

navigator.clipboard.writeText(
message.text||""
)

setShowMenu(false)

}}

onStar={()=>{
setShowMenu(false)
}}

onEdit={()=>{
setShowMenu(false)
}}

onDeleteMe={()=>{
setShowMenu(false)
}}

onDeleteEveryone={()=>{
setShowMenu(false)
}}

/>

}

</div>

<MessageStatus

mine={mine}

createdAt={message.createdAt}

edited={message.edited}

delivered={message.delivered}

read={message.read}

/>

</div>

)

}