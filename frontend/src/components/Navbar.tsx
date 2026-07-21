import {
  useEffect,
  useState,
} from "react"

import {
  Home,
  Compass,
  UsersRound,
  MessageCircle,
  Bell,
  User,
  MoreVertical,
  Users,
} from "lucide-react"

import {
  Link,
  useLocation,
} from "react-router-dom"

import MoreMenu from "./MoreMenu"

import "./Navbar.css"

function Navbar() {
  const location = useLocation()

  const [menuOpen, setMenuOpen] = useState(false)

  const [collapsed, setCollapsed] =
    useState(false)

  useEffect(() => {
    let lastScroll = 0

    const handleScroll = () => {
      const current =
        window.scrollY

      if (
        current > lastScroll &&
        current > 80
      ) {
        setCollapsed(true)
      } else {
        setCollapsed(false)
      }

      lastScroll = current
    }

    window.addEventListener(
      "scroll",
      handleScroll
    )

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      )
  }, [])

  const isActive = (
    path: string
  ) => {
    if (path === "/") {
      return (
        location.pathname === "/"
      )
    }

    return location.pathname.startsWith(
      path
    )
  }

  const navItems = [
    {
      path: "/",
      icon: <Home size={20} />,
      label: "Home",
    },
    {
      path: "/explore",
      icon: <Compass size={20} />,
      label: "Explore",
    },
    {
      path: "/circle",
      icon: (
        <UsersRound size={20} />
      ),
      label: "Circle",
    },
    {
  path: "/communities",
  icon: (
    <Users size={20} />
  ),
  label: "Communities",
},
    {
      path: "/chat",
      icon: (
        <MessageCircle
          size={20}
        />
      ),
      label: "Messages",
    },
    {
      path: "/notifications",
      icon: (
        <div className="notification-icon">
          <Bell size={20} />

          <span>3</span>
        </div>
      ),
      label: "Notifications",
    },
    {
      path: "/profile",
      icon: <User size={20} />,
      label: "Profile",
    },
  ]

  return (
    <>
      <nav
        className={`desktop-nav ${
          collapsed
            ? "collapsed"
            : ""
        }`}
      >
        <div className="logo">
          <span>❤️</span>

          <div
            className={
              collapsed
                ? "hide-text"
                : ""
            }
          >
            <strong>LCMT</strong>

            <small>
              Ideas • People •
              Communities
            </small>
          </div>
        </div>

        <div className="nav-links">
          {navItems.map(
            (item) => (
              <Link
                key={item.path}
                to={item.path}
                className={
                  isActive(
                    item.path
                  )
                    ? "active-nav"
                    : ""
                }
              >
                {item.icon}

                <span
                  className={
                    collapsed
                      ? "hide-text"
                      : ""
                  }
                >
                  {item.label}
                </span>
              </Link>
            )
          )}
        </div>

        <div
          className="more-wrapper"
          role="button"
          aria-label="Open menu"
          onClick={() =>
            setMenuOpen(
              !menuOpen
            )
          }
        >
          <MoreVertical
            size={24}
          />

          {menuOpen && (
            <MoreMenu />
          )}
        </div>
      </nav>

      <nav className="mobile-nav">
        {navItems
          .slice(0, 5)
          .map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={
                isActive(
                  item.path
                )
                  ? "active-mobile"
                  : ""
              }
            >
              {item.icon}
            </Link>
          ))}
      </nav>
    </>
  )
}

export default Navbar