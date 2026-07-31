interface Props{

message:any

}

export default function MessageMedia({

message

}:Props){

return(

<>

{

(message.type==="image"||

message.image)

&&

<img

src={message.image}

className="chat-image"

alt=""

/>

}

{

(message.type==="video"||

message.video)

&&

<video

controls

className="chat-video"

>

<source

src={message.video}

/>

</video>

}

{

(message.type==="voice"||

message.audio)

&&

<audio controls>

<source

src={message.audio}

/>

</audio>

}

{

(message.type==="file"||

message.file)

&&

<a

href={message.file}

target="_blank"

rel="noreferrer"

>

📄 {message.fileName}

</a>

}

</>

)

}