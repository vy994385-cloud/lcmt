import { useNavigate } from "react-router-dom"
import "./Login.css"

function Onboarding() {
  const navigate = useNavigate()

  function handleBegin() {
    navigate("/discover")
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="brand">
          <h1>Welcome to LCMT ❤️</h1>
          <p>Love Creates Magic Together</p>
        </div>

        <h2>Let's build your profile</h2>

        <p className="subtitle">
          We'll ask you a few simple questions to help you connect with the right people.
        </p>

        <button onClick={handleBegin}>
          Let's Begin
        </button>
      </section>
    </main>
  )
}

export default Onboarding