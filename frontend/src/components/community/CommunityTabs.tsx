import "./CommunityTabs.css"



interface Props {

  community?: any

  active?: string

  setActive?: (value:string)=>void

}



export default function CommunityTabs({

  active = "Feed",

  setActive

}: Props) {



const tabs = [

  "Feed",

  "Questions",

  "Polls",

  "Events",

  "Members"

]



return (

<div className="community-tabs">


{

tabs.map(tab => (


<button

key={tab}

className={
active === tab
?
"active"
:
""
}


onClick={() =>

setActive?.(tab)

}


>

{tab}


</button>


))


}


</div>

)

}