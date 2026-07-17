import { createContext, useContext, useState, useEffect } from "react"
import api from "../api/axios"

type User = {
  id: string
  name: string
  age: number
  bio: string
  image: string

  gender: string
  college: string
  course: string
  year: number

  interests: string[]
  values: string[]
  personality: string
  lookingFor: string
}

type AppContextType = {
  users: User[]
  matches: User[]
  passedUsers: User[]
  refreshUsers: () => Promise<void>
  refreshMatches: () => Promise<void>
  likeUser: (user: User) => Promise<void>
  passUser: (user: User) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [users, setUsers] = useState<User[]>([])
  const [matches, setMatches] = useState<User[]>([])
  const [passedUsers, setPassedUsers] = useState<User[]>([])

  function formatUser(user: any): User {
    return {
      id: user._id,
      name: user.name,
      age: user.age,
      bio: user.bio,

      image:
        user.image && user.image.trim() !== ""
          ? user.image
          : "https://placehold.co/300x400?text=No+Photo",

      gender: user.gender || "",
      college: user.college || "",
      course: user.course || "",
      year: user.year || 1,

      interests: user.interests || [],
      values: user.values || [],
      personality: user.personality || "",
      lookingFor: user.lookingFor || "",
    }
  }

  async function refreshUsers() {
    const token = localStorage.getItem("token")

    if (!token) return

    try {
      const response = await api.get("/users")

      setUsers(
        response.data.map(formatUser)
      )
    } catch (error) {
      console.log("Failed to load users", error)
    }
  }

  async function refreshMatches() {
    const token = localStorage.getItem("token")

    if (!token) return

    try {
      const response = await api.get("/matches")

      setMatches(
        response.data.map(formatUser)
      )
    } catch (error) {
      console.log("Failed to load matches", error)
    }
  }

  useEffect(() => {
    refreshUsers()
    refreshMatches()
  }, [])

  async function likeUser(user: User) {
    try {
      const response = await api.post(
        `/users/${user.id}/like`
      )

      alert(response.data.message)

      setUsers((previous) =>
        previous.filter(
          (person) => person.id !== user.id
        )
      )

      await refreshMatches()
    } catch (error) {
      console.log("Like failed", error)
    }
  }

  function passUser(user: User) {
    setPassedUsers((previous) => {
      if (
        previous.some(
          (person) => person.id === user.id
        )
      ) {
        return previous
      }

      return [...previous, user]
    })

    setUsers((previous) =>
      previous.filter(
        (person) => person.id !== user.id
      )
    )
  }

  return (
    <AppContext.Provider
      value={{
        users,
        matches,
        passedUsers,
        refreshUsers,
        refreshMatches,
        likeUser,
        passUser,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error(
      "useApp must be used inside AppProvider"
    )
  }

  return context
}