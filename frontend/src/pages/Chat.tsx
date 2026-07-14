import { useState } from "react"
import { useParams } from "react-router-dom"
import { useApp } from "../context/AppContext"

function Chat() {
  const { id } = useParams()
  const { matches } = useApp()

  const user = matches.find(
    (person) => person.id === Number(id)
  )

  const [message, setMessage] = useState("")

  const [messages, setMessages] = useState([
    "Hey 👋",
    "Nice to connect with you 😊",
  ])

  function sendMessage() {
    if (message.trim() === "") return

    setMessages([
      ...messages,
      message,
    ])

    setMessage("")
  }


  if (!user) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>User not found</h1>
      </main>
    )
  }


  return (
    <main style={{ padding: "40px" }}>

      <h1>
        Chat with {user.name} 💬
      </h1>


      <div
        style={{
          marginTop: "30px",
          minHeight: "300px",
          border: "1px solid #ddd",
          borderRadius: "15px",
          padding: "20px",
        }}
      >

        {messages.map((msg, index) => (
          <p key={index}>
            {msg}
          </p>
        ))}

      </div>


      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
        }}
      >

        <input
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "12px",
          }}
        />


        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </main>
  )
}

export default Chat