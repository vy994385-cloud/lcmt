import "./NotificationCard.css"
import { useNavigate } from "react-router-dom"

interface Props{
  notification:any
  onRead:(id:string)=>void
}

function getIcon(type:string){

  switch(type){

    case "message":
      return "💬"

    case "friend_request":
      return "🤝"

    case "friend_accept":
      return "🎉"

    case "community_invite":
      return "🌍"

    case "community_join":
      return "🌎"

    case "community_post":
      return "📝"

    case "community_announcement":
      return "📢"

    case "like":
    case "post_like":
      return "❤️"

    case "comment":
    case "post_comment":
      return "💭"

    case "follow":
      return "⭐"

    default:
      return "🔔"

  }

}

function getRelative(date:string){

  const now=Date.now()

  const then=new Date(date).getTime()

  const diff=Math.floor((now-then)/1000)

  if(diff<60) return "Just now"

  if(diff<3600) return `${Math.floor(diff/60)} min ago`

  if(diff<86400) return `${Math.floor(diff/3600)} hr ago`

  if(diff<172800) return "Yesterday"

  if(diff<604800) return `${Math.floor(diff/86400)} days ago`

  return new Date(date).toLocaleDateString()

}

export default function NotificationCard({

  notification,

  onRead

}:Props){

  const navigate=useNavigate()

  function handleClick(){

    onRead(notification._id)

    if(notification.post){

  const id =
    typeof notification.post === "object"
      ? notification.post._id
      : notification.post

  if(id){

    navigate(`/post/${id}`)

    return

  }

}
    if(notification.community){

      const id=

        typeof notification.community==="object"

        ?

        notification.community._id

        :

        notification.community

      if(id){

        navigate(`/community/${id}`)

        return

      }

    }

    switch(notification.type){

      case "message":

        navigate("/chat")

        break

      case "friend_request":

      case "friend_accept":

      case "follow":

        navigate("/network")

        break

      case "community_invite":

      case "community_join":

      case "community_post":

      case "community_announcement":

        navigate("/communities")

        break

      default:

        navigate("/notifications")

    }

  }

  return(

    <article

      className={

        notification.read

        ?

        "notification-card read"

        :

        "notification-card unread"

      }

      onClick={handleClick}

    >

      <div className="notification-avatar">

        <img

          src={

            notification.sender?.image ||

            "https://i.pravatar.cc/120"

          }

          alt="user"

        />

      </div>

      <div className="notification-body">

        <div className="notification-top">

          <span className="notification-type">

            {getIcon(notification.type)}

          </span>

          {

            !notification.read &&

            <span className="notification-dot"/>

          }

        </div>

        <h4>

          {notification.sender?.name || "Someone"}

        </h4>

        <p>

          {notification.message}

        </p>

        <small>

          {getRelative(notification.createdAt)}

        </small>

      </div>

    </article>

  )

}