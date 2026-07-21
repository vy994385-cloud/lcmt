import { Link } from "react-router-dom"

import communities from "../../../mock/communities"

import "./MyCommunities.css"



export default function MyCommunities(){



const joinedIds = JSON.parse(

localStorage.getItem("joinedCommunities") || "[]"

)



const joinedCommunities = communities.filter(

community =>

joinedIds.includes(
community.id
)

)




if(joinedCommunities.length===0){

return (

<div className="my-communities">


<h3>

🌍 My Communities

</h3>


<p>

You haven't joined any communities yet.

</p>


</div>

)

}





return (

<div className="my-communities">


<h3>

🌍 My Communities

</h3>




<div className="my-community-list">


{

joinedCommunities.map(c=>(


<Link

key={c.id}

to={`/community/${c.id}`}

className="my-community-card"

>


<span>

{c.icon}

</span>


<div>

<h4>

{c.name}

</h4>


<p>

{c.members} members

</p>

</div>


</Link>


))

}



</div>


</div>

)

}