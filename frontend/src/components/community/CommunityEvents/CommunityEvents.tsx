import "./CommunityEvents.css"

const events = [

{
title:"Weekly AI Meetup",
date:"Saturday",
time:"7:00 PM",
type:"Online"
},

{
title:"Hackathon Team Formation",
date:"Sunday",
time:"5:30 PM",
type:"Hybrid"
},

{
title:"Resume Review Session",
date:"Next Wednesday",
time:"6:00 PM",
type:"Online"
}

]

function CommunityEvents(){

return(

<section className="community-events">

<h2>

📅 Community Events

</h2>

<div className="events-grid">

{

events.map(event=>(

<div
key={event.title}
className="event-card"
>

<div className="event-type">

{event.type}

</div>

<h3>

{event.title}

</h3>

<p>

📅 {event.date}

</p>

<p>

🕒 {event.time}

</p>

<div className="event-actions">

<button>

Interested

</button>

<button>

View

</button>

</div>

</div>

))

}

</div>

</section>

)

}

export default CommunityEvents