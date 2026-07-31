import { useNavigate } from "react-router-dom"
import { useApp } from "../context/AppContext"

function Matches() {

  const { matches } = useApp()

  const navigate = useNavigate()

  return (

    <main
      style={{
        padding:"40px",
      }}
    >

      <h1>
        🤝 Your Connections
      </h1>

      <p
        style={{
          color:"#666",
          marginTop:"8px",
          marginBottom:"30px",
        }}
      >
        Stay connected with people you've built meaningful relationships with.
      </p>

      {matches.length === 0 ? (

        <div>

          <h3>
            No connections yet.
          </h3>

          <p>
            Explore people, join communities, and start connecting with others.
          </p>

        </div>

      ) : (

        matches.map((connection) => (

          <div
            key={connection.id}
            onClick={() =>
              navigate(`/chat/${connection.id}`)
            }
            style={{
              display:"flex",
              alignItems:"center",
              gap:"20px",
              padding:"15px",
              marginTop:"20px",
              border:"1px solid #ddd",
              borderRadius:"15px",
              cursor:"pointer",
            }}
          >

            <img
              src={connection.image}
              alt={connection.name}
              style={{
                width:"70px",
                height:"70px",
                borderRadius:"50%",
                objectFit:"cover",
              }}
            />

            <div>

              <h2>
                {connection.name}, {connection.age}
              </h2>

              <p>
                {connection.bio}
              </p>

            </div>

          </div>

        ))

      )}

    </main>

  )

}

export default Matches