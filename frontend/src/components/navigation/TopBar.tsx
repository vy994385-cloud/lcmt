import { Link } from "react-router-dom"

export default function TopBar() {

  return (

    <header
      style={{
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 18px",
        borderBottom: "1px solid #eee",
        background: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}
    >

      <Link
        to="/home"
        style={{
          textDecoration: "none",
          fontWeight: 700,
          fontSize: 22,
          color: "#222"
        }}
      >
        LCMT
      </Link>

      <div
        style={{
          display: "flex",
          gap: 18,
          fontSize: 22
        }}
      >
        <Link to="/notifications">🔔</Link>
        <Link to="/profile">👤</Link>
      </div>

    </header>

  )

}