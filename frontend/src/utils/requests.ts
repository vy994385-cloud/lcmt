import type { Connection } from "./connections"

import {
  getConnections,
  saveConnections
} from "./connections"



export function getPendingRequests(

userId:string

):Connection[]{


return getConnections()

.filter(

(item)=>

item.to===userId &&

item.status==="pending"

)

}





export function sendRequest(

from:string,

to:string

){


const connections = getConnections()



const exists = connections.find(

(item)=>

item.from===from &&

item.to===to

)



if(exists)

return



const updated:Connection[] = [

...connections,

{

from,

to,

status:"pending"

}

]



saveConnections(updated)


}








export function acceptRequest(

from:string,

to:string

){


const connections = getConnections()



const updated: Connection[] = [

  ...connections,

  {
    from,
    to,
    status: "pending" as "pending"
  }

]



saveConnections(updated)


}







export function rejectRequest(

from:string,

to:string

){


const connections = getConnections()



const updated =

connections.filter(

(item)=>

!(

item.from===from &&

item.to===to

)

)



saveConnections(updated)


}