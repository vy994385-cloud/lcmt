import { useState } from "react"

import {
Heart,
MessageCircle,
Share2,
Bookmark
} from "lucide-react"

import "./PostCard.css"



interface Props{

post:any

}



export default function PostCard({

post

}:Props){



const [likes,setLikes]=useState(
post.likes || 0
)


const [liked,setLiked]=useState(false)


const [showComments,setShowComments]=useState(false)


const [saved,setSaved]=useState(false)


const [comment,setComment]=useState("")


const [comments,setComments]=useState<any[]>(
post.commentList || []
)





function likePost(){

setLiked(!liked)

setLikes(

liked
?
likes-1
:
likes+1

)

}





function addComment(){

if(!comment.trim())
return


setComments([

...comments,

{

id:Date.now(),

text:comment,

author:"Vishal Yadav"

}

])


setComment("")

}





return (

<article className="post-card">





<div className="post-header">


<img

src={
post.author?.avatar ||
"https://i.pravatar.cc/100"
}

alt="avatar"

/>



<div>

<h4>

{
post.author?.name ||
"Anonymous"
}

</h4>


<span>

{
new Date(
post.createdAt || Date.now()
)
.toLocaleDateString()

}

</span>


</div>


</div>







{

post.type &&

<div className="post-type">

{post.type}

</div>

}







<p className="post-content">

{post.content}

</p>








<div className="post-actions">



<button

className={
liked
?
"active-action"
:
""
}

onClick={likePost}

>

<Heart size={18}/>

{likes}

</button>






<button

onClick={()=>
setShowComments(!showComments)
}

>

<MessageCircle size={18}/>

{comments.length}

</button>







<button>

<Share2 size={18}/>

Share

</button>






<button

className={
saved
?
"active-action"
:
""
}

onClick={()=>
setSaved(!saved)
}

>

<Bookmark size={18}/>

</button>




</div>







{

showComments &&

<div className="comments-section">


<div className="comment-input">


<input

placeholder="Write a comment..."

value={comment}

onChange={(e)=>
setComment(e.target.value)
}

/>



<button

onClick={addComment}

>

Post

</button>


</div>






{

comments.map(c=>(


<div

key={c.id}

className="comment"

>


<strong>

{c.author}

</strong>


<p>

{c.text}

</p>


</div>


))


}



</div>


}





</article>

)

}