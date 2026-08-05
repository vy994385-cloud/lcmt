import { useEffect, useState } from "react"

import PersonCard from "../components/cards/PersonCard/PersonCard"

import api from "../api/axios"

import { getMyProfile } from "../api/profile"

import {
  getFriends,
} from "../services/profileService"

import {
  joinCommunity,
} from "../services/networkService"

import "./Circle.css"

interface Person {
  _id: string
  name: string
  username?: string
  headline?: string
  course?: string
  college?: string
  bio?: string
  interests: string[]
  image?: string
  followers: string[]
  following: string[]
}

interface Network {
  followers: number
  following: number
  friends: number
}

interface FriendRequest {
  _id: string
  name: string
  username?: string
  image?: string
  college?: string
  course?: string
}

interface Community {
  _id: string
  name: string
  description: string
  category: string
  icon: string
  members: string[]
}

function Circle() {
  const [people, setPeople] = useState<Person[]>([])
  const [friends, setFriends] = useState<any[]>([])
  const [requests, setRequests] = useState<FriendRequest[]>([])
  const [communities, setCommunities] = useState<Community[]>([])

  const [network, setNetwork] = useState<Network>({
    followers: 0,
    following: 0,
    friends: 0,
  })

  const [loading, setLoading] = useState(true)

  async function loadUsers() {
    try {
      const response = await api.get("/users/discover")
      setPeople(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function loadCommunities() {
    try {
      const response = await api.get("/communities")
      setCommunities(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function loadProfile() {
    try {
      const user = await getMyProfile()

      setNetwork({
        followers: user.followers?.length || 0,
        following: user.following?.length || 0,
        friends: user.friends?.length || 0,
      })

      setRequests(user.friendRequestsReceived || [])

      const friendList = await getFriends(user._id)
      setFriends(friendList)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function acceptRequest(id: string) {
    try {
      await api.post(`/social/friend-request/accept/${id}`)

      setRequests((prev) =>
        prev.filter((item) => item._id !== id)
      )

      loadProfile()
    } catch (error) {
      console.log(error)
    }
  }

  async function rejectRequest(id: string) {
    try {
      await api.post(`/social/friend-request/reject/${id}`)

      setRequests((prev) =>
        prev.filter((item) => item._id !== id)
      )
    } catch (error) {
      console.log(error)
    }
  }

  async function handleJoin(id: string) {
    try {
      await joinCommunity(id)
      loadCommunities()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadUsers()
    loadProfile()
    loadCommunities()
  }, [])

  return (
    <main className="circle-page">
      <header className="circle-header">
        <h1>🤝 My Circle</h1>

        <p>
          Your friends, communities and growing network.
        </p>

        <input
          className="circle-search"
          placeholder="Search people, communities..."
        />
      </header>

      {/* Friends */}

      <section>
        <h2>🤝 Friends</h2>

        <p className="section-subtitle">
          Your closest connections
        </p>

        {loading ? (
          <p>Loading...</p>
        ) : friends.length === 0 ? (
          <div className="feature-card">
            <p>No friends yet.</p>
          </div>
        ) : (
          <div className="people-grid">
            {friends.map((friend) => (
              <PersonCard
                key={friend._id}
                person={friend}
              />
            ))}
          </div>
        )}
      </section>

      {/* Friend Requests */}

      <section>
        <h2>📩 Friend Requests</h2>

        {requests.length === 0 ? (
          <div className="feature-card">
            <p>No pending requests.</p>
          </div>
        ) : (
          requests.map((request) => (
            <div
              key={request._id}
              className="feature-card"
            >
              <div>
                <h3>{request.name}</h3>

                <p>
                  {request.course || "LCMT Member"}
                </p>
              </div>

              <div className="wave-buttons">
                <button
                  onClick={() =>
                    acceptRequest(request._id)
                  }
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    rejectRequest(request._id)
                  }
                >
                  Ignore
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Network */}

      <section>
        <h2>👥 Network Overview</h2>

        <div className="feature-card">
          <div className="connection-stats">
            <div>
              <strong>{network.followers}</strong>
              <span>Followers</span>
            </div>

            <div>
              <strong>{network.following}</strong>
              <span>Following</span>
            </div>

            <div>
              <strong>{network.friends}</strong>
              <span>Friends</span>
            </div>
          </div>
        </div>
      </section>

      {/* Discover */}

      <section>
        <h2>🔥 Discover People</h2>

        <p className="section-subtitle">
          Expand your network
        </p>

        <div className="people-grid">
          {people
            .filter(
              (person) =>
                !friends.some(
                  (friend) =>
                    friend._id === person._id
                )
            )
            .map((person) => (
              <PersonCard
                key={person._id}
                person={person}
              />
            ))}
        </div>
      </section>

      {/* Communities */}

      <section>
        <h2>🌍 Communities</h2>

        <div className="people-grid">
          {communities.map((community) => (
            <div
              key={community._id}
              className="feature-card"
            >
              <h3>
                {community.icon} {community.name}
              </h3>

              <p>{community.description}</p>

              <p>🏷 {community.category}</p>

              <p>
                👥 {community.members.length} members
              </p>

              <button
                onClick={() =>
                  handleJoin(community._id)
                }
              >
                Join Community
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Circle