import { useEffect, useMemo, useState } from "react"

import EventCard from "../components/events/EventCard"

import { getEvents } from "../services/eventService"

import "./Events.css"

type User={
  _id:string
  name:string
  image?:string
}

type EventData={

  _id:string

  title:string

  description:string

  image?:string

  location?:string

  startTime:string

  endTime:string

  visibility:string

  createdBy:User

  attendees:User[]

}

export default function Events(){

const [events,setEvents]=
useState<EventData[]>([])

const [loading,setLoading]=
useState(true)

const [search,setSearch]=
useState("")

const currentUserId=
JSON.parse(
localStorage.getItem("user")||"{}"
)._id || ""

async function load(){

try{

const res=
await getEvents()

setEvents(res.data)

}
finally{

setLoading(false)

}

}

useEffect(()=>{

load()

},[])

const filtered=
useMemo(()=>{

return events.filter(event=>

event.title
.toLowerCase()
.includes(
search.toLowerCase()
)

)

},[events,search])

return(

<div className="events-page">

<h1>
Upcoming Events
</h1>

<input

placeholder="Search events..."

value={search}

onChange={e=>

setSearch(
e.target.value
)

}

/>

{loading &&

<p>
Loading...
</p>

}

{

filtered.map(event=>

<EventCard

key={event._id}

event={event}

currentUserId={
currentUserId
}

onRefresh={load}

/>

)

}

</div>

)

}