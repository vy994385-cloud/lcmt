import {
  useState
} from "react"

import {
  MessageCircle,
  Heart
} from "lucide-react"

import {
  getAvatar
} from "../../../utils/avatar"

import "./CommentBox.css"


interface Props{

comments:any[]

value:string

setValue:(v:string)=>void

onSubmit:()=>void

}


export default function CommentBox({

comments,

value,

setValue,

onSubmit

}:Props){


const [liked,setLiked]=useState<number[]>([])



function likeComment(index:number){

setLiked(prev=>

prev.includes(index)

?

prev.filter(i=>i!==index)

:

[...prev,index]

)

}



return(

<div className="comment-box">


<div className="comment-input">


<input

value={value}

placeholder="Write a comment..."

onChange={
e=>setValue(e.target.value)
}

/>


<button onClick={onSubmit}>
Post
</button>


</div>



<div className="comment-list">


{

comments.map(

(c:any,index:number)=>(


<div

className="comment-item"

key={c._id || index}

>


<img

src={getAvatar(c.user || {})}

alt="avatar"

/>


<div className="comment-content">


<strong>
{
c.user?.name ||
"User"
}
</strong>


<p>
{c.text}
</p>


<div className="comment-actions">


<button
onClick={()=>
likeComment(index)
}
className={
liked.includes(index)
?
"liked"
:
""
}
>

<Heart size={15}/>

Like

</button>


<button>

<MessageCircle size={15}/>

Reply

</button>


</div>


</div>


</div>


)

)

}


</div>


</div>

)

}
