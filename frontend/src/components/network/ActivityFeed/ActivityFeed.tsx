import "./ActivityFeed.css"


interface Props{

connections:number
communities:number

}


export default function ActivityFeed({
connections,
communities

}:Props){


return (

<section className="activity-feed">

<h2>
Recent Activity
</h2>


<p>
🤝 You have {connections} people in your circle
</p>


<p>
🌎 You are part of {communities} communities
</p>


<p>
🚀 Keep sharing ideas and joining discussions
</p>


</section>

)

}
