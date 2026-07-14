import { useApp } from "../context/AppContext"

function Discover() {
  const { users, matches, passedUsers, likeUser, passUser } = useApp()

  const availableUsers = users.filter(
    (user) =>
      !matches.some((match) => match.id === user.id) &&
      !passedUsers.some((passed) => passed.id === user.id)
  )

  return (
    <main style={{ padding: "40px" }}>
      <h1>Discover</h1>

      {availableUsers.length === 0 ? (
        <p>No more profiles available ❤️</p>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "30px",
          }}
        >
          {availableUsers.map((user) => (
            <div
              key={user.id}
              style={{
                width: "280px",
                border: "1px solid #ddd",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <img
                src={user.image}
                alt={user.name}
                width="280"
                height="360"
              />

              <div style={{ padding: "20px" }}>
                <h2>
                  {user.name}, {user.age}
                </h2>

                <p>{user.bio}</p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                  }}
                >
                  <button
                    onClick={() => passUser(user)}
                  >
                    ❌ Pass
                  </button>

                  <button
                    onClick={() => likeUser(user)}
                  >
                    ❤️ Like
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default Discover