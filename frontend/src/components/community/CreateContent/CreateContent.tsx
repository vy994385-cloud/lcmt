import { useState } from "react"

import "./CreateContent.css"



interface Props {

  onCreate?: (post:any)=>void

}



export default function CreateContent({

  onCreate

}:Props){



const [open,setOpen] = useState(false)


const [type,setType] = useState("Discussion")


const [content,setContent] = useState("")



const types = [

"Discussion",

"Question",

"Poll",

"Event"

]





function createPost(){


if(!content.trim()) return



const newPost = {

id:Date.now().toString(),

type,

content,


author:{

name:"Vishal Yadav",

avatar:"https://i.pravatar.cc/150?img=12"

},


likes:0,

comments:0,

shares:0,


createdAt:new Date().toISOString()


}



onCreate?.(newPost)



setContent("")

setOpen(false)


}






return (

<div className="create-content">



<button

className="create-button"

onClick={()=>
setOpen(!open)
}

>

➕ Create

</button>





{

open &&

<div className="create-box">


<h3>

Create {type}

</h3>




<div className="content-types">


{

types.map(item=>(

<button

key={item}

className={
type===item
?
"selected-type"
:
""
}

onClick={()=>
setType(item)
}

>

{item}

</button>


))

}


</div>





<textarea

placeholder={`Create a ${type.toLowerCase()}...`}

value={content}

onChange={(e)=>
setContent(e.target.value)
}

/>





<button

className="post-button"

onClick={createPost}

>

Publish

</button>




</div>


}



</div>

)

}