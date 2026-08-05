import {
  useEffect,
  useState
} from "react"

import {
  getFriends
} from "../services/profileService"

import "./Followers.css"

export default function Friends() {

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  )

  const [friends, setFriends] =
    useState<any[]>([])

  useEffect(() => {

    async function load() {

      try {

        const data = await getFriends(
          user._id
        )

        setFriends(data)

      } catch (error) {

        console.log(error)

      }

    }

    load()

  }, [])

  return (

    <main className="social-page">

      <h1>
        Friends 🤝
      </h1>

      {

        friends.length === 0 ?

          <p>
            No friends yet
          </p>

          :

          friends.map(person => (

            <div
              key={person._id}
              className="user-row"
            >

              <img
                src={
                  person.image ||
                  "https://i.pravatar.cc/100"
                }
                alt={person.name}
              />

              <div>

                <h3>
                  {person.name}
                </h3>

                <p>
                  {person.headline ||
                    person.bio ||
                    "LCMT Member"}
                </p>

              </div>

            </div>

          ))

      }

    </main>

  )

}