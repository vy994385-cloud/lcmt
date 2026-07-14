import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./Login.css"

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
        "http://localhost:5000/api/auth/signup",
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
    <main className="login-page">
      <section className="login-card">
        <div className="brand">
          <h1>LCMT</h1>
          <p>Love Creates Magic Together</p>
        </div>

        <h2>Create Your Account 💖</h2>

        <p className="subtitle">
          Start your journey toward meaningful connections.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <label
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            I agree to the Terms & Privacy Policy
          </label>

          <button type="submit">
            Create Account
          </button>
        </form>

        <p className="signup-link">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  )
}

export default Signup