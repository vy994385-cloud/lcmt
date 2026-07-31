import "./GroupMembers.css"

interface Props {

  members:any[]

  onlineMembers?:string[]

  owner?:string

  admins?:string[]

  currentUser?:string

  onPromote?:(userId:string)=>void

  onDemote?:(userId:string)=>void

  onRemove?:(userId:string)=>void

}

function GroupMembers({

  members,

  onlineMembers=[],

  owner,

  admins=[],

  currentUser,

  onPromote,

  onDemote,

  onRemove

}:Props){

const isAdminUser=

(id:string)=>

admins.includes(id)

return(

<section className="group-members">

<h2>

Members ({members.length})

</h2>

<div className="members-list">

{

members.map((member:any)=>{

const memberId=String(member._id)

const isOwner=memberId===owner

const isModerator=isAdminUser(memberId)

const canManage=

currentUser===owner &&

memberId!==owner

return(

<div

className="member-item"

key={memberId}

>

<img

src={

member.image ||

"https://via.placeholder.com/40"

}

alt={member.name}

/>

<div className="member-info">

<strong>

{member.name}

</strong>

<p>

{member.bio || "Community member"}

</p>

<div className="member-role">

{

isOwner ?

"👑 Owner"

:

isModerator ?

"🛡 Moderator"

:

"👤 Member"

}

</div>

</div>

{

onlineMembers.includes(memberId) &&

<span className="online-dot">

●

</span>

}

{

canManage && (

<div className="member-actions">

{

!isModerator &&

<button

onClick={()=>

onPromote?.(memberId)

}

>

Promote

</button>

}

{

isModerator &&

<button

onClick={()=>

onDemote?.(memberId)

}

>

Demote

</button>

}

<button

onClick={()=>

onRemove?.(memberId)

}

>

Remove

</button>

</div>

)

}

</div>

)

})

}

</div>

</section>

)

}

export default GroupMembers