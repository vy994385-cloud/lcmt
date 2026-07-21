function EmptyChat() {

  return (

    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px",
        background: "#f5f7fb",
      }}
    >

      <div
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          background:
            "linear-gradient(135deg,#ff4d88,#ff7aa8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "42px",
          color: "white",
          marginBottom: "24px",
          boxShadow:
            "0 10px 30px rgba(255,77,136,0.3)",
        }}
      >
        💕
      </div>

      <h2
        style={{
          margin: "0 0 10px",
          fontSize: "26px",
          color: "#222",
        }}
      >
        Start your conversation
      </h2>

      <p
        style={{
          margin: 0,
          maxWidth: "320px",
          color: "#666",
          lineHeight: "1.6",
          fontSize: "15px",
        }}
      >
        Say hello 👋 and make the first little
        change that matters.
      </p>

    </div>

  )

}

export default EmptyChat