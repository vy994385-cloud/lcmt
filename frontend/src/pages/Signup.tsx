import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./Signup.css"

function Signup() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agree, setAgree] = useState(false)


  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault()


    if (password !== confirmPassword) {

      alert("Passwords do not match")
      return

    }


    if (!agree) {

      alert("Please accept Terms & Privacy Policy")
      return

    }


    try {

      const response = await axios.post(
        "https://lcmt-backend.onrender.com/api/auth/signup",
        {
          name,
          email,
          password,
        }
      )


      alert(response.data.message)

      navigate("/onboarding")


    } catch (error: any) {

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      )

    }

  }



  return (

    <main className="signup-page">


      {/* Background decoration */}

      <div className="bg-shape shape-one"></div>

      <div className="bg-shape shape-two"></div>

      <div className="bg-shape shape-three"></div>



      {/* Floating connection bubbles */}

      <div className="profile-bubble bubble-one">
        👩‍🎓
      </div>


      <div className="profile-bubble bubble-two">
        👨‍💻
      </div>


      <div className="profile-bubble bubble-three">
        💖
      </div>


      <div className="profile-bubble bubble-four">
        🎓
      </div>





      <section className="signup-wrapper">



        {/* Left side branding */}


        <div className="welcome-section">


          <h1>

            Find connections

            <span>
              that truly matter.
            </span>

          </h1>



          <p>

            LCMT is built around thoughts,
            personalities and meaningful bonds.

          </p>





          <div className="feature-list">


            <div>
              💭 Match through ideas
            </div>


            <div>
              🎓 Connect with students
            </div>


            <div>
              ❤️ Build real relationships
            </div>


          </div>



        </div>







        {/* Signup Card */}


        <section className="signup-card">



          <div className="brand">


            <h2>
              LCMT
            </h2>


            <p>
              Love Creates Magic Together
            </p>


          </div>





          <h3>
            Create Your Account 💖
          </h3>




          <p className="subtitle">

            Start your journey toward meaningful connections.

          </p>






          <form onSubmit={handleSubmit}>



            <label>
              Full Name
            </label>


            <input

              type="text"

              placeholder="Enter your name"

              value={name}

              onChange={(e)=>setName(e.target.value)}

              required

            />





            <label>
              Email
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

              type="password"

              placeholder="Create a password"

              value={password}

              onChange={(e)=>setPassword(e.target.value)}

              required

            />







            <label>
              Confirm Password
            </label>


            <input

              type="password"

              placeholder="Confirm your password"

              value={confirmPassword}

              onChange={(e)=>setConfirmPassword(e.target.value)}

              required

            />







            <label className="checkbox">


              <input

                type="checkbox"

                checked={agree}

                onChange={(e)=>setAgree(e.target.checked)}

              />


              <span>
                I agree to Terms & Privacy Policy
              </span>


            </label>







            <button type="submit">

              Join LCMT ✨

            </button>





          </form>







          <p className="signup-link">


            Already have an account?


            <Link to="/login">

              Login

            </Link>


          </p>





        </section>




      </section>




    </main>

  )

}


export default Signup