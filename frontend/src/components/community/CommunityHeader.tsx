import { useState } from "react"

import "./CommunityHeader.css"



interface Props{

community:any

}



export default function CommunityHeader({

community

}:Props){



const storageKey =
"joinedCommunities"



const joinedList =
JSON.parse(
localStorage.getItem(storageKey) || "[]"
)



const [joined,setJoined] =
useState(

joinedList.includes(
community.id
)

)



const [members,setMembers] =
useState(
Number(
community.members.replace(/[^0-9]/g,"")
)
)



function toggleJoin(){


let updated = [...joinedList]



if(joined){

updated =
updated.filter(
id=>id!==community.id
)

setMembers(
members-1
)


}

else{

updated.push(
community.id
)

setMembers(
members+1
)

}



localStorage.setItem(

storageKey,

JSON.stringify(updated)

)


setJoined(!joined)


}





return (

<section className="community-header">



<div className="community-icon">

{community.icon}

</div>





<div className="community-info">


<h1>

{community.name}

</h1>



<p>

{members.toLocaleString()}
 members

</p>



</div>






<button

className={
joined
?
"joined"
:
"join"
}

onClick={toggleJoin}

>

{

joined

?

"✓ Joined"

:

"Join Community"

}


</button>



</section>

)

}