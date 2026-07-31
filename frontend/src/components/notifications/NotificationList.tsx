import { useMemo, useState } from "react"

import NotificationCard from "./NotificationCard"

import "./NotificationList.css"

interface Props {
  notifications: any[]
  onRead: (id: string) => void
}

type Filter =
  | "all"
  | "unread"
  | "messages"
  | "connections"
  | "communities"

export default function NotificationList({
  notifications,
  onRead
}: Props) {

  const [filter, setFilter] =
    useState<Filter>("all")

  const filtered =
    useMemo(() => {

      switch (filter) {

        case "unread":
          return notifications.filter(
            n => !n.read
          )

        case "messages":
          return notifications.filter(
            n => n.type === "message"
          )

        case "connections":
          return notifications.filter(
            n =>
              [
                "friend_request",
                "friend_accept",
                "follow"
              ].includes(n.type)
          )

        case "communities":
          return notifications.filter(
            n =>
              String(n.type).startsWith(
                "community"
              )
          )

        default:
          return notifications

      }

    }, [notifications, filter])

  const unread =
    notifications.filter(
      n => !n.read
    ).length

  return (

    <section className="notification-list">

      <div className="notification-list-header">

        <div>

          <h2>
            Inbox
          </h2>

          <p>

            {notifications.length}
            {" "}
            notifications •
            {" "}
            {unread}
            {" "}
            unread

          </p>

        </div>

        <div className="notification-filter-bar">

          <button
            onClick={() => setFilter("all")}
            className={
              filter === "all"
                ? "active"
                : ""
            }
          >
            All
          </button>

          <button
            onClick={() => setFilter("unread")}
            className={
              filter === "unread"
                ? "active"
                : ""
            }
          >
            Unread
          </button>

          <button
            onClick={() => setFilter("messages")}
            className={
              filter === "messages"
                ? "active"
                : ""
            }
          >
            Messages
          </button>

          <button
            onClick={() => setFilter("connections")}
            className={
              filter === "connections"
                ? "active"
                : ""
            }
          >
            Network
          </button>

          <button
            onClick={() => setFilter("communities")}
            className={
              filter === "communities"
                ? "active"
                : ""
            }
          >
            Communities
          </button>

        </div>

      </div>

      {

        filtered.length === 0

          ? (

            <div className="notification-empty">

              <div className="notification-empty-icon">
                🔔
              </div>

              <h3>
                No notifications
              </h3>

              <p>

                You're all caught up.

              </p>

            </div>

          )

          : (

            filtered.map(notification => (

              <NotificationCard
                key={notification._id}
                notification={notification}
                onRead={onRead}
              />

            ))

          )

      }

    </section>

  )

}