interface MessageBubbleProps {
  message: any
  currentUserId: string
}

function MessageBubble({
  message,
  currentUserId,
}: MessageBubbleProps) {

  const senderId =
    typeof message.sender === "object"
      ? message.sender._id
      : message.sender

  const mine = senderId === currentUserId

  return (

    <div
      style={{
        display: "flex",
        justifyContent: mine ? "flex-end" : "flex-start",
        marginBottom: "12px",
      }}
    >

      <div
        style={{
          maxWidth: "70%",
          padding: "12px 16px",
          borderRadius: mine
            ? "20px 20px 6px 20px"
            : "20px 20px 20px 6px",
          background: mine
            ? "#ff4d88"
            : "#ffffff",
          color: mine
            ? "#ffffff"
            : "#222",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.08)",
          wordBreak: "break-word",
        }}
      >

        <div
          style={{
            fontSize: "15px",
            lineHeight: "1.5",
          }}
        >
          {message.text}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "5px",
            marginTop: "6px",
            fontSize: "11px",
            opacity: 0.75,
          }}
        >

          <span>
            {new Date(
              message.createdAt
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {mine && (
            <span>
              ✓
            </span>
          )}

        </div>

      </div>

    </div>

  )

}

export default MessageBubble