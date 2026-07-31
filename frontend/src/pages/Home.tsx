import {
useEffect,
useState
} from "react"

import CreateContent from "../components/community/CreateContent/CreateContent"
import PostCard from "../components/cards/PostCard/PostCard"
import HomeSidebar from "../components/Home/HomeSidebar/HomeSidebar"

import api from "../api/axios"

import "./Home.css"



export default function Home(){


const [posts,setPosts]=useState<any[]>([])

const [loading,setLoading]=useState(true)

const [activeTab,setActiveTab]=useState(
"For You"
)



function formatPost(post:any){

return {

...post,

author:{

_id:post.user?._id,

name:post.user?.name || "User",

image:post.user?.image || "",

avatar:
post.user?.image ||
"https://i.pravatar.cc/100"

},

communityName:
post.community?.name || "Community",

commentList:
post.comments || []

}

}



function addNewPost(post:any){

setPosts(prev=>[
formatPost(post),
...prev
])

}



async function loadFeed(){

try{


const response =
await api.get("/feed")


const formatted =
response.data.map(formatPost)


setPosts(formatted)


}

catch(error){

console.log(
"Feed error:",
error
)

}

finally{

setLoading(false)

}

}



useEffect(()=>{

loadFeed()

},[])



return (

<div className="home-layout">



<main className="home-feed">


<div className="feed-tabs">


{
[
"For You",
"Following",
"Communities"
].map(tab=>(

<button

key={tab}

className={
activeTab===tab
?
"active"
:
""
}

onClick={()=>
setActiveTab(tab)
}

>

{tab}

</button>

))

}


</div>




<CreateContent

onCreate={addNewPost}

/>



<section className="feed-section">


{

loading ?

<p>
Loading feed...
</p>


:

posts.length===0 ?

<div className="empty-feed">

<h3>
Your feed is empty 🌱
</h3>

<p>
Follow people and join communities to start conversations.
</p>

</div>


:

posts.map(post=>(

<PostCard

key={post._id}

post={post}

/>

))


}


</section>


</main>



<HomeSidebar />


</div>

)

}
