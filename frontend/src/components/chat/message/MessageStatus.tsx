interface Props {

  mine:boolean

  delivered?:boolean

  read?:boolean

  edited?:boolean

  createdAt:string

}

export default function MessageStatus({

mine,

delivered,

read,

edited,

createdAt

}:Props){

return(

<div className="message-meta">

<span>

{

new Date(

createdAt

).toLocaleTimeString([],{

hour:"2-digit",

minute:"2-digit"

})

}

</span>

{

edited &&

<small>

Edited

</small>

}

{

mine &&

<span>

{

read

?

"✓✓"

:

delivered

?

"✓"

:

"⏳"

}

</span>

}

</div>

)

}