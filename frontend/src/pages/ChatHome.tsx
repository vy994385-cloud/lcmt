import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import {
  Search,
  Plus,
  MessageCircle,
  X
} from "lucide-react"

import Layout from "../components/Layout"

import api from "../api/axios"

import "./ChatHome.css"



function ChatHome(){


const navigate = useNavigate()



const [
  conversations,
  setConversations
] = useState<any[]>([])



const [
  students,
  setStudents
] = useState<any[]>([])



const [
  search,
  setSearch
] = useState("")



const [
  newChatSearch,
  setNewChatSearch
] = useState("")
  


const [
  showModal,
  setShowModal
] = useState(false)



const [
  loading,
  setLoading
] = useState(true)




async function loadInbox(){

try{

const response =
await api.get("/chat")


setConversations(
response.data
)


}

catch(error){

console.log(
"Loading inbox failed",
error
)

}

finally{

setLoading(false)

}

}




async function loadStudents(){

try{


const response =
await api.get("/users")


setStudents(
response.data
)


}

catch(error){

console.log(
"Loading users failed",
error
)

}


}




useEffect(()=>{

loadInbox()

},[])





function openNewChat(){

setShowModal(true)

loadStudents()

}






const filteredChats =

conversations.filter(

(chat:any)=>

chat.user.name
.toLowerCase()
.includes(
search.toLowerCase()
)

)





const filteredStudents =

students.filter(

(user:any)=>

user.name
.toLowerCase()
.includes(
newChatSearch.toLowerCase()
)

)






return (

<Layout>


<main className="chat-home">



<div className="chat-header">


<h1>
💬 Messages
</h1>



<button

className="new-chat-btn"

onClick={openNewChat}

>

<Plus size={22}/>

</button>



</div>






<div className="chat-search">


<Search size={20}/>



<input

placeholder="Search conversations..."

value={search}

onChange={
(e)=>
setSearch(e.target.value)
}

/>


</div>







{

loading ?

<h3>
Loading chats...
</h3>



:


filteredChats.length === 0 ?


<div className="empty-chat">


<MessageCircle size={45}/>


<h2>
No conversations yet
</h2>


<p>
Start connecting with students ❤️
</p>


</div>



:



<section className="chat-list">


{

filteredChats.map(

(chat:any)=>(


<Link

to={`/chat/${chat.user._id}`}

className="chat-card"

key={
chat.user._id
}

>



<div className="avatar-wrapper">


<img

className="chat-avatar"

src={
chat.user.image ||
"https://placehold.co/100"
}

/>



<div className="online-dot"/>


</div>





<div className="chat-info">


<h3>

{chat.user.name}

</h3>


<p>

{chat.lastMessage}

</p>


</div>




<div className="chat-time">

{
new Date(
chat.time
)
.toLocaleTimeString(
[],
{
hour:"2-digit",
minute:"2-digit"
}
)
}

</div>



</Link>


)

)


}



</section>


}




{


showModal &&


<div className="modal-overlay">



<div className="new-chat-modal">



<div className="modal-header">


<h2>
➕ New Chat
</h2>


<button

onClick={
()=>setShowModal(false)
}

>

<X/>

</button>


</div>






<div className="chat-search">


<Search size={20}/>


<input

placeholder="Search students..."

value={newChatSearch}

onChange={
(e)=>
setNewChatSearch(
e.target.value
)
}

/>


</div>





<div className="student-list">


{

filteredStudents.map(

(user:any)=>(


<div

className="student-card"

key={user._id}

>


<img

src={
user.image ||
"https://placehold.co/100"
}

/>



<div>

<h3>
{user.name}
</h3>


<p>
{user.college}
</p>


</div>




<button

onClick={()=>{

navigate(
`/chat/${user._id}`
)

setShowModal(false)

}}

>

Chat

</button>



</div>


)

)


}



</div>



</div>



</div>


}



</main>


</Layout>

)

}



export default ChatHome