import { useState } from "react"

import api from "../../api/axios"

import "./PostCard.css"



interface Props {

  post:any

}





export default function PostCard({

  post

}:Props){



const [liked,setLiked] =
useState(

post.likes?.length > 0

)



const [likes,setLikes] =
useState(

Array.isArray(post.likes)

?
post.likes.length
:
post.likes || 0

)



const [showComment,setShowComment] =
useState(false)



const [comment,setComment] =
useState("")



const [comments,setComments] =
useState<any[]>(

post.comments || []

)





async function handleLike(){


try{


setLiked(prev=>!prev)


setLikes((prev:number)=>

liked

?
prev-1

:
prev+1

)



await api.put(

`/community-feed/like/${post._id || post.id}`

)



}

catch(error){

console.log(error)

}

}





async function addComment(){


if(!comment.trim()) return



try{


const response =

await api.post(

`/community-feed/comment/${post._id || post.id}`,

{

text:comment

}

)



setComments(

response.data.comments ||

[

...comments,

comment

]

)



setComment("")



}

catch(error){

console.log(error)

}


}







async function handleShare(){


try{

await navigator.clipboard.writeText(
window.location.href
)

alert(
"Link copied"
)

}

catch{

alert(
"Unable to copy"
)

}


}






return (

<article className="post-card">



<header className="post-header">


<div className="post-avatar">


{

post.author?.name

?

post.author.name.charAt(0)

:

"👤"

}


</div>



<div className="post-user-info">


<h3>


{

post.author?.name

||

post.author

||

"Community Member"

}


</h3>



<p>

{

post.community?.name

||

"Community"

}


{

post.createdAt &&

` • ${post.createdAt}`

}


</p>


</div>


</header>





<section className="post-content">


<p>

{

post.content

||

post.text

||

""

}

</p>


</section>





{

post.tags?.length > 0 &&


<div className="post-tags">


{

post.tags.map(

(tag:string)=>(

<span key={tag}>

#{tag}

</span>

)

)

}


</div>


}






<div className="post-stats">


<span>

❤️ {likes}

</span>


<span>

💬 {comments.length}

</span>


</div>






<div className="post-actions">


<button

className={liked ? "liked":""}

onClick={handleLike}

>

{

liked

?

"❤️ Liked"

:

"🤍 Like"

}


</button>




<button

onClick={()=>setShowComment(!showComment)}

>

💬 Comment

</button>




<button

onClick={handleShare}

>

📤 Share

</button>



</div>








{

showComment &&


<div className="comment-box">



<input


value={comment}


onChange={e=>

setComment(e.target.value)

}


placeholder="Write a comment..."



/>



<button

onClick={addComment}

>

Post

</button>





{

comments.map(

(item:any,index)=>(


<p key={index}>

💬 {item.text || item}

</p>


)

)


}



</div>



}



</article>

)

}