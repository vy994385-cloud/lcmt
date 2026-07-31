interface Props{

text?:string

deleted?:boolean

}

export default function MessageContent({

text,

deleted

}:Props){

if(deleted){

return(

<i>

This message was deleted

</i>

)

}

if(!text)

return null

return(

<p>

{text}

</p>

)

}