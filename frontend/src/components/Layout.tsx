import { Link } from "react-router-dom"

type LayoutProps = {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <h2>LCMT ❤️</h2>

        <nav
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <Link to="/discover">Discover</Link>
          <Link to="/matches">Matches</Link>
          <Link to="/chat">Chat</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  )
}

export default Layout