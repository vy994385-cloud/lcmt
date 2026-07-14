function Settings() {
  return (
    <main style={{ padding: "40px", maxWidth: "700px", margin: "auto" }}>
      <h1>⚙️ Settings</h1>

      <div style={{ marginTop: "30px" }}>
        <button>Edit Profile</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button>Privacy Settings</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button>Notification Preferences</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button>Blocked Users</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button>Help & Support</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button>About LCMT</button>
      </div>

      <div style={{ marginTop: "40px" }}>
        <button
          style={{
            background: "#ff4d4f",
            color: "white",
            padding: "12px 20px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </main>
  )
}

export default Settings