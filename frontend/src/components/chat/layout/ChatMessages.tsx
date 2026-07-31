import MessageBubble from "../MessageBubble"

interface Props {

  messages:any[]

  currentUser:any

  bottomRef:React.RefObject<HTMLDivElement | null>

  onReaction:(id:string,emoji:string)=>void

  onStar:(id:string)=>void

  onEdit:(id:string,text?:string)=>void

  onDelete:(id:string,everyone?:boolean)=>void

}


function getSenderId(message:any){

  return typeof message.sender==="object"
    ? message.sender._id
    : message.sender

}



export default function ChatMessages({

messages,

currentUser,

bottomRef,

onReaction

}:Props){


return (

<section className="chat-body">


{
messages.map(message=>{


const mine =
getSenderId(message)
===
currentUser._id



return (

<MessageBubble

key={message._id}

message={message}

mine={mine}


onReaction={(emoji)=>
onReaction(
message._id,
emoji
)
}


onOpenMenu={()=>{

console.log(
"open menu",
message._id
)

}}


/>


)


})
}


<div ref={bottomRef}/>


</section>


)


}