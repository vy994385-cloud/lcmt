import {
useEffect,
useState
} from "react"

import {
useParams,
useNavigate
} from "react-router-dom"

import api from "../../api/axios"

import {
joinGroup
}
from "../../services/groups/groupService"

import "./GroupDetails.css"



function GroupDetails(){


const {id}=useParams()


const navigate =
useNavigate()


const [group,setGroup]=
useState<any>(null)



async function loadGroup(){

try{

const res =
await api.get(
`/groups/${id}`
)

setGroup(res.data)

}

catch(error){

console.log(error)

}

}



useEffect(()=>{

loadGroup()

},[id])



async function handleJoin(){

try{

await joinGroup(
id as string
)

loadGroup()

}

catch(error){

console.log(error)

}

}



if(!group){

return (

<div className="group-details">

Loading...

</div>

)

}



return (

<main className="group-details">



<section className="group-header">


<h1>

{group.name}

</h1>


<p>

{group.description}

</p>


<div>

👥 {group.members?.length || 0} members

</div>



</section>



<div className="group-actions">


<button
onClick={handleJoin}
>

Join Community

</button>



<button

onClick={()=>navigate(
`/groups/${id}/chat`
)}

>

💬 Open Chat

</button>


</div>




<section className="members">


<h2>

Members

</h2>



{

group.members?.map(
(member:any)=>(


<div
className="member"
key={member._id}
>


<img

src={
member.image ||
"https://via.placeholder.com/50"
}

/>


<div>

<h3>

{member.name}

</h3>


<p>

{member.college || ""}

</p>

</div>


</div>


)

)

}



</section>



</main>

)

}


export default GroupDetails