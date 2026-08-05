import {
useEffect,
useState
} from "react"

import {
followUser,
unfollowUser,
getFollowers
} from "../../../services/followService"

import "./FollowButton.css"


interface Props{

id:string

onClick?:(
e:React.MouseEvent<HTMLButtonElement>
)=>void

}


export default function FollowButton({

id,
onClick

}:Props){


const currentUser =
JSON.parse(
localStorage.getItem("user") || "{}"
)


const [following,setFollowing]=useState(false)

const [loading,setLoading]=useState(true)



useEffect(()=>{


async function checkStatus(){


if(
!id ||
String(id) === String(currentUser._id)
){

setLoading(false)

return

}


try{


const followers =
await getFollowers(id)


const exists =
Array.isArray(followers)
&&
followers.some(
(user:any)=>
String(
user._id || user
)
===
String(currentUser._id)
)


setFollowing(exists)


}

catch(error){

console.log(error)

}


finally{

setLoading(false)

}


}


checkStatus()


},[id])



async function toggleFollow(
e:React.MouseEvent<HTMLButtonElement>
){


e.stopPropagation()


if(onClick){

onClick(e)

}


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



if(
String(id) === String(currentUser._id)
){

return null

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

loading

?

"..."

:

following

?

"Following"

:

"Follow"

}


</button>

)

}
