import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  Search
} from "lucide-react"

import Layout from "../components/Layout"

import api from "../api/axios"

import "./NewChat.css"



function NewChat(){


const navigate = useNavigate()


const [
  users,
  setUsers
] = useState<any[]>([])



const [
  search,
  setSearch
] = useState("")



async function loadUsers(){

try{

const response =
await api.get("/users")


setUsers(response.data)


}

catch(error){

console.log(
"Loading users failed",
error
)

}

}



useEffect(()=>{

loadUsers()

},[])




const filteredUsers =

users.filter(

(user:any)=>

user.name
.toLowerCase()
.includes(
search.toLowerCase()
)

)





return (

<Layout>


<main className="new-chat-page">


<h1>
➕ New Chat
</h1>




<div className="chat-search">


<Search size={20}/>


<input

placeholder="Search students..."

value={search}

onChange={
(e)=>
setSearch(e.target.value)
}

/>


</div>





<div className="users-list">


{

filteredUsers.map(

(user:any)=>(


<div

className="new-user-card"

key={user._id}

>


<img

src={
user.image ||
"https://placehold.co/100"
}

/>




<div className="user-details">


<h3>
{user.name}
</h3>


<p>
{user.college || "Student"}
</p>


</div>





<button

onClick={()=>{

navigate(
`/chat/${user._id}`
)

}}

>

Chat

</button>




</div>


)

)


}



</div>



</main>


</Layout>

)

}



export default NewChat