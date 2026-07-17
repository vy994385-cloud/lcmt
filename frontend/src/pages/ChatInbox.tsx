import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"


function ChatInbox() {

  const [chats, setChats] = useState<any[]>([])
  const navigate = useNavigate()


  async function loadChats() {

    try {

      const response = await api.get("/chat")

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
                padding:"20px",
                border:"1px solid #ddd",
                borderRadius:"15px",
                marginTop:"15px",
                cursor:"pointer"
              }}
            >

              <h3>
                {chat.user.name}
              </h3>


              <p>
                {chat.lastMessage}
              </p>


            </div>

          )

        )
      }


    </main>

  )

}


export default ChatInbox