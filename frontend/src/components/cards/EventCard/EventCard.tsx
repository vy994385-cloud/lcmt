import {
  Calendar,
  Clock,
  MapPin,
  Users
} from "lucide-react"

import Card from "../../ui/Card/Card"
import Button from "../../ui/Button/Button"

import type { Event } from "../../../types/Event"

import "./EventCard.css"

interface Props{
  event: Event
}

function EventCard({
  event
}:Props){

  return(

    <Card className="event-card">

      <div className="event-top">

        <div>

          <h3>
            {event.title}
          </h3>

          <span className="community-name">

            {event.community}

          </span>

        </div>

      </div>

      <div className="event-details">

        <div>

          <Calendar size={16}/>

          <span>{event.date}</span>

        </div>

        <div>

          <Clock size={16}/>

          <span>{event.time}</span>

        </div>

        <div>

          <MapPin size={16}/>

          <span>{event.location}</span>

        </div>

        <div>

          <Users size={16}/>

          <span>{event.attendees} attending</span>

        </div>

      </div>

      <Button>

        Join Event

      </Button>

    </Card>

  )

}

export default EventCard