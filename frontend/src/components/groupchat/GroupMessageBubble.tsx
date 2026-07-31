type Props = {
  mine: boolean

  sender: string

  text: string

  time: string

  avatar?: string
}

export default function GroupMessageBubble({
  mine,
  sender,
  text,
  time,
  avatar,
}: Props) {
  return (
    <div
      className={
        mine
          ? "group-message mine"
          : "group-message"
      }
    >
      {!mine && (
        <img
          className="message-avatar"
          src={
            avatar ||
            "https://placehold.co/40"
          }
          alt={sender}
        />
      )}

      <div className="group-bubble">

        {!mine && (
          <strong>{sender}</strong>
        )}

        <p>{text}</p>

        <small>{time}</small>

      </div>

    </div>
  )
}