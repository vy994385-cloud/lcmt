function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "❤️ New Match",
      message: "Sophia matched with you.",
      time: "2 min ago",
    },
    {
      id: 2,
      title: "👍 Someone liked you",
      message: "Emma liked your profile.",
      time: "10 min ago",
    },
    {
      id: 3,
      title: "💬 New Message",
      message: "Olivia sent you a message.",
      time: "1 hour ago",
    },
  ]

  return (
    <main style={{ padding: "40px" }}>
      <h1>Notifications 🔔</h1>

      {notifications.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "15px",
            padding: "20px",
            marginTop: "20px",
          }}
        >
          <h3>{item.title}</h3>
          <p>{item.message}</p>
          <small>{item.time}</small>
        </div>
      ))}
    </main>
  )
}

export default Notifications