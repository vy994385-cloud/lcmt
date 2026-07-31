import Avatar from "../../ui/Avatar/Avatar"

interface Props{

chatUser:any

isTyping:boolean

showMenu:boolean

setShowMenu:(value:boolean)=>void

openProfile:()=>void

}

export default function ChatHeader({

chatUser,

isTyping,

showMenu,

setShowMenu,

openProfile

}:Props){

return(

<header className="chat-header">

<div className="chat-user">

<Avatar

src={chatUser?.image}

size={58}

online={chatUser?.isOnline}

/>

<div>

<h2>

{chatUser?.name || "Chat"}

</h2>

<p>

{

isTyping

?

"✍️ Typing..."

:

chatUser?.isOnline

?

"🟢 Online"

:

"Offline"

}

</p>

</div>

</div>

<button

className="icon-btn"

onClick={()=>setShowMenu(!showMenu)}

>

⋮

</button>

{

showMenu &&

<div className="menu-dropdown">

<button

onClick={openProfile}

>

👤 Profile

</button>

<button>

👥 Create Group

</button>

</div>

}

</header>

)

}