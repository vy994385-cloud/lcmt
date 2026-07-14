import { createContext, useContext, useState } from "react"
import { users as initialUsers } from "../data/users"

type User = {
  id: number
  name: string
  age: number
  bio: string
  image: string
}

type AppContextType = {
  users: User[]
  matches: User[]
  passedUsers: User[]
  likeUser: (user: User) => void
  passUser: (user: User) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({
  children,
}: {
  children: React.ReactNode
}) {

  const [users] = useState<User[]>(initialUsers)

  const [matches, setMatches] = useState<User[]>([])

  const [passedUsers, setPassedUsers] = useState<User[]>([])


  function likeUser(user: User) {

  console.log("LIKE CLICKED:", user.name)

  setMatches((previous) => {

    console.log("OLD MATCHES:", previous)

    const updatedMatches = [...previous, user]

    console.log("NEW MATCHES:", updatedMatches)

    return updatedMatches
  })
}


  function passUser(user: User) {

    setPassedUsers((previous) => {

      if (previous.some((person) => person.id === user.id)) {
        return previous
      }

      return [...previous, user]

    })

  }


  return (
    <AppContext.Provider
      value={{
        users,
        matches,
        passedUsers,
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
    throw new Error("useApp must be used inside AppProvider")
  }

  return context
}