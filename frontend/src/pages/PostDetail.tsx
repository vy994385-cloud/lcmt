import {
  useEffect,
  useState
} from "react"

import {
  useParams
} from "react-router-dom"

import api from "../api/axios"

import Layout from "../components/Layout"

import PostCard from "../components/cards/PostCard/PostCard"


export default function PostDetail(){

const {id}=useParams()

const [post,setPost]=useState<any>(null)

const [loading,setLoading]=useState(true)



useEffect(()=>{

async function loadPost(){

try{

const {data}=await api.get(
`/feed/${id}`
)

setPost(data)

}

catch(error){

console.log(
"Post loading error",
error
)

}

finally{

setLoading(false)

}

}

if(id){

loadPost()

}

},[id])



if(loading){

return(

<Layout>

<div style={{
padding:"120px 30px",
textAlign:"center"
}}>

Loading post...

</div>

</Layout>

)

}



if(!post){

return(

<Layout>

<div style={{
padding:"120px 30px",
textAlign:"center"
}}>

Post not found

</div>

</Layout>

)

}



return(

<Layout>

<main
style={{
padding:"120px 30px",
maxWidth:"800px",
margin:"auto"
}}
>

<PostCard

post={post}

/>

</main>

</Layout>

)

}