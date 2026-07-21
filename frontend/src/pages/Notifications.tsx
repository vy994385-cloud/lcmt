import {
useEffect,
useState
}
from "react"


import {

getPendingRequests,

acceptRequest,

rejectRequest

}
from "../utils/requests"



export default function Notifications(){



const user =
JSON.parse(

localStorage.getItem("user") || "{}"

)




const [requests,setRequests]=
useState<any[]>([])



function load(){


setRequests(

getPendingRequests(

user._id

)

)


}



useEffect(()=>{


load()


},[])




function accept(id:string){


acceptRequest(

id,

user._id

)


load()


}





function reject(id:string){


rejectRequest(

id,

user._id

)


load()


}





return (

<main className="notifications-page">


<h1>

Notifications 🔔

</h1>




<h2>

Friend Requests

</h2>



{

requests.length===0

?


<p>

No new requests

</p>



:


requests.map(request=>(


<div

className="request-card"

key={request.from}

>


<h3>

👤 User {request.from}

</h3>



<div>


<button

onClick={()=>
accept(request.from)
}

>

Accept

</button>



<button

onClick={()=>
reject(request.from)
}

>

Reject

</button>


</div>


</div>


))


}



</main>

)

}