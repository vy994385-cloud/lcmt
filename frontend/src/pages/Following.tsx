import {
getFollowing
}
from "../utils/social"

import {
useEffect,
useState
}
from "react"



export default function Following(){


const user =
JSON.parse(

localStorage.getItem("user") || "{}"

)


const [following,setFollowing]=
useState<string[]>([])



useEffect(()=>{


setFollowing(

getFollowing(user._id)

)


},[])





return (

<main className="social-page">


<h1>

Following ❤️

</h1>



{

following.length===0

?

<p>

Not following anyone

</p>


:


following.map(id=>(


<div

key={id}

className="user-row"

>

User {id}

</div>


))


}



</main>

)

}