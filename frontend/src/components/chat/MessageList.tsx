import type { RefObject } from "react"
import MessageBubble from "./MessageBubble"
import EmptyChat from "./EmptyChat"

interface Props {
  messages: any[]
  currentUserId: string
  bottomRef: RefObject<HTMLDivElement | null>
}

function MessageList({
  messages,
  currentUserId,
  bottomRef,
}: Props) {

  if (messages.length === 0) {
    return <EmptyChat />
  }

  return (

    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "20px",
        background: "#f5f7fb",
      }}
    >

      {messages.map((message) => (

        <MessageBubble
          key={message._id}
          message={message}
          currentUserId={currentUserId}
        />

      ))}

      <div ref={bottomRef} />

    </div>

  )

}

export default MessageList