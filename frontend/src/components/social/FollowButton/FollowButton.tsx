import {
useState
} from "react"

import {
followUser,
unfollowUser
} from "../../../services/followService"

import "./FollowButton.css"


interface Props{

id:string

}


export default function FollowButton({

id

}:Props){


const [following,setFollowing]=useState(false)

const [loading,setLoading]=useState(false)



async function toggleFollow(){

if(loading) return


try{

setLoading(true)


if(following){

await unfollowUser(id)

setFollowing(false)

}

else{

await followUser(id)

setFollowing(true)

}


}

catch(error){

console.log(error)

}

finally{

setLoading(false)

}

}



return(

<button

className={
following
?
"follow-btn following"
:
"follow-btn"
}

onClick={toggleFollow}

disabled={loading}

>

{
following
?
"Following"
:
"Follow"
}

</button>

)

}
