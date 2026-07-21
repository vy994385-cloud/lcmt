import {useParams} from "react-router-dom"

import posts from "../mock/posts"

import PostCard from "../components/cards/PostCard/PostCard"


function PostDetail(){

const {id}=useParams()


const post = posts.find(
p=>p.id===id
)


if(!post){

return(

<h2>
Post not found
</h2>

)

}


return(

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

)

}


export default PostDetail