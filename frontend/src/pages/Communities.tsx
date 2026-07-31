import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import api from "../api/axios"
import Layout from "../components/Layout"

import "./Communities.css"


function Communities(){

const [communities,setCommunities]=useState<any[]>([])

const [search,setSearch]=useState("")

const [category,setCategory]=useState("All")

const [loadingId,setLoadingId]=useState<string|null>(null)


const navigate=useNavigate()


const user =
JSON.parse(
localStorage.getItem("user") || "{}"
)



async function fetchCommunities(){

try{

const res =
await api.get("/communities")

setCommunities(res.data)

}

catch{

toast.error(
"Unable to load communities"
)

}

}



useEffect(()=>{

fetchCommunities()

},[])




async function joinCommunity(id:string){

try{

setLoadingId(id)


await api.post(
`/communities/${id}/join`
)


toast.success(
"Joined community 🎉"
)


fetchCommunities()


}

catch(error:any){

toast.error(
error.response?.data?.message ||
"Something went wrong"
)

}

finally{

setLoadingId(null)

}

}




const categories=[
"All",
...Array.from(
new Set(
communities.map(
(c)=>c.category
)
)
)
]



const filtered =
communities.filter(
(c)=>

c.name
.toLowerCase()
.includes(
search.toLowerCase()
)

&&

(category==="All" ||
c.category===category)

)




return(

<Layout>

<main className="communities-page">


<section className="community-header">


<div>

<h1>
🌍 Explore Communities
</h1>


<p>
Discover people, ideas and groups
around your interests.
</p>


</div>


<button
onClick={()=>
navigate("/communities/create")
}
>

+ Create Community

</button>


</section>



<div className="community-tools">


<input

placeholder="Search communities..."

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

/>



<div className="category-list">


{
categories.map(cat=>(

<button

key={cat}

className={
category===cat
?
"active"
:
""
}

onClick={()=>
setCategory(cat)
}

>

{cat}

</button>

))

}


</div>


</div>





<div className="community-grid">


{
filtered.map(
community=>(


<div

key={community._id}

className="community-card"

onClick={()=>
navigate(`/community/${community._id}`)
}

>


<div className="community-icon">

{community.icon}

</div>



<span className="category">

{community.category}

</span>



<h2>

{community.name}

</h2>



<p>

{community.description}

</p>



<div className="members">

👥 {community.members?.length || 0} Members

</div>



{
community.members?.some(
(m:any)=>
m._id===user._id
)

?

<button
disabled
onClick={(e)=>
e.stopPropagation()
}
>

✓ Joined

</button>


:

<button

disabled={
loadingId===community._id
}

onClick={(e)=>{

e.stopPropagation()

joinCommunity(
community._id
)

}}

>

{
loadingId===community._id
?
"Joining..."
:
"Join Community"
}


</button>

}


</div>


)

)

}


</div>


</main>

</Layout>

)

}


export default Communities