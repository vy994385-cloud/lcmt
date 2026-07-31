import {
  useState
} from "react"

import "./FriendRequestCard.css"



interface FriendRequestCardProps {

  id?: string

  name: string

  image?: string

  bio?: string

  interests?: string[]

  common?: string

  status?:
    | "request"
    | "suggestion"
    | "community"

  onAccept?: () => void

  onReject?: () => void

  onConnect?: () => void

  onJoin?: () => void

  onViewProfile?: () => void

}



export default function FriendRequestCard({

  id,

  name,

  image,

  bio,

  interests = [],

  common,

  status = "request",

  onAccept,

  onReject,

  onConnect,

  onJoin,

  onViewProfile

}:FriendRequestCardProps){



const [
loading,
setLoading
]=useState(false)



const [
completed,
setCompleted
]=useState(false)





async function handleAccept(){

setLoading(true)

try{

await onAccept?.()

setCompleted(true)

}

finally{

setLoading(false)

}

}





async function handleConnect(){

setLoading(true)

try{

await onConnect?.()

setCompleted(true)

}

finally{

setLoading(false)

}

}





async function handleJoin(){

setLoading(true)

try{

await onJoin?.()

setCompleted(true)

}

finally{

setLoading(false)

}

}







return(

<div

className="friend-request-card"

data-id={id}

>



<img

src={
image ||
"https://i.pravatar.cc/150"
}

alt={name}

className="friend-avatar"

/>





<div className="friend-info">



<h3>

{name}

</h3>





{

bio &&

<p className="friend-bio">

{bio}

</p>

}





{

interests.length>0 &&

<div className="interest-list">


{

interests.map(
(item,index)=>(

<span key={index}>

{item}

</span>

)

)

}


</div>

}





{

common &&

<p className="common-text">

✨ Common: {common}

</p>

}





<div className="friend-actions">





{

onViewProfile &&

<button

className="profile-btn"

onClick={onViewProfile}

>

View Profile

</button>

}





{

status==="request" &&

<>


<button

className="accept-btn"

disabled={
loading ||
completed
}

onClick={handleAccept}

>


{

completed

?

"Connected ✓"

:

loading

?

"Connecting..."

:

"Connect"

}


</button>





<button

className="reject-btn"

disabled={loading}

onClick={onReject}

>

Ignore

</button>


</>

}







{

status==="suggestion" &&

<button

className="connect-btn"

disabled={
loading ||
completed
}

onClick={handleConnect}

>


{

completed

?

"Request Sent ✓"

:

loading

?

"Sending..."

:

"Connect"

}


</button>

}







{

status==="community" &&

<button

className="join-btn"

disabled={
loading ||
completed
}

onClick={handleJoin}

>


{

completed

?

"Joined ✓"

:

loading

?

"Joining..."

:

"Join Community"

}


</button>

}



</div>


</div>


</div>

)

}