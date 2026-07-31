import "./SocialStats.css"


interface Props{

  stats:{
    requests:number
    connections:number
    communities:number
  }

}


export default function SocialStats({
  stats
}:Props){


return (

<div className="social-stats">


<div>
🤝
<h3>{stats.connections}</h3>
<p>Friends</p>
</div>


<div>
🌎
<h3>{stats.communities}</h3>
<p>Communities</p>
</div>


<div>
📩
<h3>{stats.requests}</h3>
<p>Requests</p>
</div>


<div>
🔥
<h3>
{stats.connections + stats.communities}
</h3>
<p>Activity</p>
</div>


</div>

)

}
