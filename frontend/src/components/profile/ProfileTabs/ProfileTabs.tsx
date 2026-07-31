import "./ProfileTabs.css"

interface Props{
active:string
setActive:(tab:string)=>void
}

const tabs=[

"Posts",

"Media",

"Communities",

"About"

]

export default function ProfileTabs({

active,

setActive

}:Props){

return(

<div className="profile-tabs">

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

</div>

)

}