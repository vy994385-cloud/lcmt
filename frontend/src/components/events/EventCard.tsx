import { useMemo } from "react"
import {
  joinEvent,
  leaveEvent,
} from "../../services/eventService"

import "./EventCard.css"

type User = {
  _id: string
  name: string
  image?: string
}

type EventData = {
  _id: string
  title: string
  description: string
  image?: string
  location?: string
  startTime: string
  endTime: string
  attendees: User[]
  createdBy: User
  visibility: string
  community?: string
}

type Props = {
  event: EventData
  currentUserId: string
  onRefresh?: () => void
}

export default function EventCard({
  event,
  currentUserId,
  onRefresh,
}: Props) {

  const joined = useMemo(
    () =>
      event.attendees?.some(
        user => user._id === currentUserId
      ),
    [event, currentUserId]
  )

  const countdown = useMemo(() => {

    const now = Date.now()

    const start =
      new Date(
        event.startTime
      ).getTime()

    const diff = start - now

    if (diff <= 0)
      return "Live"

    const days =
      Math.floor(
        diff / 86400000
      )

    const hours =
      Math.floor(
        (diff % 86400000) /
        3600000
      )

    if (days > 0)
      return `${days} day${days > 1 ? "s" : ""} left`

    return `${hours} hour${hours !== 1 ? "s" : ""} left`

  }, [event.startTime])

  async function toggleJoin() {

    if (joined)
      await leaveEvent(event._id)

    else
      await joinEvent(event._id)

    onRefresh?.()

  }

  return (

    <div className="event-card">

      <img
        className="event-cover"
        src={
          event.image ||
          "https://picsum.photos/900/300"
        }
        alt={event.title}
      />

      <div className="event-content">

        <div className="event-top">

          <h2>
            {event.title}
          </h2>

          <span className="event-countdown">
            {countdown}
          </span>

        </div>

        <p>
          {event.description}
        </p>

        <div className="event-info">

          <span>
            📍 {event.location || "Online"}
          </span>

          <span>
            👥 {event.attendees.length}
          </span>

          <span>
            🌍 {event.visibility}
          </span>

        </div>

        <div className="event-host">

          <img
            src={
              event.createdBy.image ||
              "https://i.pravatar.cc/80"
            }
            alt=""
          />

          <span>
            {event.createdBy.name}
          </span>

        </div>

        <button
          onClick={toggleJoin}
        >
          {joined
            ? "Leave Event"
            : "Join Event"}
        </button>

      </div>

    </div>

  )

}