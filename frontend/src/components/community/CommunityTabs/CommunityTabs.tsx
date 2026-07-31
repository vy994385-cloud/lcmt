import "./CommunityTabs.css"

const tabs = [

  "Feed",

  "Discussions",

  "Announcements",

  "Events",

  "Resources",

  "Members",

  "About"

]

interface Props{

active:string

setActive:(tab:string)=>void

}

function CommunityTabs({

active,

setActive

}:Props){

return(

<nav className="community-tabs">

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

onClick={()=>setActive(tab)}

>

{tab}

</button>

))

}

</nav>

)

}

export default CommunityTabs