import { Link } from "react-router-dom"

interface Props{
  chats:any[]
}

export default function RecentChats({
  chats
}:Props){

  return(

    <section className="sidebar-card">

      <h3>💬 Recent Chats</h3>

      {

        chats.length===0 ?

        <p>No conversations yet.</p>

        :

        chats.slice(0,5).map((chat:any)=>(

          <Link
            key={chat._id}
            to={`/chat/${chat.user?._id || chat._id}`}
            className="sidebar-link"
          >

            {chat.user?.name || chat.name || "Conversation"}

          </Link>

        ))

      }

    </section>

  )

}