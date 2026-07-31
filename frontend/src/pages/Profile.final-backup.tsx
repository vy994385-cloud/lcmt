import {
  useEffect,
  useState
} from "react"

import {
  Link,
  useParams
} from "react-router-dom"

import Layout from "../components/Layout"

import {
  getMyProfile,
  getProfile,
  followUser,
  unfollowUser
} from "../services/profileService"

import ProfileSections from "../components/profile/ProfileSections/ProfileSections"

import "./Profile.css"

import {
  sendRequest
} from "../services/networkService"

import ProfilePosts from "../components/profile/ProfilePosts/ProfilePosts"
import ProfileActivity from "../components/profile/ProfileActivity/ProfileActivity"

import ProfileCompletion from "../components/profile/ProfileCompletion/ProfileCompletion"

import ProfilePassions from "../components/profile/ProfilePassions/ProfilePassions"

import ProfileCommunities from "../components/profile/ProfileCommunities/ProfileCommunities"

import ProfileMutuals from "../components/profile/ProfileMutuals/ProfileMutuals"

import ProfileThoughts from "../components/profile/ProfileThoughts/ProfileThoughts"

import ProfileActions from "../components/profile/ProfileActions/ProfileActions"

import toast from "react-hot-toast"

function Profile(){


const {
id
}=useParams()



const currentUser =
JSON.parse(
localStorage.getItem("user") || "{}"
)


const isOwnProfile =
!id ||
id === currentUser._id



const [user,setUser]=
useState<any>(null)


const [following,setFollowing]=
useState(false)

const [requested,setRequested]=
useState(false)

const [connected]=
useState(false)

const [loading,setLoading]=
useState(true)



async function loadProfile(){

try{


const data =
isOwnProfile

?

await getMyProfile()

:

await getProfile(id!)



setUser(data)



setFollowing(

data.followers?.some(
(item:any)=>
item.toString() ===
JSON.parse(
localStorage.getItem("user") || "{}"
)._id
)

)



}
catch(error){

console.log(
"PROFILE ERROR",
error
)

}
finally{

setLoading(false)

}

}



useEffect(()=>{

loadProfile()

},[id])


async function handleConnect(){

try{

await sendRequest(
user._id
)

setRequested(true)

toast.success(
"Connection request sent."
)

}
catch(error){

console.log(
"CONNECT ERROR",
error
)

toast.error(
"Unable to send request."
)

}

}

async function handleFollow(){


try{


if(following){

await unfollowUser(
user._id
)

setFollowing(false)

toast.success(
"Unfollowed successfully."
)

}

else{

await followUser(
user._id
)

setFollowing(true)

toast.success(
"Now following."
)

}


}

catch(error){

console.log(error)

toast.error(
"Something went wrong."
)

}

}





if(loading){

return(

<Layout>

<main className="profile-page">

<ProfileCompletion

user={user}

/>


<h2>
Loading Profile...
</h2>

</main>

</Layout>

)

}




if(!user){

return(

<Layout>

<main className="profile-page">

<h2>
User not found
</h2>

</main>

</Layout>

)

}




return(

<Layout>


<main className="profile-page">



<section className="profile-card">


<img

src={
user.image ||
"https://placehold.co/300"
}

alt="profile"

/>



<div className="profile-info">


<h1>
{user.name}
</h1>



<p>
🎓 {user.college || "Student"}
</p>



<p>
💻 {user.course || "Technology"}
</p>



<p>
✨ {user.bio || "Building connections"}
</p>





<div className="profile-buttons">


{

isOwnProfile

?

<Link
to="/edit-profile"
className="edit-btn"
>

Edit Profile

</Link>


:

<div className="profile-action-row">


<button

className={
following
?
"following-btn"
:
"follow-btn"
}

onClick={handleFollow}

>

{
following
?
"Following"
:
"Follow"
}

</button>



<Link

to={`/chat/${user._id}`}

className="message-btn"

>

Message

</Link>


<button

className="connect-profile-btn"

onClick={handleConnect}

disabled={requested || connected}

>

{
connected

?

"Connected ✓"

:

requested

?

"Request Sent ✓"

:

"Connect"

}

</button>


</div>

}



</div>


</div>


</section>








<section className="profile-stats">


<div>

<strong>
{user.followers?.length || 0}
</strong>

Followers

</div>



<div>

<strong>
{user.following?.length || 0}
</strong>

Following

</div>



<div>

<strong>
{user.friends?.length || 0}
</strong>

Connections

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

(user.interests || []).map(
(item:string)=>(

<span key={item}>
{item}
</span>

)

)

}

</div>

<section className="profile-section">

<ProfilePassions

user={user}

/>

</section>

</section>







<section className="profile-section">




<div className="profile-box">

{

user.communities?.length

?

user.communities.map(
(c:any)=>(

<span
key={c._id}
className="community-badge"
>

🌍 {c.name}

</span>

)
)

:

<p>
No communities yet
</p>

}


</div>


</section>


<section className="profile-section">

<ProfilePosts

user={user}

/>

</section>

<section className="profile-section">

<ProfileMutuals

user={user}

/>

</section>


<section className="profile-section">

<ProfileActivity

user={user}

/>

</section>

<section className="profile-section">

<ProfileCommunities

user={user}

/>

</section>

<ProfileActions

onInvite={()=>{
toast(
"Community invitations are coming soon 🌍"
)
}}

onDiscussion={()=>{
toast(
"Discussion rooms are coming soon 💭"
)
}}

/>



<section className="profile-section">

<ProfileThoughts

user={user}

/>

</section>

</main>


</Layout>

)

}


export default Profile