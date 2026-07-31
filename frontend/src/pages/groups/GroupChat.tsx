import {
  useEffect,
  useState,
  useRef
} from "react"

import {
  useParams
} from "react-router-dom"

import socket from "../../socket"

import {
  getGroupMessages,
  sendGroupMessage
}
from "../../services/groups/groupMessageService"

import "./GroupChat.css"

import GroupHeader from "../../components/groups/GroupHeader"
import GroupMembers from "../../components/groups/GroupMembers"
import {
getGroupDetails
}
from "../../services/groups/groupDetailsService"


import {
joinGroup,
leaveGroup,
removeGroupMember
}
from "../../services/groups/groupService"

function GroupChat(){


const {id}=useParams()


const [messages,setMessages]=
useState<any[]>([])


const [text,setText]=
useState("")


const [typing,setTyping]=
useState("")


const bottomRef =
useRef<HTMLDivElement>(null)

const [onlineMembers,setOnlineMembers]=
useState<string[]>([])

async function loadMessages(){

try{

const data =
await getGroupMessages(
id as string
)

setMessages(data)

}

catch(error){

console.log(
"loading messages failed",
error
)

}

}


const [group,setGroup]=
useState<any>(null)

const [currentUser,setCurrentUser]=
useState<any>(null)

useEffect(()=>{

  socket.on(
"user-online",
(userId:string)=>{

setOnlineMembers(prev=>

prev.includes(userId)

?

prev

:

[
...prev,
userId
]

)

}
)



socket.on(
"user-offline",
(data:any)=>{

setOnlineMembers(prev=>

prev.filter(
(id)=>
id!==data.userId
)

)

}
)


if(!id)
return


getGroupDetails(
id
)
.then(setGroup)


const user =
JSON.parse(
localStorage.getItem("user") || "{}"
)

setCurrentUser(user)

loadMessages()



socket.emit(
"join-group",
id
)





function receiveGroupMessage(
message:any
){


if(
String(message.group)
!== String(id)
)
return



setMessages(prev=>[

...prev,

message

])


}





function handleTyping(
data:any
){

setTyping(
`${data.user} is typing...`
)


setTimeout(()=>{

setTyping("")

},1500)


}





socket.on(
"group-message",
receiveGroupMessage
)



socket.on(
"group-typing",
handleTyping
)





return()=>{


socket.off(
"group-message",
receiveGroupMessage
)



socket.off(
"group-typing",
handleTyping
)


socket.off(
"user-online"
)


socket.off(
"user-offline"
)


}



},[id])








useEffect(()=>{


bottomRef.current?.scrollIntoView({

behavior:"smooth"

})


},[messages])







async function handleSend(){


if(
!text.trim() ||
!id
)
return



try{


await sendGroupMessage(

id,

{
text
}

)


setText("")


}

catch(error){

console.log(
"send failed",
error
)

}


}

async function handleJoin(){

if(!id)
return


try{

const updated =
await joinGroup(id)

setGroup(updated)

}
catch(error){

console.log(
"join failed",
error
)

}

}



async function handleLeave(){

if(!id)
return


try{

const updated =
await leaveGroup(id)

setGroup(updated)

}
catch(error){

console.log(
"leave failed",
error
)

}

}

return (

<main className="group-chat-page">


{
group &&

<GroupHeader

name={group.name}

description={
group.description
}

image={
group.image
}

members={
group.members?.length || 0
}

isMember={
currentUser &&
group.members?.some(
(member:any)=>
String(member._id)
===
String(currentUser._id)
)
}

isAdmin={
currentUser &&
String(group.owner)
===
String(currentUser._id)
}

onJoin={handleJoin}

onLeave={handleLeave}

/>

}


<div className="group-layout">


{
group &&

<GroupMembers

members={
group.members || []
}

onlineMembers={
onlineMembers
}

owner={
group.owner
}

admins={
group.admins || []
}

currentUser={
currentUser
}

onRemove={
async(userId)=>{

try{

const updated =
await removeGroupMember(

id as string,

userId

)

setGroup(updated)

}

catch(error){

console.log(
"remove failed",
error
)

}

}
}

/>

}



<div className="group-chat-box">


<section className="group-chat-messages">


{
typing &&

<p className="typing">

{typing}

</p>

}



{

messages.map(

(message:any)=>(


<div

className="group-message"

key={message._id}

>


<strong>

{

message.sender?.name ||

"Member"

}

</strong>



<p>

{

message.text

}

</p>



<span>

{

new Date(
message.createdAt
)
.toLocaleTimeString()

}

</span>



</div>


)

)

}



<div ref={bottomRef}/>


</section>







<footer className="group-chat-input">


<input

value={text}

placeholder="Write a message..."

onChange={
e=>{

setText(
e.target.value
)


socket.emit(
"group-typing",
{

groupId:id,

user:
JSON.parse(
localStorage.getItem("user") || "{}"
).name || "Member"

}

)


}
}



/>


<button

onClick={handleSend}

>

Send

</button>


</footer>


</div>


</div>


</main>

)

}


export default GroupChat