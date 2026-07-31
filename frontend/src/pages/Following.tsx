import {
useEffect,
useState
} from "react"

import {
getFollowing
} from "../services/profileService"

import "./Followers.css"



export default function Following(){


const user =
JSON.parse(
localStorage.getItem("user") || "{}"
)



const [following,setFollowing]=
useState<any[]>([])



useEffect(()=>{


async function load(){

try{

const data =
await getFollowing(
user._id
)

setFollowing(data)

}

catch(error){

console.log(error)

}

}


load()


},[])





return(

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

following.map(
(person:any)=>(

<div

key={person._id}

className="user-row"

>

<img

src={
person.image ||
"https://i.pravatar.cc/100"
}

alt={person.name}

/>


<div>

<h3>
{person.name}
</h3>

<p>
{person.headline ||
person.bio ||
"LCMT Member"
}
</p>

</div>


</div>

)

)

}


</main>

)

}