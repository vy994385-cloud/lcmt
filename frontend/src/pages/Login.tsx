import { useState } from "react"
import "./Login.css"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    console.log({
      email,
      password,
    })
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
          />

          <label>Password</label>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          Don't have an account? <a href="/signup">Create one</a>
        </p>

      </section>
    </main>
  )
}

export default Login