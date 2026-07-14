import { useNavigate } from "react-router-dom"
import { useApp } from "../context/AppContext"

function Matches() {
  const { matches } = useApp()
  const navigate = useNavigate()

  return (
    <main style={{ padding: "40px" }}>
      <h1>Your Matches ❤️</h1>

      {matches.length === 0 ? (
        <p>You haven't liked anyone yet.</p>
      ) : (
        matches.map((match) => (
          <div
            key={match.id}
            onClick={() => navigate(`/chat/${match.id}`)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "15px",
              marginTop: "20px",
              border: "1px solid #ddd",
              borderRadius: "15px",
              cursor: "pointer",
            }}
          >
            <img
              src={match.image}
              alt={match.name}
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />

            <div>
              <h2>
                {match.name}, {match.age}
              </h2>

              <p>{match.bio}</p>
            </div>
          </div>
        ))
      )}
    </main>
  )
}

export default Matches