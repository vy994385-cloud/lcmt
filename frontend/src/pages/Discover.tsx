import { useState } from "react"
import Layout from "../components/Layout"
import { useApp } from "../context/AppContext"
import "./Discover.css"


function getId(user:any){
  return user.id || user._id
}



function calculateCompatibility(
  currentUser:any,
  user:any
){

  let score = 0


  // college match
  if(
    currentUser.college &&
    user.college &&
    currentUser.college.toLowerCase()
    ===
    user.college.toLowerCase()
  ){
    score += 25
  }


  // course match
  if(
    currentUser.course &&
    user.course &&
    currentUser.course.toLowerCase()
    ===
    user.course.toLowerCase()
  ){
    score += 25
  }



  // interests
  const commonInterests =
    currentUser.interests?.filter(
      (item:string)=>
        user.interests?.some(
          (x:string)=>
          x.toLowerCase()
          ===
          item.toLowerCase()
        )
    ) || []


  score += commonInterests.length * 10



  // values
  const commonValues =
    currentUser.values?.filter(
      (item:string)=>
        user.values?.includes(item)
    ) || []


  score += commonValues.length * 10



  // personality
  if(
    currentUser.personality &&
    user.personality
  ){

    const words =
      currentUser.personality
      .toLowerCase()
      .split(" ")


    const matches =
      words.filter(
        (word:string)=>
          user.personality
          .toLowerCase()
          .includes(word)
      )


    score += matches.length * 5
  }



  // minimum compatibility
  if(score === 0){
    score = 10
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
    )
    ||
    []
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
    )
    ||
    []
  )

}





function getCompatibilityReasons(
  currentUser:any,
  user:any
){

  const reasons:string[] = []


  if(
    currentUser.college === user.college
  ){
    reasons.push("🎓 Same College")
  }



  if(
    currentUser.course === user.course
  ){
    reasons.push("💻 Same Course")
  }



  const interests =
    getCommonInterests(
      currentUser,
      user
    )


  if(interests.length){

    reasons.push(
      `✨ ${interests.length} Common Interests`
    )

  }




  const values =
    getCommonValues(
      currentUser,
      user
    )


  if(values.length){

    reasons.push(
      `❤️ ${values.length} Shared Values`
    )

  }


  return reasons

}






function Discover(){


  const {
    users,
    matches,
    passedUsers,
    likeUser,
    passUser
  } = useApp()



  const [
    revealedUsers,
    setRevealedUsers
  ] = useState<string[]>([])



  const currentUser =
    JSON.parse(
      localStorage.getItem("user") || "{}"
    )




 function revealProfile(id:string){

setRevealedUsers(
(prev)=>
prev.includes(id)
?
prev
:
[
...prev,
id
]
)

}





  const availableUsers =
users
.filter(
(user:any)=>{

const id = getId(user)

return (
id !== getId(currentUser)
&&
!matches.some(
(match:any)=>
getId(match)===id
)
&&
!passedUsers.some(
(passed:any)=>
getId(passed)===id
)
)

}
)
.sort(
(a:any,b:any)=>
calculateCompatibility(
currentUser,
b
)
-
calculateCompatibility(
currentUser,
a
)
)


console.log(
  "CURRENT USER:",
  currentUser
)


console.log(
  "CURRENT PROFILE DATA:",
  JSON.stringify(
    {
      college: currentUser.college,
      course: currentUser.course,
      interests: currentUser.interests,
      values: currentUser.values,
      personality: currentUser.personality
    },
    null,
    2
  )
)


console.log(
  "Available Users:",
  availableUsers
)


console.log(
  "Available Users:",
  availableUsers
)





return (

<Layout>

<main className="discover-page">


<h1 className="discover-title">

Discover Meaningful Connections ❤️

</h1>




<div className="discover-grid">


{
availableUsers.map(

(user:any)=>{

console.log(
  "USER PROFILE:",
  user.name,
  user.college,
  user.course,
  user.interests,
  user.values
)

const id = getId(user)


return (

<div
className="profile-card"
key={id}
>




<div className="match-badge">

{
(()=>{
const score =
calculateCompatibility(
currentUser,
user
)

if(score>=90)
return `❤️ ${score}% Perfect Match`

if(score>=70)
return `💕 ${score}% Strong Match`

if(score>=40)
return `💫 ${score}% Good Match`

return `🌱 ${score}% New Connection`

})()
}

</div>





<div className="compatibility-reasons">


{

getCompatibilityReasons(
currentUser,
user
)
.map(

(reason:string)=>(

<p
key={`${id}-${reason}`}
>

{reason}

</p>

)

)

}


</div>






{

!revealedUsers.includes(id)

?

<div className="thought-first-card">


<h3>
💭 Thought First
</h3>


<p>

"
{
user.personality
||
user.bio
||
"Someone who is exploring life and new connections ❤️"
}

</p>



<button

onClick={
()=>revealProfile(id)
}

>

Reveal Profile ❤️

</button>


</div>



:

(

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
🎓 {user.college}
</p>



<p>
💻 {user.course}
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
)
.length > 0 &&


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

key={`${id}-interest-${item}`}

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
)
.length > 0 &&


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

key={`${id}-value-${item}`}

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

onClick={
()=>passUser(user)
}

>

❌ Pass

</button>




<button

className="like-btn"

onClick={
()=>likeUser(user)
}

>

❤️ Connect

</button>



</div>




</div>


</>

)


}



</div>


)

}

)


}



</div>


</main>


</Layout>


)

}


export default Discover