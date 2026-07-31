import {
  useState
} from "react"

import {
  Link,
  useNavigate
} from "react-router-dom"

import api from "../api/axios"

import "./Signup.css"

import InterestSelector from "../components/auth/signup/InterestSelector"
import VibeSelector from "../components/auth/signup/VibeSelector"

import ConversationFeed from "../components/auth/signup/ConversationFeed"

import LiveTicker from "../components/auth/common/LiveTicker"

import ConversationCloud
from "../components/auth/atmosphere/ConversationCloud"
import toast from "react-hot-toast"

function Signup() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agree, setAgree] = useState(false)

  const [step, setStep] = useState(1)

  const [interests, setInterests] = useState<string[]>([])
  const [vibes, setVibes] = useState<string[]>([])

  const [loading, setLoading] = useState(false)

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault()

    if (loading) return

    if (step < 3) {
      setStep(step + 1)
      return
    }

    setLoading(true)

    if (password !== confirmPassword) {
      setLoading(false)
      toast.error("Passwords do not match")
      return
    }

    if (!agree) {
      setLoading(false)
      toast.error("Please accept Terms & Privacy Policy")
      return
    }

    if (interests.length === 0) {
      setLoading(false)
      toast.error("Please select some interests")
      return
    }

    try {

      const response = await api.post(
"/auth/signup",
        {
          name,
          email,
          password,
          interests,
          values: vibes
        }
      )

      toast.error(response.data.message)

      setLoading(false)

      navigate("/onboarding")

    }

    catch (error: any) {

      setLoading(false)

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      )

    }

  }

  return (

    <main className="signup-page">

      <section className="signup-wrapper">

        <LiveTicker />

        <ConversationCloud />

        <ConversationFeed />

        <div className="welcome-section">

          <h1>

            <span>

              LCMT is where

            </span>

            people come to talk.

          </h1>

          <p>

            Not just another feed.

            Join conversations, communities and
            people around things you actually care about.

          </p>

          <div className="feature-list">

            <div>
              🏏 Join today's biggest conversations
            </div>

            <div>
              😂 Discover what people are laughing about
            </div>

            <div>
              🎬 Share opinions that matter
            </div>

            <div>
              🌎 Find communities that match your interests
            </div>

          </div>

        </div>

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

            {
              step === 1 &&
              "Create Your Account ✨"
            }

            {
              step === 2 &&
              "Choose Your Interests 🌎"
            }

            {
              step === 3 &&
              "Choose Your Vibe 🔥"
            }

          </h3>

          <p className="subtitle">

            {
              step === 1 &&
              "Start your journey with LCMT."
            }

            {
              step === 2 &&
              "Select communities you want to explore."
            }

            {
              step === 3 &&
              "Tell people how you like to participate."
            }

          </p>

          <div className="signup-progress">

            <span className={step >= 1 ? "active" : ""}>
              1
            </span>

            <span className={step >= 2 ? "active" : ""}>
              2
            </span>

            <span className={step >= 3 ? "active" : ""}>
              3
            </span>

          </div>

          <form onSubmit={handleSubmit}>

            {

              step === 1 &&

              <>

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <label>
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label>
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <label>
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

              </>

            }

            {

              step === 2 &&

              <InterestSelector
                selected={interests}
                setSelected={setInterests}
              />

            }

            {

              step === 3 &&

              <VibeSelector
                selected={vibes}
                setSelected={setVibes}
              />

            }

            {

              step === 3 &&

              <label className="checkbox">

                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) =>
                    setAgree(e.target.checked)
                  }
                />

                <span>

                  I agree to Terms & Privacy Policy

                </span>

              </label>

            }

            <button
              type="submit"
              disabled={loading}
            >

              {
                loading
                  ? "Creating account..."
                  : step === 3
                    ? "Join LCMT ✨"
                    : "Continue →"
              }

            </button>

          </form>

          <p className="signup-link">

            Already have an account?

            <Link to="/login">

              Login

            </Link>

          </p>

        </section>

        <div className="live-topics">

          <span>
            🏏 Match discussions
          </span>

          <span>
            🎬 Movie theories
          </span>

          <span>
            😂 Viral memes
          </span>

          <span>
            🌎 Community stories
          </span>

        </div>

      </section>

    </main>

  )

}

export default Signup