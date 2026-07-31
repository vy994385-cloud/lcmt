import ProfileActions from "../ProfileActions/ProfileActions"

import "./ProfileQuickActions.css"


interface Props{

  user?:any

  isOwnProfile?:boolean

}



export default function ProfileQuickActions({

  user,

  isOwnProfile=false

}:Props){


function message(){

console.log(
"Open chat with user:",
user?._id
)

}



function invite(){

console.log(
"Invite user:",
user?._id
)

}



function discussion(){

console.log(
"Start discussion:",
user?._id
)

}



return(

<div className="profile-quick-actions">


{

isOwnProfile

?

<button className="action primary">

Edit Profile

</button>


:

<ProfileActions

user={user}

isOwnProfile={isOwnProfile}

onMessage={message}

onInvite={invite}

onDiscussion={discussion}

/>

}


</div>

)

}
