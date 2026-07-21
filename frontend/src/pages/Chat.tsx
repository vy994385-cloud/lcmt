import {
  useEffect,
  useState,
  useRef
} from "react"

import {
  useParams,
  useNavigate
} from "react-router-dom"

import api from "../api/axios"
import socket from "../socket"

import EmojiPicker from "emoji-picker-react"

import "./Chat.css"

import Avatar from "../components/ui/Avatar/Avatar"
import Button from "../components/ui/Button/Button"
import Input from "../components/ui/Input/Input"

interface ChatUser{
  _id:string
  name:string
  image?:string
  isOnline?:boolean
  lastSeen?:string
}

interface Message{

  _id:string

  text:string

  createdAt:string

  sender:string | {
    _id:string
  }

  receiver:string | {
    _id:string
  }

}

function Chat(){

  const { id } = useParams()

  const navigate = useNavigate()

  const currentUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  )

  const [messages,setMessages] =
    useState<Message[]>([])

  const [chatUser,setChatUser] =
    useState<ChatUser | null>(null)

  const [text,setText] =
    useState("")

  const [showEmoji,setShowEmoji] =
    useState(false)

  const [showMenu,setShowMenu] =
    useState(false)

  const [isTyping,setIsTyping] =
    useState(false)

  const bottomRef =
    useRef<HTMLDivElement>(null)

  const emojiRef =
    useRef<HTMLDivElement>(null)

  function getSenderId(message:any){

    return typeof message.sender === "object"

      ? message.sender._id

      : message.sender

  }

  useEffect(()=>{

    function closeEmoji(event:any){

      if(
        emojiRef.current &&
        !emojiRef.current.contains(event.target)
      ){

        setShowEmoji(false)

      }

    }

    document.addEventListener(
      "mousedown",
      closeEmoji
    )

    return ()=>{

      document.removeEventListener(
        "mousedown",
        closeEmoji
      )

    }

  },[])

  useEffect(()=>{

  if(!currentUser?._id)
    return

  socket.emit(
    "join",
    currentUser._id
  )

  return ()=>{

    socket.emit(
      "leave",
      currentUser._id
    )

  }

},[
  currentUser._id
])

    useEffect(()=>{

    function receiveMessage(
      message:any
    ){

      const sender =

        typeof message.sender === "object"

          ? message.sender._id

          : message.sender

      const receiver =

        typeof message.receiver === "object"

          ? message.receiver._id

          : message.receiver

      const isCurrentChat =

        (
          sender === currentUser._id &&
          receiver === id
        )

        ||

        (
          sender === id &&
          receiver === currentUser._id
        )

      if(!isCurrentChat)
        return

      setMessages(prev=>{

        const exists = prev.some(
  m =>
    m._id === message._id ||
    (
      m.text === message.text &&
      m.sender === message.sender
    )
)
        if(exists)
          return prev

        return [
          ...prev,
          message
        ]

      })

    }

    socket.on(
      "receive-message",
      receiveMessage
    )

    return ()=>{

      socket.off(
        "receive-message",
        receiveMessage
      )

    }

  },[
    id,
    currentUser._id
  ])



  useEffect(()=>{

  function typingHandler(
    data:any
  ){

    const sender =
      typeof data.sender === "object"
      ?
      data.sender._id
      :
      data.sender


    if(sender !== id)
      return


    setIsTyping(true)


    setTimeout(()=>{

      setIsTyping(false)

    },1500)

  }


  socket.on(
    "typing",
    typingHandler
  )


  
    return ()=>{

      socket.off(
        "typing",
        typingHandler
      )

    }

  },[id])



  async function loadMessages(){

    try{

      const response =
        await api.get(
          `/chat/${id}`
        )

      if(response.data.messages){

        setMessages(
          response.data.messages
        )

        setChatUser(
          response.data.user
        )

      }else{

        setMessages(
          response.data
        )

      }

    }

    catch(error){

      console.log(
        "Loading messages failed",
        error
      )

    }

  }



  async function sendMessage(){

  if(!text.trim())
    return

  const messageText = text

  setText("")

  try{

    const response = await api.post(
      `/chat/send/${id}`,
      {
        text: messageText
      }
    )

    const newMessage = response.data.message || response.data

    setMessages(prev=>[
      ...prev,
      newMessage
    ])

  }

  catch(error){

    console.log(
      "Sending failed",
      error
    )

  }

}



  useEffect(()=>{

    loadMessages()

  },[id])



  useEffect(()=>{

    bottomRef.current?.scrollIntoView({

      behavior:"smooth"

    })

  },[messages])

    return (

    <main className="chat-page">

      {/* ================= HEADER ================= */}

      <header className="chat-header">

        <div className="chat-user">

          <Avatar

            src={chatUser?.image}

            size={58}

            online={chatUser?.isOnline}

            onClick={()=>{

              if(chatUser?._id){

                navigate(
                  `/profile/${chatUser._id}`
                )

              }

            }}

          />

          <div>

            <h2 className="chat-name">

              {chatUser?.name || "Chat"}

            </h2>

            <p className="chat-status">

              {

                isTyping

                ?

                "✍️ Typing..."

                :

                chatUser?.isOnline

                ?

                "🟢 Online"

                :

                chatUser?.lastSeen

                ?

                `Last seen ${new Date(
                  chatUser.lastSeen
                ).toLocaleString()}`

                :

                "Offline"

              }

            </p>

          </div>

        </div>



        <div className="chat-menu">

          <button

            className="icon-btn"

            onClick={()=>{

              setShowMenu(!showMenu)

            }}

          >

            ⋮

          </button>

          {

            showMenu &&

            <div className="menu-dropdown">

              <button

                onClick={()=>{

                  navigate(`/profile/${id}`)

                }}

              >

                👤 View Profile

              </button>

              <button>

                👥 Create Group

              </button>

              <button>

                🚫 Block

              </button>

            </div>

          }

        </div>

      </header>



      {/* ================= CHAT BODY ================= */}

      <section className="chat-body">

        {

          messages.map(message=>{

            const mine =

              getSenderId(message) ===

              currentUser._id

            return(

              <div

                key={message._id}

                className={

                  mine

                  ?

                  "message-row mine"

                  :

                  "message-row"

                }

              >

                <div

                  className={

                    mine

                    ?

                    "message-bubble mine"

                    :

                    "message-bubble"

                  }

                >

                  <p>

                    {message.text}

                  </p>

                  <span>

                    {

                      new Date(

                        message.createdAt

                      ).toLocaleTimeString(

                        [],

                        {

                          hour:"2-digit",

                          minute:"2-digit"

                        }

                      )

                    }

                  </span>

                </div>

              </div>

            )

          })

        }

        <div ref={bottomRef} />

      </section>

            {/* ================= INPUT BAR ================= */}

      <footer className="chat-footer">

        {

          showEmoji &&

          <div

            ref={emojiRef}

            className="emoji-picker"

          >

            <EmojiPicker

              onEmojiClick={(emoji)=>{

                setText(

                  prev=>prev + emoji.emoji

                )

              }}

            />

          </div>

        }



        <button

          className="emoji-btn"

          onClick={()=>{

            setShowEmoji(

              prev=>!prev

            )

          }}

        >

          😊

        </button>



        <Input

          value={text}

          placeholder="Type a message..."

          onChange={(e)=>{

            setText(

              e.target.value

            )



            socket.emit(

              "typing",

              {

                sender:currentUser._id,

                receiver:id

              }

            )

          }}

          onKeyDown={(e)=>{

            if(e.key==="Enter"){

              sendMessage()

            }

          }}

        />



        <Button

          onClick={sendMessage}

        >

          Send ❤️

        </Button>

      </footer>

    </main>

  )

}

export default Chat