import {
useEffect,
useState
} from "react"

import {
useLocation
} from "react-router-dom"

import {
getFollowers
} from "../services/profileService"

import "./Followers.css"

export default function Followers(){

const location = useLocation()

const currentUser =
JSON.parse(
localStorage.getItem("user") || "{}"
)

const userId =
new URLSearchParams(location.search).get("id")
||
currentUser._id

const [followers,setFollowers]=
useState<any[]>([])

useEffect(()=>{

async function load(){

try{

const data =
await getFollowers(userId)

setFollowers(data)

}

catch(error){

console.log(error)

}

}

load()

},[userId])

return(

<main className="social-page">

<h1>
Followers 👥
</h1>

{
followers.length===0
?

<p>No followers yet</p>

:

followers.map((person:any)=>(

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

<h3>{person.name}</h3>

<p>
{person.headline ||
person.bio ||
"LCMT Member"}
</p>

</div>

</div>

))

}

</main>

)

}