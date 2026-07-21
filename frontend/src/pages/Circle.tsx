import {
  useEffect,
  useState
} from "react"

import PersonCard from "../components/cards/PersonCard/PersonCard"

import api from "../api/axios"

import {
  getMyProfile
} from "../api/profile"

import "./Circle.css"



interface Person {

  _id:string

  name:string

  username?:string

  headline?:string

  course?:string

  college?:string

  bio?:string

  interests:string[]

  image?:string

  followers:string[]

  following:string[]

}




interface Network {

  followers:number

  following:number

  friends:number

}




interface FriendRequest {

  _id:string

  name:string

  username?:string

  image?:string

  college?:string

  course?:string

}






function Circle(){


const [people,setPeople] =
useState<Person[]>([])



const [requests,setRequests] =
useState<FriendRequest[]>([])



const [network,setNetwork] =
useState<Network>({

followers:0,

following:0,

friends:0

})



const [loading,setLoading] =
useState(true)






async function loadUsers(){

try{

const response =
await api.get(
"/users/discover"
)


setPeople(
response.data
)


}
catch(error){

console.log(error)

}

}









async function loadProfile(){

try{


const user =
await getMyProfile()



setNetwork({

followers:
user.followers?.length || 0,


following:
user.following?.length || 0,


friends:
user.friends?.length || 0

})



setRequests(
user.friendRequestsReceived || []
)



}
catch(error){

console.log(error)

}

finally{

setLoading(false)

}

}








async function acceptRequest(
id:string
){

try{

await api.post(
`/social/friend-request/accept/${id}`
)


setRequests(
prev =>
prev.filter(
item =>
item._id !== id
)
)


}
catch(error){

console.log(error)

}

}








async function rejectRequest(
id:string
){

try{

await api.post(
`/social/friend-request/reject/${id}`
)


setRequests(
prev =>
prev.filter(
item =>
item._id !== id
)
)


}
catch(error){

console.log(error)

}

}







useEffect(()=>{


loadUsers()

loadProfile()


},[])









return (

<main className="circle-page">



<header className="circle-header">


<h1>

🤝 Your Circle

</h1>


<p>

Connect with people, communities and conversations that matter.

</p>



<input

placeholder="Search people, interests, communities..."

className="circle-search"

/>


</header>









<section>


<h2>

🔥 Discover People

</h2>


<p className="section-subtitle">

People from your growing LCMT community

</p>





{

loading ?

<p>
Loading community...
</p>


:


<div className="people-grid">

{

people.map(

person =>

<PersonCard

key={
person._id
}

person={
person
}

/>

)

}


</div>

}



</section>









<section>


<h2>

👥 Your Network

</h2>



<div className="feature-card">


<div className="connection-stats">


<div>

<strong>
{network.followers}
</strong>

<span>
Followers
</span>

</div>



<div>

<strong>
{network.following}
</strong>

<span>
Following
</span>

</div>



<div>

<strong>
{network.friends}
</strong>

<span>
Friends
</span>

</div>



</div>


</div>


</section>









<section>


<h2>

📩 Friend Requests

</h2>




{

requests.length === 0 ?

<div className="feature-card">

<p>
No friend requests yet.
</p>

</div>


:


requests.map(

request =>

<div
key={request._id}
className="feature-card"
>


<div>

<h3>
{request.name}
</h3>


<p>
{request.course || "LCMT Member"}
</p>


</div>



<div className="wave-buttons">


<button

onClick={()=>acceptRequest(request._id)}

>

Accept

</button>




<button

onClick={()=>rejectRequest(request._id)}

>

Ignore

</button>



</div>


</div>

)

}



</section>









<section>


<h2>

🌍 Communities You Follow

</h2>



<div className="feature-card">


<p>

🤖 AI Builders
&nbsp; • &nbsp;
🏛 Political Discussions
&nbsp; • &nbsp;
🚀 Startup Ideas
&nbsp; • &nbsp;
🏏 Sports Hub

</p>


</div>


</section>







</main>

)

}



export default Circle