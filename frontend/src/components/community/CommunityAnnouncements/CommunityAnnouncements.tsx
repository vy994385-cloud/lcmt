import "./CommunityAnnouncements.css"

const announcements = [

{
title:"Weekly AI Meetup",
date:"Tomorrow • 7:00 PM",
text:"Join this week's discussion on Generative AI."
},

{
title:"Community Rules Updated",
date:"2 days ago",
text:"Please read the revised posting guidelines."
},

{
title:"Hackathon Registration",
date:"5 days left",
text:"Applications are now open for the LCMT Hackathon."
}

]

function CommunityAnnouncements(){

return(

<section className="community-announcements">

<h2>

📢 Announcements

</h2>

{

announcements.map(item=>(

<div

key={item.title}

className="announcement-card"

>

<div className="announcement-header">

<h3>

{item.title}

</h3>

<span>

{item.date}

</span>

</div>

<p>

{item.text}

</p>

<div className="announcement-actions">

<button>

👍 Helpful

</button>

<button>

📌 Save

</button>

</div>

</div>

))

}

</section>

)

}

export default CommunityAnnouncements