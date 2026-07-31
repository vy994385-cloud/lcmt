import {
  useState
} from "react"

import {
  MoreHorizontal
} from "lucide-react"

import toast from "react-hot-toast"

import {
  followUser,
  unfollowUser
} from "../../../services/followService"

import "./ProfileActions.css"


interface Props{

  user?:any

  isOwnProfile?:boolean

  onMessage?:()=>void

  onInvite?:()=>void

  onDiscussion?:()=>void

}



export default function ProfileActions({

  user,

  isOwnProfile=false,

  onMessage,

  onInvite,

  onDiscussion

}:Props){


const [following,setFollowing] =
useState(
  Array.isArray(user?.followers)
  &&
  user.followers.some(
    (id:any)=>
    String(id._id || id) ===
    String(JSON.parse(localStorage.getItem("user") || "{}")._id)
  )
)


const [menu,setMenu] =
useState(false)



async function toggleFollow(){

try{

if(!user?._id) return


if(following){

await unfollowUser(
user._id
)

setFollowing(false)

toast.success(
"Unfollowed"
)

}

else{

await followUser(
user._id
)

setFollowing(true)

toast.success(
"Following"
)

}


}

catch(error){

console.log(error)

toast.error(
"Action failed"
)

}

}




async function shareProfile(){

try{

await navigator.clipboard.writeText(
window.location.href
)

toast.success(
"Profile link copied 🔗"
)

}

catch{

toast.error(
"Copy failed"
)

}

}



function report(){

toast(
"Profile reported"
)

}



function block(){

toast(
"User blocked"
)

}



return(

<section className="profile-actions">


<div className="profile-action-row">


{

!isOwnProfile &&

<button

className={
following
?
"following-btn"
:
"follow-btn"
}

onClick={toggleFollow}

>

{
following
?
"✓ Following"
:
"＋ Follow"
}

</button>

}




{

!isOwnProfile &&

<button

onClick={onMessage}

>

💬 Message

</button>

}




<button

onClick={shareProfile}

>

🔗 Share

</button>




<button

onClick={onInvite}

>

🌍 Invite

</button>




<button

onClick={onDiscussion}

>

💭 Discuss

</button>




<div className="action-menu">


<button

onClick={()=>setMenu(!menu)}

>

<MoreHorizontal size={22}/>

</button>




{

menu &&

<div className="profile-menu">


<button onClick={shareProfile}>

Copy profile link

</button>



<button onClick={report}>

⚠️ Report

</button>



<button onClick={block}>

🚫 Block

</button>


</div>

}


</div>


</div>


</section>

)

}
