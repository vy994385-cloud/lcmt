import { useEffect,useState } from "react"

import api from "../api/axios"

import Layout from "../components/Layout"

import StudentCard from "../components/discover/StudentCard"

import "./Discover.css"



export default function Discover(){



const [students,setStudents]=

useState<any[]>([])



const [search,setSearch]=

useState("")





useEffect(()=>{


async function load(){


try{


const response=

await api.get("/users/discover")


setStudents(

Array.isArray(response.data)

?

response.data

:

[]

)


}

catch(error){

console.log(error)

}



}


load()



},[])







const filtered =

students.filter(

(student)=>

student.name

?.toLowerCase()

.includes(

search.toLowerCase()

)

)







return (

<Layout>


<main className="discover-page">


<h1>

🌍 Discover Students

</h1>



<p>

Find students, creators and future teammates.

</p>




<input

placeholder="Search students..."

value={search}

onChange={

e=>setSearch(e.target.value)

}

/>





<div className="student-grid">


{

filtered.length===0

?

<p>

No students found 🚀

</p>


:

filtered.map(

student=>(


<StudentCard

key={student._id}

user={student}

/>


)

)


}


</div>



</main>


</Layout>

)

}