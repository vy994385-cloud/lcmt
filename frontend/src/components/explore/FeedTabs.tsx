import "./FeedTabs.css"

interface Props{

active:string

setActive:(value:string)=>void

}

const tabs=[

"For You",

"Trending",

"Latest",

"Following",

"Debates",

"Questions",

"Polls"

]

export default function FeedTabs({

active,

setActive

}:Props){

return(

<div className="feed-tabs">

{

tabs.map(tab=>(

<button

key={tab}

className={

active===tab

?

"feed-active"

:

"feed-tab"

}

onClick={()=>setActive(tab)}

>

{tab}

</button>

))

}

</div>

)

}