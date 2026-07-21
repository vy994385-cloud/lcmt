import {
getFollowers
}
from "../utils/social"

import {useEffect,useState} from "react"



export default function Followers(){


const user =
JSON.parse(

localStorage.getItem("user") || "{}"

)


const [followers,setFollowers]=
useState<string[]>([])



useEffect(()=>{


setFollowers(

getFollowers(user._id)

)


},[])





return (

<main className="social-page">


<h1>

Followers 👥

</h1>



{

followers.length===0

?

<p>

No followers yet

</p>



:

followers.map(id=>(


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