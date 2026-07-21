function TypingIndicator() {

  return (

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        color: "#777",
        fontSize: "14px",
        fontStyle: "italic",
      }}
    >

      <span>✍️ Typing</span>

      <span
        style={{
          animation: "blink 1s infinite",
        }}
      >
        •
      </span>

      <span
        style={{
          animation: "blink 1s infinite 0.2s",
        }}
      >
        •
      </span>

      <span
        style={{
          animation: "blink 1s infinite 0.4s",
        }}
      >
        •
      </span>

      <style>
        {`
          @keyframes blink {
            0%,80%,100%{
              opacity:.2;
            }
            40%{
              opacity:1;
            }
          }
        `}
      </style>

    </div>

  )

}

export default TypingIndicator