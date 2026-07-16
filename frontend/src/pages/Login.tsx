import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./Login.css"

function Login() {
  const navigate = useNavigate()

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
      const response = await axios.post(
        "https://lcmt-backend.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      )

      // Save JWT token
      localStorage.setItem("token", response.data.token)

      // Save logged-in user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      )

      alert(response.data.message)

      // Go to Discover page
      navigate("/discover")

    } catch (error: any) {
      alert(
        error.response?.data?.message ||
        "Login failed"
      )
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">

        <div className="brand">
          <h1>LCMT</h1>
          <p>Love Creates Magic Together</p>
        </div>

        <h2>Welcome Back ❤️</h2>

        <p className="subtitle">
          Continue your journey of meaningful connections.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </button>

          <button type="submit">
            Continue
          </button>

        </form>

        <p className="signup-link">
          Don't have an account?{" "}
          <Link to="/signup">Create one</Link>
        </p>

      </section>
    </main>
  )
}

export default Login