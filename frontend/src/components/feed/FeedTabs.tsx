import "./FeedTabs.css"



interface Props{

active:string

setActive:(value:string)=>void

}



export default function FeedTabs({

active,

setActive

}:Props){



const tabs=[

"Latest",

"Trending",

"Following",

"Communities"

]



return(

<div className="feed-tabs">


{

tabs.map(tab=>(


<button

key={tab}

className={
active===tab
?
"active"
:
""
}

onClick={()=>
setActive(tab)
}

>

{tab}

</button>


))

}



</div>

)

}