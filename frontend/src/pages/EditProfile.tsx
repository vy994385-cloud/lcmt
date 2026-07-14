import { useState } from "react"

function EditProfile() {
  const [name, setName] = useState("Sophia")
  const [bio, setBio] = useState(
    "Coffee lover ☕ | Traveler ✈️ | Dog Mom 🐶"
  )

  function handleSave(e: React.FormEvent) {
    e.preventDefault()

    console.log({
      name,
      bio,
    })
  }

  return (
    <main style={{ padding: "40px", maxWidth: "700px", margin: "auto" }}>
      <h1>Edit Profile</h1>

      <form onSubmit={handleSave}>

        <label>Name</label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <label>Bio</label>

        <textarea
          rows={5}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Save Changes
        </button>

      </form>
    </main>
  )
}

export default EditProfile