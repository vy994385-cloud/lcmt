import { useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  followUser,
  unfollowUser
} from "../../../services/profileService"

import "./ProfileHero.css"

function ProfileHero({
  user,
  isOwnProfile,
  canViewPrivate
}: any) {

  const navigate = useNavigate()

  const currentUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  )

  const currentUserId =
    currentUser._id || currentUser.id

  const [following,setFollowing]=useState(

    Array.isArray(user.followers)

      ?

      user.followers.some(
        (item:any)=>
        String(item._id || item) ===
        String(currentUserId)
      )

      :

      false

  )

    const [loading,setLoading]=useState(false)

  const joined = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString(
        undefined,
        {
          month:"short",
          year:"numeric"
        }
      )
    : "Recently"

    const isPrivate =
  user.profileVisibility === "private"

  

  async function toggleFollow(){


    if(loading) return

    try{

      setLoading(true)

      if(following){

        await unfollowUser(user._id)

        setFollowing(false)

      }

      else{

        await followUser(user._id)

        setFollowing(true)

      }

    }

    catch(error){

      console.log(error)

    }

    finally{

      setLoading(false)

    }

  }

  function shareProfile(){

    const url =
      window.location.href

    if(navigator.share){

      navigator.share({

        title:user.name,

        text:`Check out ${user.name}'s profile`,

        url

      })

    }

    else{

      navigator.clipboard.writeText(url)

      alert("Profile link copied!")

    }

  }

  return(

    <section className="profile-hero">

      <div

        className="profile-cover"

        style={{

          backgroundImage:`url(${

            user.coverImage ||

            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400"

          })`

        }}

        onClick={()=>{

          if(user.coverImage){

            window.open(user.coverImage)

          }

        }}

      >

        {

          isOwnProfile &&

          <button
            className="cover-btn"
            onClick={(e)=>e.stopPropagation()}
          >

            Change Cover

          </button>

        }

      </div>

      <div className="profile-content">

        <img

          className="profile-avatar"

          src={
            user.image ||
            "https://placehold.co/200"
          }

          alt="profile"

          onClick={()=>

            navigate(`/profile/${user._id}`)

          }

        />

        <div className="profile-main">

          <div className="profile-name-row">

            <div>

              <h1>

                {user.name || user.username}

                {

                  user.verified &&

                  <span className="verified">

                    ✔

                  </span>

                }

              </h1>

              <p

                className="username"

                title="Click to copy username"

                onClick={()=>

                  navigator.clipboard.writeText(

                    `@${user.username}`

                  )

                }

              >

                @{user.username}

              </p>

              {

                user.headline &&

                <p className="headline">

                  {user.headline}

                </p>

              }

            </div>

            <div className="profile-actions">

              {

                isOwnProfile

                ?

                <button

                  className="edit-profile-btn"

                  onClick={()=>

                    navigate("/edit-profile")

                  }

                >

                  Edit Profile

                </button>

                :

                <>
  <button
    className="follow-btn"
    disabled={loading}
    onClick={toggleFollow}
  >
    {following ? "Following" : "Follow"}
  </button>

  {
    canViewPrivate &&

    <button
      className="message-btn"
      onClick={()=>
        navigate(`/chat/${user._id}`)
      }
    >
      Message
    </button>
  }
</>

              }

              <button

                className="message-btn"

                onClick={shareProfile}

              >

                Share

              </button>

            </div>

          </div>

          {

            user.bio &&

            <p className="profile-bio">

              {user.bio}

            </p>

          }

          {
  isPrivate &&
  !canViewPrivate &&

  <div className="profile-private-banner">

    🔒 This account is private.
    Follow this member to view their profile.

  </div>
}

                    {
            canViewPrivate && (

              <>

                <div className="profile-meta">

                  {
                    user.location &&
                    <span>
                      📍 {user.location}
                    </span>
                  }

                  {
                    user.college &&
                    <span>
                      🎓 {user.college}
                    </span>
                  }

                  {
                    user.course &&
                    <span>
                      📚 {user.course}
                    </span>
                  }

                  <span>
                    📅 Joined {joined}
                  </span>

                </div>

                <div className="profile-stats-row">

                  <div>
                    <strong>{user.followers?.length || 0}</strong>
                    <span>Followers</span>
                  </div>

                  <div>
                    <strong>{user.following?.length || 0}</strong>
                    <span>Following</span>
                  </div>

                  <div>
                    <strong>{user.friends?.length || 0}</strong>
                    <span>Friends</span>
                  </div>

                  <div>
                    <strong>{user.communities?.length || 0}</strong>
                    <span>Communities</span>
                  </div>

                </div>

              </>

            )
          }

        </div>

      </div>

    </section>

  )

}

export default ProfileHero