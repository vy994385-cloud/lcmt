import {
getFriends
}
from "../utils/social"

import {
useEffect,
useState
}
from "react"



export default function Friends(){


const user =
JSON.parse(

localStorage.getItem("user") || "{}"

)



const [friends,setFriends]=
useState<string[]>([])



useEffect(()=>{


setFriends(

getFriends(user._id)

)


},[])





return (

<main className="social-page">


<h1>

Friends 🤝

</h1>



{

friends.length===0

?

<p>

No friends yet

</p>



:


friends.map(id=>(


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