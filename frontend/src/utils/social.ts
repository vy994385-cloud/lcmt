import {
getConnections
} from "./connections"



export function getFollowers(userId:string){


return getConnections()

.filter(

c=>

c.to===userId &&
c.status==="accepted"

)

.map(c=>c.from)


}




export function getFollowing(userId:string){


return getConnections()

.filter(

c=>

c.from===userId &&
c.status==="accepted"

)

.map(c=>c.to)


}





export function getFriends(userId:string){


const followers =
getFollowers(userId)


const following =
getFollowing(userId)



return following.filter(

id=>

followers.includes(id)

)


}