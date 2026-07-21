import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { useApp } from "../context/AppContext"
import "./Login.css"
import api from "../api/axios"

function Login() {

  const navigate = useNavigate()

  const { refreshUsers } = useApp()


  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false)



  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault()



    if (!email || !password) {

      alert("Please enter your email and password")

      return

    }



    try {


      const response = await api.post(
  "/auth/login",
  {
    email,
    password,
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



      await refreshUsers()



      alert(response.data.message)



      navigate("/home")



    } catch (error:any) {


      alert(

        error.response?.data?.message ||

        "Login failed"

      )


    }

  }





  return (

    <main className="login-page">


      {/* Background */}

      <div className="login-shape login-one"></div>

      <div className="login-shape login-two"></div>

      <div className="login-shape login-three"></div>




      {/* Floating elements */}


      <div className="login-bubble bubble-one">
        💖
      </div>


      <div className="login-bubble bubble-two">
        👥
      </div>


      <div className="login-bubble bubble-three">
        ✨
      </div>





      <section className="login-wrapper">





        <div className="login-welcome">


          <h1>

            Welcome back to

            <span>
              LCMT
            </span>

          </h1>



          <p>

            Continue discovering people who
            connect with your thoughts and values.

          </p>



          <div className="login-features">


            <div>
              ❤️ Meaningful connections
            </div>


            <div>
              💭 Thought based matching
            </div>


            <div>
              🎓 Student community
            </div>


          </div>


        </div>








        <section className="login-card">



          <div className="brand">


            <h2>
              LCMT
            </h2>


            <p>
              Love Creates Magic Together
            </p>


          </div>





          <h3>
            Welcome Back ❤️
          </h3>



          <p className="subtitle">

            Continue your journey of meaningful connections.

          </p>







          <form onSubmit={handleSubmit}>




            <label>
              Email Address
            </label>



            <input

              type="email"

              placeholder="Enter your email"

              value={email}

              onChange={(e)=>setEmail(e.target.value)}

              required

            />







            <label>
              Password
            </label>



            <input

              type={showPassword ? "text" : "password"}

              placeholder="Enter your password"

              value={password}

              onChange={(e)=>setPassword(e.target.value)}

              required

            />







            <button

              type="button"

              className="password-toggle"

              onClick={() =>
                setShowPassword(!showPassword)
              }

            >

              {
                showPassword
                ? "Hide Password"
                : "Show Password"
              }


            </button>







            <button

              type="submit"

              className="login-button"

            >

              Continue ✨


            </button>




          </form>







          <p className="signup-link">


            Don't have an account?


            <Link to="/signup">

              Create one

            </Link>


          </p>





        </section>





      </section>




    </main>

  )

}


export default Login