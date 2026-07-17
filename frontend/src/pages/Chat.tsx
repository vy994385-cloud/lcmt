import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../api/axios"


function Chat() {

  const { id } = useParams()

  const [messages, setMessages] = useState<any[]>([])
  const [text, setText] = useState("")


  const currentUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  )



  async function loadMessages(){

    try{

      const response = await api.get(
        `/chat/${id}`
      )

      setMessages(response.data)

    }
    catch(error){

      console.log(
        "Loading messages failed",
        error
      )

    }

  }




  async function sendMessage(){

    if(!text.trim()) return


    try{

      await api.post(
        `/chat/send/${id}`,
        {
          text
        }
      )


      setText("")

      loadMessages()


    }
    catch(error){

      console.log(
        "Sending message failed",
        error
      )

    }

  }




  useEffect(()=>{

    loadMessages()

  },[id])




  return (

    <main
      style={{
        padding:"30px",
        maxWidth:"700px",
        margin:"auto"
      }}
    >


      <h1>
        Chat ❤️
      </h1>



      <div
        style={{
          height:"500px",
          overflowY:"auto",
          border:"1px solid #ddd",
          borderRadius:"20px",
          padding:"20px",
          background:"#fafafa"
        }}
      >


      {
        messages.map(
          (message)=>(


            <div
              key={message._id}

              style={{
                display:"flex",

                justifyContent:
message.sender.toString() === currentUser._id
?
"flex-end"
:
"flex-start",

                marginBottom:"15px"
              }}

            >


              <div

              style={{

                maxWidth:"70%",

                padding:"12px 18px",

                borderRadius:"20px",

                background:
message.sender.toString() === currentUser._id
?
"#ff4d88"
:
"#e5e5e5",

                color:
message.sender.toString() === currentUser._id
?
"white"
:
"black"

              }}

              >


                <p
                style={{
                  margin:0
                }}
                >
                  {message.text}
                </p>


                <small>

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

                </small>


              </div>


            </div>


          )
        )
      }


      </div>



      <div
      style={{
        display:"flex",
        gap:"10px",
        marginTop:"20px"
      }}
      >


        <input

          value={text}

          onChange={
            (e)=>
            setText(e.target.value)
          }

          onKeyDown={
            (e)=>{

              if(e.key==="Enter"){
                sendMessage()
              }

            }
          }

          placeholder="Type message..."

          style={{
            flex:1,
            padding:"14px",
            borderRadius:"15px",
            border:"1px solid #ccc"
          }}

        />



        <button

          onClick={sendMessage}

          style={{
            padding:"0 25px",
            borderRadius:"15px",
            cursor:"pointer"
          }}

        >

          Send ❤️

        </button>


      </div>


    </main>

  )

}


export default Chat