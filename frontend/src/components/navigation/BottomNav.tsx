import { NavLink } from "react-router-dom"

const items = [

  { to: "/home", label: "🏠", text: "Home" },

  { to: "/explore", label: "🔍", text: "Explore" },

  { to: "/communities", label: "👥", text: "Communities" },

  { to: "/circle", label: "⭕", text: "Circle" },

  { to: "/chat", label: "💬", text: "Chat" },

  { to: "/profile", label: "👤", text: "Profile" }

]

export default function BottomNav() {

  return (

    <nav
      style={{
        height: 64,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        borderTop: "1px solid #eee",
        background: "#fff",
        position: "sticky",
        bottom: 0
      }}
    >

      {

        items.map(item => (

          <NavLink
            key={item.to}
            to={item.to}
            style={{
              textDecoration: "none",
              color: "#333",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: 12
            }}
          >
            <span style={{ fontSize: 22 }}>
              {item.label}
            </span>

            {item.text}

          </NavLink>

        ))

      }

    </nav>

  )

}