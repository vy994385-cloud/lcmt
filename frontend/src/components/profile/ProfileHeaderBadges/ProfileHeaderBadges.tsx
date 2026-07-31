import "./ProfileHeaderBadges.css"


export default function ProfileHeaderBadges(){


const badges=[

"🌱 New Member",

"🤝 Community Explorer",

"💬 Conversation Starter",

"🚀 Growing Network"

]


return(

<div className="profile-badges">

{
badges.map(
(badge,index)=>(

<span key={index}>

{badge}

</span>

)
)
}

</div>

)

}
