import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react"

import api from "../api/axios"
import socket from "../socket"
import toast from "react-hot-toast"

type User = {
  id: string
  name: string
  age: number
  bio: string
  image: string

  gender: string
  college: string
  course: string
  year: number

  interests: string[]
  values: string[]
  personality: string
  lookingFor: string
}

type Notification = {
  _id: string
  message: string
  read: boolean
  createdAt: string

  sender?: {
    name: string
    image?: string
  }
}

type AppContextType = {
  users: User[]
  matches: User[]
  passedUsers: User[]

  notifications: Notification[]
  unreadCount: number

  refreshUsers: () => Promise<void>
  refreshMatches: () => Promise<void>
  refreshNotifications: () => Promise<void>

  likeUser: (user: User) => Promise<void>
  passUser: (user: User) => void
}

const AppContext =
createContext<AppContextType | undefined>(
undefined
)

export function AppProvider({
children,
}:{
children:React.ReactNode
}){

const [users,setUsers]=
useState<User[]>([])

const [matches,setMatches]=
useState<User[]>([])

const [passedUsers,setPassedUsers]=
useState<User[]>([])

const [notifications,setNotifications]=
useState<Notification[]>([])

const [unreadCount,setUnreadCount]=
useState(0)

function formatUser(user:any):User{

return{

id:user._id,
name:user.name,
age:user.age,
bio:user.bio,

image:
user.image && user.image.trim() !== ""
? user.image
: "https://placehold.co/300x400?text=No+Photo",

gender:user.gender || "",
college:user.college || "",
course:user.course || "",
year:user.year || 1,

interests:user.interests || [],
values:user.values || [],
personality:user.personality || "",
lookingFor:user.lookingFor || ""

}

}

async function refreshUsers(){

if(!localStorage.getItem("token"))
return

try{

const response =
await api.get("/users/discover")

setUsers(
  (response.data.users || response.data).map(formatUser)
)

}
catch(error){

console.log(error)

}

}

async function refreshMatches(){

if(!localStorage.getItem("token"))
return

try{

const response =
await api.get("/users/matches")

setMatches(
  (response.data.matches || response.data).map(formatUser)
)

}
catch(error){

console.log(error)

}

}

async function refreshNotifications(){

if(!localStorage.getItem("token"))
return

try{

const response =
await api.get("/notifications")


const notificationList =
Array.isArray(response.data.notifications)
? response.data.notifications
: []


setNotifications(
notificationList
)


setUnreadCount(

response.data.unread ??
notificationList.filter(
(item:Notification)=>!item.read
).length

)


}
catch(error){

console.log(error)

}

}

useEffect(() => {

  refreshNotifications()

}, [])

useEffect(()=>{

const user =
JSON.parse(
localStorage.getItem("user") || "{}"
)

if(!user._id)
return

socket.emit(
"join",
user._id
)

socket.on(
"notification",
(notification:Notification)=>{

setNotifications(prev=>[
notification,
...prev
])

setUnreadCount(
count=>count+1
)

}
)

return()=>{

socket.off(
"notification"
)

}

},[])

async function likeUser(user:User){

try{

const response =
await api.post(
`/users/like/${user.id}`
)

toast.success(
response.data.message
)

setUsers(
previous=>
previous.filter(
person=>
person.id!==user.id
)
)

await refreshMatches()

}
catch(error){

console.log(error)

toast.error(
"Unable to send request."
)

}

}

function passUser(user:User){

setPassedUsers(
previous=>{

if(

previous.some(
person=>
person.id===user.id
)

){

return previous

}

return[
...previous,
user
]

}
)

setUsers(
previous=>
previous.filter(
person=>
person.id!==user.id
)
)

}

return(

<AppContext.Provider

value={{

users,
matches,
passedUsers,

notifications,
unreadCount,

refreshUsers,
refreshMatches,
refreshNotifications,

likeUser,
passUser

}}

>

{children}

</AppContext.Provider>

)

}

export function useApp(){

const context=
useContext(AppContext)

if(!context){

throw new Error(
"useApp must be used inside AppProvider"
)

}

return context

}