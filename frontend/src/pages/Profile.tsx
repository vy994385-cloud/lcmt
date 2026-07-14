function Profile() {
  return (
    <main style={{ padding: "40px", maxWidth: "700px", margin: "auto" }}>

      <img
        src="https://picsum.photos/300/300"
        alt="Profile"
        style={{
          width: "220px",
          borderRadius: "20px",
          display: "block",
          margin: "auto",
        }}
      />

      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Sophia, 24
      </h1>

      <p style={{ textAlign: "center", color: "#666" }}>
        Coffee lover ☕ • Traveler ✈️ • Dog Mom 🐶
      </p>

      <hr style={{ margin: "40px 0" }} />

      <h2>About Me</h2>

      <p>
        I enjoy meaningful conversations, weekend road trips,
        discovering new cafés, and meeting kind people.
      </p>

      <h2 style={{ marginTop: "30px" }}>
        Interests
      </h2>

      <p>
        📚 Reading • 🎵 Music • ✈️ Travel • ☕ Coffee • 🏃 Fitness
      </p>

    </main>
  )
}

export default Profile