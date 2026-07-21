import { useState } from "react"

import {
  sendRequest
} from "../../utils/requests"


import {
  getConnections
} from "../../utils/connections"

import "./ConnectButton.css"


interface Props {

  userId:string

}



export default function ConnectButton({
  userId
}:Props){


const currentUser =

JSON.parse(
localStorage.getItem("user") || "{}"
)



const existing =

getConnections().find(

connection =>

(
connection.from === currentUser._id &&
connection.to === userId
)

)



const [status,setStatus] =

useState(

existing?.status || "none"

)





function handleConnect(){


if(!currentUser._id)
return



sendRequest(

currentUser._id,

userId

)



setStatus("pending")



}




if(status==="accepted"){


return (

<button

className="connected"

>

👥 Friends

</button>

)

}




if(status==="pending"){


return (

<button

className="requested"

>

⏳ Requested

</button>

)

}





return (

<button

className="connect-btn"

onClick={handleConnect}

>

❤️ Connect

</button>

)


}