export interface Connection {

from:string

to:string

status:"pending" | "accepted"

}



export function getConnections():Connection[]{


return JSON.parse(

localStorage.getItem("connections") || "[]"

)


}



export function saveConnections(

data:Connection[]

){

localStorage.setItem(

"connections",

JSON.stringify(data)

)

}