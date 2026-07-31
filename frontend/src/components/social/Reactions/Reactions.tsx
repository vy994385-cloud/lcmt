import {
useState
} from "react"

import "./Reactions.css"


const reactions=[
"❤️",
"😂",
"🔥",
"👍",
"😮"
]


interface Props{

count?:number

}


export default function Reactions({

count=0

}:Props){


const [selected,setSelected]=useState("")

const [total,setTotal]=useState(count)



function react(item:string){

if(selected===item){

setSelected("")

setTotal(
Math.max(0,total-1)
)

}

else{

if(!selected){

setTotal(total+1)

}

setSelected(item)

}

}


return(

<div className="reaction-box">


{

reactions.map(item=>(

<button

key={item}

className={
selected===item
?
"selected"
:
""
}

onClick={()=>
react(item)
}

>

{item}

</button>

))

}


<span>

{total}

</span>


</div>

)

}
