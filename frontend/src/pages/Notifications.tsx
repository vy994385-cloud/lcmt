import {
  useEffect,
  useMemo,
  useState
} from "react"

import Layout from "../components/Layout"

import NotificationList from "../components/notifications/NotificationList"

import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead
} from "../services/notificationService"

import {
  useNotifications
} from "../context/NotificationContext"

import "./Notifications.css"



type Filter =
  | "all"
  | "unread"
  | "message"
  | "connection"
  | "community"




function Notifications(){


const [
  notifications,
  setNotifications
] = useState<any[]>([])

const {
  latestNotification,
  clearUnread
}=useNotifications()

const [
  loading,
  setLoading
] = useState(true)



const [
  filter,
  setFilter
] = useState<Filter>("all")





useEffect(()=>{

clearUnread()

loadNotifications()

},[])


useEffect(()=>{


if(!latestNotification){

return

}


setNotifications(prev=>{


const exists =
prev.some(
item =>
item._id === latestNotification._id
)


if(exists){

return prev

}


return [
latestNotification,
...prev
]


})


},[
latestNotification
])








async function loadNotifications(){


try{


setLoading(true)


const data =
await getNotifications()



setNotifications(
Array.isArray(data)
?
data
:
[]
)


}

catch(error){


console.log(
"Notification loading error:",
error
)


}

finally{


setLoading(false)


}


}








async function handleRead(
id:string
){


try{


await markNotificationRead(id)



setNotifications(prev=>

prev.map(item=>

item._id === id

?

{
...item,
read:true
}

:

item

)

)


}

catch(error){


console.log(error)


}


}








async function handleReadAll(){


try{

  clearUnread()


await markAllNotificationsRead()



setNotifications(prev=>

prev.map(item=>({

...item,

read:true

}))

)


}

catch(error){


console.log(error)


}


}








const unreadCount =

notifications.filter(

item =>
!item.read

).length









const filtered =

useMemo(()=>{


switch(filter){


case "unread":

return notifications.filter(
n=>!n.read
)



case "message":

return notifications.filter(
n=>n.type==="message"
)



case "community":

return notifications.filter(

n=>

String(n.type)
.includes(
"community"
)

)



case "connection":

return notifications.filter(

n=>

n.type==="friend_request"
||
n.type==="friend_accept"

)



default:

return notifications


}



},[
notifications,
filter
])








return (

<Layout>


<main className="notifications-page">



<section className="notifications-hero">


<div>


<h1>
Notifications
</h1>


<p>

Stay updated with conversations,
communities and new connections.

</p>


</div>




<div className="hero-stats">


<div>

<strong>

{notifications.length}

</strong>

<span>
Total
</span>

</div>




<div>

<strong>

{unreadCount}

</strong>

<span>
Unread
</span>

</div>



</div>


</section>








<section className="notification-toolbar">



<div className="notification-filters">


<button

onClick={()=>
setFilter("all")
}

className={
filter==="all"
?
"active"
:
""
}

>

All

</button>





<button

onClick={()=>
setFilter("unread")
}

className={
filter==="unread"
?
"active"
:
""
}

>

Unread

</button>





<button

onClick={()=>
setFilter("message")
}

className={
filter==="message"
?
"active"
:
""
}

>

Messages

</button>





<button

onClick={()=>
setFilter("connection")
}

className={
filter==="connection"
?
"active"
:
""
}

>

Connections

</button>





<button

onClick={()=>
setFilter("community")
}

className={
filter==="community"
?
"active"
:
""
}

>

Communities

</button>


</div>







<button

className="read-all-btn"

onClick={handleReadAll}

disabled={
unreadCount===0
}

>

Mark all as read

</button>




</section>









{

loading

?

<div className="notification-loading">

Loading notifications...

</div>


:


<NotificationList

notifications={filtered}

onRead={handleRead}

/>


}



</main>


</Layout>

)


}



export default Notifications