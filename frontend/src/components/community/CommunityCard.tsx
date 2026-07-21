import "./CommunityCard.css"
import { Link } from "react-router-dom"


interface Props {

  id:string

  name:string

  icon:string

  members:string

  posts:string

}


export default function CommunityCard({

  id,

  name,

  icon,

  members,

  posts

}:Props){


return (

<Link

to={`/community/${id}`}

className="community-card"


>


<div className="community-top">


<div className="community-icon">

{icon}

</div>


<div>

<h3>

{name}

</h3>


<p>

{members} members

</p>


</div>


</div>



<div className="community-bottom">


<span>

{posts} today

</span>



<button>

View Community

</button>

</div>


</Link>


)

}