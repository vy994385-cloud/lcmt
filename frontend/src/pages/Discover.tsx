import { useState } from "react"
import Layout from "../components/Layout"
import { useApp } from "../context/AppContext"
import "./Discover.css"


function calculateCompatibility(
  currentUser:any,
  user:any
){

  let score = 30


  if(
    currentUser.college &&
    currentUser.college === user.college
  ){
    score += 20
  }


  if(
    currentUser.course &&
    currentUser.course === user.course
  ){
    score += 20
  }


  const commonInterests =
    currentUser.interests?.filter(
      (item:string)=>
        user.interests?.includes(item)
    ) || []


  score += commonInterests.length * 10



  const commonValues =
    currentUser.values?.filter(
      (item:string)=>
        user.values?.includes(item)
    ) || []


  score += commonValues.length * 10



  if(
    currentUser.personality &&
    user.personality &&
    currentUser.personality === user.personality
  ){
    score += 15
  }



  if(
    currentUser.lookingFor &&
    user.lookingFor &&
    currentUser.lookingFor === user.lookingFor
  ){
    score += 15
  }



  return score > 100 ? 100 : score

}




function getCommonInterests(
  currentUser:any,
  user:any
){

  return (
    currentUser.interests?.filter(
      (item:string)=>
        user.interests?.includes(item)
    ) || []
  )

}



function getCommonValues(
  currentUser:any,
  user:any
){

  return (
    currentUser.values?.filter(
      (item:string)=>
        user.values?.includes(item)
    ) || []
  )

}



function Discover(){


const {
  users,
  matches,
  passedUsers,
  likeUser,
  passUser
}=useApp()



const [revealedUsers,setRevealedUsers] =
useState<string[]>([])



const currentUser =
JSON.parse(
localStorage.getItem("user") || "{}"
)



function revealProfile(id:string){

 setRevealedUsers([
  ...revealedUsers,
  id
 ])

}




const availableUsers =
users.filter(
(user)=>

user.id !== currentUser._id &&

user.college &&
user.course &&
user.personality &&
user.interests &&
user.interests.length > 0 &&

!matches.some(
(match)=>match.id===user.id
)
&&

!passedUsers.some(
(passed)=>passed.id===user.id
)

)

return (

<Layout>

<main className="discover-page">


<h1 className="discover-title">

Discover Meaningful Connections ❤️

</h1>



<div className="discover-grid">


{

availableUsers.map((user)=>(


<div
key={user.id}
className="profile-card"
>


<div className="match-badge">

❤️ {
calculateCompatibility(
currentUser,
user
)
}% Compatible

</div>



{

!revealedUsers.includes(user.id)

?

<div className="thought-first-card">


<h3>
💭 Thought First
</h3>



<p>

"{user.personality ||
"Something meaningful about yourself?"}"

</p>



<button

onClick={()=>
revealProfile(user.id)
}

>

Reveal Profile ❤️

</button>



</div>


:


<>


<div className="image-container">


<img

className="profile-image"

src={
user.image ||
"https://picsum.photos/300"
}

alt={user.name}

/>



</div>




<div className="profile-content">


<h2>

{user.name}

</h2>



<p>

🎓 {user.college || "Student"}

</p>



<p>

💻 {user.course || "Student"}

</p>




{
user.bio &&

<p className="info">

{user.bio}

</p>

}



{

getCommonInterests(
currentUser,
user
).length > 0 &&


<div>

<h4>
Common Interests ✨
</h4>


{

getCommonInterests(
currentUser,
user
)
.map(
(item:string)=>(

<span
className="interest"
key={item}
>

{item}

</span>

)

)

}

</div>

}




{

getCommonValues(
currentUser,
user
).length > 0 &&


<div>

<h4>
Shared Values ❤️
</h4>


{

getCommonValues(
currentUser,
user
)
.map(
(item:string)=>(

<span
className="interest"
key={item}
>

{item}

</span>

)

)

}

</div>

}




<div className="action-buttons">


<button

className="pass-btn"

onClick={()=>
passUser(user)
}

>

❌ Pass

</button>



<button

className="like-btn"

onClick={()=>
likeUser(user)
}

>

❤️ Connect

</button>


</div>



</div>


</>

}


</div>


))

}


</div>


</main>


</Layout>

)

}


export default Discover