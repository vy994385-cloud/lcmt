import {
  useEffect,
  useState
} from "react"

import {
  useNavigate,
  Link
} from "react-router-dom"

import {
  getGroups
}
from "../../services/groups/groupService"

import "./Groups.css"



function Groups(){


const [groups,setGroups]=
useState<any[]>([])


const navigate =
useNavigate()



useEffect(()=>{

getGroups()
.then(setGroups)

},[])



return (

<main className="groups-page">


<h1>
Communities & Groups
</h1>



<Link to="/groups/create">

<button className="create-group-btn">

➕ Create Group

</button>

</Link>



<div className="groups-grid">


{
groups.map(
(group:any)=>(

<div
className="group-card"
key={group._id}
>


<h2>

{group.name}

</h2>


<p>

{group.description}

</p>


<p>

👥 {group.members?.length || 0}

members

</p>



<button

onClick={()=>navigate(
`/groups/${group._id}`
)}

>

Open

</button>


</div>

)

)

}


</div>


</main>

)

}


export default Groups