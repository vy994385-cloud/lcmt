import type { RefObject } from "react"
import EmojiPicker from "emoji-picker-react"

interface ChatInputProps {
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
  showEmoji: boolean
  setShowEmoji: React.Dispatch<React.SetStateAction<boolean>>
  emojiRef: RefObject<HTMLDivElement | null>
  sendMessage: () => void
  onTyping: () => void
}

function ChatInput({
  text,
  setText,
  showEmoji,
  setShowEmoji,
  emojiRef,
  sendMessage,
  onTyping,
}: ChatInputProps) {

  return (

    <div
      style={{
        position: "relative",
        padding: "14px 18px",
        background: "#fff",
        borderTop: "1px solid #ececec",
        flexShrink: 0,
      }}
    >

      {showEmoji && (

        <div
          ref={emojiRef}
          style={{
            position: "absolute",
            bottom: "72px",
            left: "15px",
            zIndex: 100,
          }}
          onMouseDown={(e) =>
            e.stopPropagation()
          }
        >

          <EmojiPicker
            onEmojiClick={(emoji) =>
              setText((prev) => prev + emoji.emoji)
            }
          />

        </div>

      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >

        <button
          onClick={(e) => {
            e.stopPropagation()
            setShowEmoji((prev) => !prev)
          }}
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            background: "#f2f2f2",
            fontSize: "22px",
          }}
        >
          😊
        </button>

        <input
          value={text}
          placeholder="Type a message..."
          onChange={(e) => {
            setText(e.target.value)
            onTyping()
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage()
            }
          }}
          style={{
            flex: 1,
            padding: "14px 18px",
            borderRadius: "24px",
            border: "1px solid #ddd",
            outline: "none",
            fontSize: "15px",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            border: "none",
            background: "#ff4d88",
            color: "white",
            cursor: "pointer",
            padding: "0 24px",
            height: "46px",
            borderRadius: "24px",
            fontWeight: 600,
          }}
        >
          ❤️
        </button>

      </div>

    </div>

  )

}

export default ChatInput