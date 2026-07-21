import { useNavigate } from "react-router-dom"

interface ChatHeaderProps {
  chatUser: any
  isTyping: boolean
  showMenu: boolean
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
}

function ChatHeader({
  chatUser,
  isTyping,
  showMenu,
  setShowMenu,
}: ChatHeaderProps) {

  const navigate = useNavigate()

  return (

    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 20px",
        background: "#ffffff",
        borderBottom: "1px solid #ececec",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >

        <img
          src={
            chatUser?.image ||
            "https://picsum.photos/100"
          }
          alt="Profile"
          onClick={() => {
            if (chatUser?._id) {
              navigate(`/profile/${chatUser._id}`)
            }
          }}
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            objectFit: "cover",
            cursor: "pointer",
          }}
        />

        <div>

          <h3
            style={{
              margin: 0,
              fontSize: "18px",
            }}
          >
            {chatUser?.name || "Chat"}
          </h3>

          <p
            style={{
              margin: "4px 0 0",
              fontSize: "14px",
              color: "#777",
            }}
          >
            {
              isTyping
                ? "✍️ Typing..."
                : chatUser?.isOnline
                ? "🟢 Online"
                : chatUser?.lastSeen
                ? `Last seen ${new Date(
                    chatUser.lastSeen
                  ).toLocaleString()}`
                : "Offline"
            }
          </p>

        </div>

      </div>

      <div
        style={{
          position: "relative",
        }}
      >

        <button
          onClick={() =>
            setShowMenu(!showMenu)
          }
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            border: "none",
            background: "#f5f5f5",
            cursor: "pointer",
            fontSize: "22px",
          }}
        >
          ⋮
        </button>

        {showMenu && (

          <div
            style={{
              position: "absolute",
              right: 0,
              top: "50px",
              width: "190px",
              background: "white",
              borderRadius: "12px",
              boxShadow:
                "0 5px 20px rgba(0,0,0,0.15)",
              overflow: "hidden",
            }}
          >

            <div
              onClick={() =>
                navigate(`/profile/${chatUser?._id}`)
              }
              style={{
                padding: "14px",
                cursor: "pointer",
              }}
            >
              👤 View Profile
            </div>

            <div
              style={{
                padding: "14px",
                cursor: "pointer",
              }}
            >
              👥 Create Group
            </div>

            <div
              style={{
                padding: "14px",
                cursor: "pointer",
                color: "#d32f2f",
              }}
            >
              🚫 Block User
            </div>

          </div>

        )}

      </div>

    </header>

  )

}

export default ChatHeader