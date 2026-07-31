import {
  useEffect,
  useRef,
  useState,
} from "react"

import {
  useParams,
  useNavigate,
} from "react-router-dom"

import EmojiPicker from "emoji-picker-react"

import api from "../api/axios"
import socket from "../socket"

import Avatar from "../components/ui/Avatar/Avatar"
import Button from "../components/ui/Button/Button"
import Input from "../components/ui/Input/Input"

import useVoiceRecorder from "../hooks/useVoiceRecorder"


import ChatMessages from "../components/chat/layout/ChatMessages"

import "./Chat.css"

import {
  editMessage,
  deleteMessage,
  starMessage,
  reactToMessage,
} from "../services/chatService"

interface ChatUser {
  _id: string
  name: string
  image?: string
  isOnline?: boolean
  lastSeen?: string
}

interface Message {
  _id: string

  sender:
    | string
    | {
        _id: string
        name?: string
        image?: string
      }

  receiver:
    | string
    | {
        _id: string
        name?: string
        image?: string
      }

  type: string

  text?: string
  image?: string
  video?: string
  audio?: string
  file?: string
  fileName?: string

  delivered?: boolean
  read?: boolean
  edited?: boolean
  deleted?: boolean

  reactions?: any[]

  createdAt: string
} 



function Chat(){


const {id}=useParams()

const navigate=useNavigate()


const currentUser =
JSON.parse(
localStorage.getItem("user") || "{}"
)



const [messages,setMessages]=
useState<Message[]>([])


const [chatUser,setChatUser]=
useState<ChatUser|null>(null)


const [text,setText]=
useState("")

const [selectedFile, setSelectedFile] =
useState<File | null>(null)


const [showEmoji,setShowEmoji]=
useState(false)


const [showMenu,setShowMenu]=
useState(false)


const [isTyping,setIsTyping]=
useState(false)



const {

recording,

audioBlob,

duration,

startRecording,

stopRecording,

clearRecording

}=useVoiceRecorder()



const bottomRef =
useRef<HTMLDivElement>(null)


const emojiRef =
useRef<HTMLDivElement>(null)




useEffect(()=>{


function closeEmoji(event:any){


if(

emojiRef.current &&

!emojiRef.current.contains(
event.target
)

){

setShowEmoji(false)

}


}



document.addEventListener(
"mousedown",
closeEmoji
)


return()=>{

document.removeEventListener(
"mousedown",
closeEmoji
)

}


},[])





useEffect(()=>{


if(!currentUser._id)
return


socket.emit(
"join",
currentUser._id
)


return()=>{

socket.emit(
"leave",
currentUser._id
)

}


},[currentUser._id])





useEffect(()=>{


function receiveMessage(
message:any
){


const sender =
typeof message.sender==="object"

?

message.sender._id

:

message.sender



const receiver =
typeof message.receiver==="object"

?

message.receiver._id

:

message.receiver



const currentChat =

(
sender===currentUser._id &&
receiver===id
)

||

(
sender===id &&
receiver===currentUser._id
)



if(!currentChat)
return



setMessages(prev=>{


const exists =
prev.some(
item=>
item._id===message._id
)


if(exists)
return prev



return[
...prev,
message
]


})


}



socket.on(
"receive-message",
receiveMessage
)

useEffect(() => {

  function updateReaction(updated:any){

    setMessages(prev =>

      prev.map(message =>

        message._id === updated._id

          ? {
              ...message,
              reactions: updated.reactions
            }

          : message

      )

    )

  }

  socket.on(
    "message-reaction",
    updateReaction
  )

  return () => {

    socket.off(
      "message-reaction",
      updateReaction
    )

  }

}, [])


return()=>{

socket.off(
"receive-message",
receiveMessage
)

}


},[
id,
currentUser._id
])





useEffect(()=>{


function typingHandler(
data:any
){


const sender =
typeof data.sender==="object"

?

data.sender._id

:

data.sender



if(sender!==id)
return



setIsTyping(true)


setTimeout(()=>{

setIsTyping(false)

},1500)



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



},[id])





async function loadMessages(){


try{


const response =
await api.get(
`/chat/${id}`
)



setMessages(
response.data.messages || []
)



setChatUser(
response.data.user
)



await api.put(
`/chat/read/${id}`
)



}

catch(error){

console.log(
"chat loading failed",
error
)

}


}





async function sendMessage() {

  if (!text.trim() && !selectedFile)
    return

  try {

    // Upload file first
    if (selectedFile) {

      const formData = new FormData()

      formData.append(
        "file",
        selectedFile
      )

      const upload =
        await api.post(
          "/media/upload",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        )

      const url =
        upload.data.file.url

      let payload: any = {
        text,
      }

      if (
        selectedFile.type.startsWith("image/")
      ) {

        payload.image = url
        payload.type = "image"

      }
      else if (
        selectedFile.type.startsWith("video/")
      ) {

        payload.video = url
        payload.type = "video"

      }
      else {

        payload.file = url
        payload.fileName =
          selectedFile.name
        payload.type = "file"

      }

      await api.post(
        `/chat/send/${id}`,
        payload
      )

      setSelectedFile(null)

    }

    // Normal text message
    else {

      await api.post(
        `/chat/send/${id}`,
        {
          text,
        }
      )

    }

    setText("")

  }
  catch (error) {

    console.log(error)

  }

}
async function handleReaction(
  messageId: string,
  emoji: string
) {
  try {

   await reactToMessage(
  messageId,
  emoji
)
  } catch (error) {

    console.log(error)

  }
}

async function handleStar(
  messageId: string
) {
  try {

    await starMessage(messageId)

    loadMessages()

  } catch (error) {

    console.log(error)

  }
}

async function handleEdit(
  messageId: string,
  oldText?: string
) {

  const updated = prompt(
    "Edit message",
    oldText || ""
  )

  if (!updated) return

  try {

    await editMessage(
      messageId,
      updated
    )

    loadMessages()

  } catch (error) {

    console.log(error)

  }
}

async function handleDelete(
  messageId: string,
  everyone = false
) {

  try {

    await deleteMessage(
      messageId,
      everyone
    )

    loadMessages()

  } catch (error) {

    console.log(error)

  }
}




async function sendVoiceMessage(){


if(!audioBlob || !id)
return



try{


const formData =
new FormData()



formData.append(
"file",
audioBlob,
"voice-message.webm"
)



const upload =
await api.post(
"/media/upload",
formData,
{
headers:{
"Content-Type":
"multipart/form-data"
}
}
)



await api.post(
`/chat/send/${id}`,
{

audio:
upload.data.file.url,

text:""

}
)



clearRecording()



}

catch(error){

console.log(
"voice send failed",
error
)

}


}






useEffect(()=>{


loadMessages()


},[id])





useEffect(()=>{


bottomRef.current?.scrollIntoView({

behavior:"smooth"

})


},[messages])





return(


<main className="chat-page">


<header className="chat-header">


<div className="chat-user">


<Avatar

src={chatUser?.image}

size={58}

online={
chatUser?.isOnline
}


/>



<div>


<h2>

{
chatUser?.name || "Chat"
}

</h2>


<p>


{

isTyping

?

"✍️ Typing..."

:

chatUser?.isOnline

?

"🟢 Online"

:

"Offline"

}



</p>


</div>


</div>



<button

className="icon-btn"

onClick={()=>setShowMenu(!showMenu)}

>

⋮

</button>



{
showMenu &&

<div className="menu-dropdown">


<button
onClick={()=>
navigate(`/profile/${id}`)
}
>

👤 Profile

</button>


<button>

👥 Create Group

</button>


</div>

}


</header>





<ChatMessages

messages={messages}

currentUser={currentUser}

bottomRef={bottomRef}

onReaction={handleReaction}

onStar={handleStar}

onEdit={handleEdit}

onDelete={handleDelete}

/>



<footer className="chat-footer">



{

showEmoji &&

<div

ref={emojiRef}

className="emoji-picker"

>


<EmojiPicker

onEmojiClick={
emoji=>

setText(
prev=>
prev+emoji.emoji
)

}

/>


</div>

}



<button

className="emoji-btn"

onClick={()=>setShowEmoji(!showEmoji)}

>

😊

</button>





<button

className="voice-btn"

onClick={()=>{

recording

?

stopRecording()

:

startRecording()

}}

>

{

recording

?

`⏹ ${duration}s`

:

"🎤"

}


</button>





{

audioBlob &&

<div className="voice-preview">


<audio

controls

src={
URL.createObjectURL(
audioBlob
)
}

/>


<button
onClick={clearRecording}
>

❌

</button>


<button
onClick={sendVoiceMessage}
>

Send

</button>


</div>

}

{selectedFile && (

  <div className="voice-preview">

    📎 {selectedFile.name}

    <button
      onClick={()=>
        setSelectedFile(null)
      }
    >
      ❌
    </button>

  </div>

)}



<Input

value={text}

placeholder="Type message..."

onChange={(e)=>{


setText(
e.target.value
)


socket.emit(
"typing",
{

sender:
currentUser._id,

receiver:id

}

)


}}



onKeyDown={(e)=>{

if(e.key==="Enter")
sendMessage()

}}


/>





<input
  type="file"
  id="chat-file"
  hidden
  accept="image/*,video/*,.pdf,.doc,.docx,.zip"
  onChange={(e)=>{

    if(e.target.files?.length){

      setSelectedFile(
        e.target.files[0]
      )

    }

  }}
/>

<label
  htmlFor="chat-file"
  className="emoji-btn"
>
  📎
</label>

<Button
  onClick={sendMessage}
>
  Send ❤️
</Button>



</footer>



</main>


)


}


export default Chat