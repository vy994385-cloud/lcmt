import EmojiPicker from "emoji-picker-react"

import Button from "../../ui/Button/Button"
import Input from "../../ui/Input/Input"

interface Props{

text:string

setText:(v:string)=>void

showEmoji:boolean

setShowEmoji:(v:boolean)=>void

emojiRef:any

recording:boolean

duration:number

startRecording:()=>void

stopRecording:()=>void

audioBlob:Blob|null

clearRecording:()=>void

sendVoiceMessage:()=>void

selectedFile:File|null

setSelectedFile:(f:File|null)=>void

sendMessage:()=>void

currentUser:any

chatId?:string

socket:any

}

export default function ChatFooter({

text,

setText,

showEmoji,

setShowEmoji,

emojiRef,

recording,

duration,

startRecording,

stopRecording,

audioBlob,

clearRecording,

sendVoiceMessage,

selectedFile,

setSelectedFile,

sendMessage,

currentUser,

chatId,

socket

}:Props){

return(

<footer className="chat-footer">

{

showEmoji &&

<div

ref={emojiRef}

className="emoji-picker"

>

<EmojiPicker

onEmojiClick={(emoji)=>{

setText(

text+emoji.emoji

)

}}

/>

</div>

}

<button

className="emoji-btn"

onClick={()=>

setShowEmoji(

!showEmoji

)

}

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

{

selectedFile &&

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

}

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

sender:currentUser._id,

receiver:chatId

}

)

}}

onKeyDown={(e)=>{

if(e.key==="Enter")

sendMessage()

}}

/>

<input

hidden

id="chat-file"

type="file"

accept="image/*,video/*,.pdf,.doc,.docx,.zip"

onChange={(e)=>{

if(

e.target.files?.length

){

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

)

}