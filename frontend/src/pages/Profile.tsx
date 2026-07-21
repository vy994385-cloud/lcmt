import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import Layout from "../components/Layout"

import {
  getConnections
} from "../utils/connections"

import "./Profile.css"
import ProfileSections from "../components/profile/ProfileSections/ProfileSections"


function Profile(){


const user = JSON.parse(
  localStorage.getItem("user") || "{}"
)



const [stats,setStats] = useState({

followers:0,
following:0,
friends:0

})





useEffect(()=>{


const connections = getConnections()



const friends =
connections.filter(
(item:any)=>
item.status==="accepted"
)



const following =
connections.filter(
(item:any)=>
item.from===user._id
)



const followers =
connections.filter(
(item:any)=>
item.to===user._id
)




setStats({

followers:followers.length,

following:following.length,

friends:friends.length

})


},[user._id])







return (

<Layout>


<main className="profile-page">



<section className="profile-card">


<img

src={
user.image ||
"https://picsum.photos/300"
}

alt="profile"

/>



<div className="profile-info">


<h1>

{user.name || "LCMT Student"}

</h1>



<p>

🎓 {user.college || "College Student"}

</p>



<p>

💻 {user.course || "Student"}

</p>



<p>

✨ {user.bio || "Building meaningful connections"}

</p>




<Link

className="edit-btn"

to="/edit-profile"

>

Edit Profile

</Link>



</div>


</section>








<section className="profile-stats">



<Link to="/followers">

<strong>

{stats.followers}

</strong>

Followers

</Link>





<Link to="/following">

<strong>

{stats.following}

</strong>

Following

</Link>





<Link to="/friends">

<strong>

{stats.friends}

</strong>

Friends

</Link>



</section>








<section className="profile-section">


<h2>

🌍 My Communities

</h2>


<div className="profile-box">


<Link to="/communities">

Explore Communities

</Link>


</div>


</section>








<section className="profile-section">


<h2>

💭 My Thoughts

</h2>



<div className="profile-box">


<p>

Share your first thought with LCMT 🚀

</p>


</div>


</section>








<section className="profile-section">


<h2>

✨ Interests

</h2>

<ProfileSections

user={user}

/>

<div className="interest-container">


{

(user.interests || [

"AI",

"Technology",

"Startups"

])

.map(
(item:string)=>(


<span key={item}>

{item}

</span>


)

)


}


</div>


</section>




</main>


</Layout>

)


}



export default Profile