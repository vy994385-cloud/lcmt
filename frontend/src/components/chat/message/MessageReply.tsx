interface Props{

reply?:{

sender?:string

text?:string

}

}

export default function MessageReply({

reply

}:Props){

if(!reply)

return null

return(

<div className="reply-preview">

<strong>

{reply.sender}

</strong>

<p>

{reply.text}

</p>

</div>

)

}