import { useState } from "react"

type Props = {
  onSend: (text: string) => void
}

export default function GroupComposer({
  onSend,
}: Props) {

  const [text, setText] =
    useState("")

  function send() {

    if (!text.trim())
      return

    onSend(text)

    setText("")
  }

  return (

    <footer className="group-composer">

      <button
        type="button"
        className="composer-btn"
      >
        😊
      </button>

      <button
        type="button"
        className="composer-btn"
      >
        📎
      </button>

      <input
        value={text}
        placeholder="Message the community..."
        onChange={(e) =>
          setText(e.target.value)
        }
        onKeyDown={(e) => {

          if (e.key === "Enter") {
            send()
          }

        }}
      />

      <button
        type="button"
        className="composer-btn"
      >
        🎤
      </button>

      <button
        className="send-btn"
        onClick={send}
      >
        Send
      </button>

    </footer>

  )
}