import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

function formatChatTime(dateString: string) {

  const date = new Date(dateString)

  const now = new Date()

  const diff =
    now.getTime() - date.getTime()

  const oneDay =
    1000 * 60 * 60 * 24


  if (
    date.toDateString() ===
    now.toDateString()
  ) {

    return date.toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    )

  }


  const yesterday = new Date()

  yesterday.setDate(
    yesterday.getDate() - 1
  )

  if (
    date.toDateString() ===
    yesterday.toDateString()
  ) {

    return "Yesterday"

  }


  if (diff < oneDay * 7) {

    return date.toLocaleDateString(
      [],
      {
        weekday: "long",
      }
    )

  }


  if (
    date.getFullYear() ===
    now.getFullYear()
  ) {

    return date.toLocaleDateString(
      [],
      {
        day: "numeric",
        month: "short",
      }
    )

  }


  return date.toLocaleDateString(
    [],
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  )

}


function ChatInbox() {

  const [chats, setChats] = useState<any[]>([])
  const navigate = useNavigate()


  async function loadChats() {

  try {

    const response = await api.get("/chat")

    console.log("API Response:", response.data)

    setChats(response.data)

  } catch (error) {

    console.log(
      "Failed loading chats",
      error
    )

  }

}


  useEffect(() => {

  loadChats()

}, [])

console.log("Chats State:", chats)

return (
    <main
      style={{
        padding:"40px"
      }}
    >

      <h1>
        Messages 💬
      </h1>


      {
        chats.length === 0 ?

        (

          <p>
            No conversations yet
          </p>

        )

        :

        chats.map(

          (chat)=>(

            <div
              key={chat.user._id}

              onClick={() =>
                navigate(
                  `/chat/${chat.user._id}`
                )
              }

              style={{
  padding: "18px",
  borderRadius: "18px",
  marginTop: "15px",
  cursor: "pointer",
  background: "#fff",
  border: "1px solid #eee",
  boxShadow: "0 4px 12px rgba(0,0,0,.05)",
  transition: "0.2s"
}}
            >

              <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "15px"
  }}
>

  <img
    src={
      chat.user.image ||
      "https://picsum.photos/100"
    }
    alt={chat.user.name}
    style={{
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      objectFit: "cover"
    }}
  />

  <div
    style={{
      flex: 1
    }}
  >

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >

      <h3
        style={{
          margin: 0
        }}
      >
        {chat.user.name}
      </h3>

      <small
  style={{
    color: "#888",
    fontSize: "13px"
  }}
>
  {formatChatTime(chat.time)}
</small>

    </div>

    <p
      style={{
        marginTop: "8px",
        color: "#666"
      }}
    >
      {chat.lastMessage}
    </p>

  </div>

</div>


            </div>

          )

        )
      }


    </main>

  )

}


export default ChatInbox