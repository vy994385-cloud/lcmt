import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useApp } from "../context/AppContext"

import api from "../api/axios"

import "./Login.css"


import LiveTicker from "../components/auth/common/LiveTicker"
import LoginCard from "../components/auth/login/LoginCard"

import NewspaperCuttings from "../components/auth/news/NewspaperCuttings"
import ConversationCloud 
from "../components/auth/atmosphere/ConversationCloud"
import toast from "react-hot-toast"

function Login(){


const navigate = useNavigate()

const {} = useApp()



const [email,setEmail] = useState("")

const [password,setPassword] = useState("")

const [showPassword,setShowPassword] = useState(false)

const [loading, setLoading] = useState(false)



async function handleLogin(e: React.FormEvent) {

  e.preventDefault()

  if (loading) return

  if (!email || !password) {
   toast.error("Please enter your email and password")
    return
  }

  setLoading(true)

  try {

    const response = await api.post(
      "/auth/login",
      {
        email,
        password
      }
    )

    localStorage.setItem(
      "token",
      response.data.token
    )

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    )

    localStorage.setItem(
      "userId",
      response.data.user._id
    )


    toast.success("Welcome back!")

    navigate("/home")

  } catch (error: any) {

    toast.error(
  error.response?.data?.message ||
  "Login failed"
)

  } finally {

    setLoading(false)

  }

}




return(


<main className="login-page">

<ConversationCloud />



<section className="login-wrapper">



<div className="login-left">


<div className="login-welcome">


<div className="auth-label">

LCMT COMMUNITY MAGAZINE

</div>



<h1>

The place where

<span>

communities come alive.

</span>

</h1>



<p>

From sports debates to AI discoveries,
movie theories to startup ideas —
LCMT brings people together around
what they actually care about.

</p>



<div className="login-features">


<div>

🔥 Live conversations happening now

</div>


<div>

📰 Discover stories people are sharing

</div>


<div>

🌎 Join communities beyond your circle

</div>


</div>


</div>




<LiveTicker />

<NewspaperCuttings />


</div>






<LoginCard
email={email}
password={password}
setEmail={setEmail}
setPassword={setPassword}
showPassword={showPassword}
setShowPassword={setShowPassword}
handleSubmit={handleLogin}
loading={loading}
/>



</section>


</main>


)


}


export default Login