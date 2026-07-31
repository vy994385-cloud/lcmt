import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"

import Layout from "../components/Layout"

import {
  getMyProfile,
  getProfile
} from "../services/profileService"


import ProfileHero from "../components/profile/ProfileHero/ProfileHero"
import ProfileStats from "../components/profile/ProfileStats/ProfileStats"
import ProfileAbout from "../components/profile/ProfileAbout/ProfileAbout"
import ProfileInterests from "../components/profile/ProfileInterests/ProfileInterests"
import ProfileCommunities from "../components/profile/ProfileCommunities/ProfileCommunities"
import ProfileSocialLinks from "../components/profile/ProfileSocialLinks/ProfileSocialLinks"
import ProfilePosts from "../components/profile/ProfilePosts/ProfilePosts"
import ProfilePhotos from "../components/profile/ProfilePhotos/ProfilePhotos"
import ProfileAchievements from "../components/profile/ProfileAchievements/ProfileAchievements"
import ProfileQuickActions from "../components/profile/ProfileQuickActions/ProfileQuickActions"
import ProfileFriends from "../components/profile/ProfileFriends/ProfileFriends"
import ProfileStickyHeader from "../components/profile/ProfileStickyHeader/ProfileStickyHeader"
import ProfileLockedSection from "../components/profile/ProfileLockedSection/ProfileLockedSection"

import ProfileSidebar from "../components/profile/ProfileSidebar/ProfileSidebar"

import "./Profile.css"


function Profile(){

  const { id } = useParams()


  const currentUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  )


  const currentUserId =
    currentUser._id || currentUser.id


  const isOwnProfile =
    !id || id === currentUserId



  const [user,setUser] = useState<any>(null)

  const [loading,setLoading] = useState(true)



  const [tab,setTab] = useState<
    "posts" |
    "replies" |
    "media" |
    "likes" |
    "communities" |
    "friends" |
    "activity" |
    "about"
  >("posts")



  const ownTabs = [
  { key: "posts", label: "📝 Posts" },
  { key: "replies", label: "💬 Replies" },
  { key: "media", label: "📸 Media" },
  { key: "likes", label: "❤️ Likes" },
  { key: "communities", label: "🌍 Communities" },
  { key: "friends", label: "🤝 Friends" },
  { key: "activity", label: "⚡ Activity" },
  { key: "about", label: "ℹ️ About" }
] as const

const publicTabs = [
  { key: "posts", label: "📝 Posts" },
  { key: "media", label: "📸 Media" },
  { key: "communities", label: "🌍 Communities" },
  { key: "about", label: "ℹ️ About" }
] as const

const tabs = isOwnProfile ? ownTabs : publicTabs



  async function loadProfile(){

    try{

      const data = isOwnProfile

      ?

      await getMyProfile()

      :

      await getProfile(id!)


      setUser(data)

    }

    catch{

      toast.error(
        "Unable to load profile"
      )

    }

    finally{

      setLoading(false)

    }

  }



  useEffect(()=>{

    loadProfile()

  },[id])



  if(loading){

    return(

      <Layout>

        <div className="profile-loading">

          Loading profile...

        </div>

      </Layout>

    )

  }



  if(!user){

    return(

      <Layout>

        <div className="profile-loading">

          Profile not found

        </div>

      </Layout>

    )

  }



  return(

    <Layout>

      <main className="profile-page">


        <ProfileStickyHeader

          user={user}

          isOwnProfile={isOwnProfile}

          tab={tab}

        />



        <ProfileHero

          user={user}

          isOwnProfile={isOwnProfile}

        />



        <ProfileStats
          user={user}
        />



        <ProfileQuickActions />




        <nav className="profile-tabs">

  {tabs.map((item) => (

    <button

      key={item.key}

      className={tab === item.key ? "active" : ""}

      onClick={() => setTab(item.key)}

    >

      {item.label}

    </button>

  ))}

</nav>




        <div className="profile-layout">



          <section className="profile-content">


            {
              tab==="posts" &&

              <ProfilePosts
                user={user}
              />
            }




            {
tab==="replies" &&

<ProfileLockedSection

icon="💬"

title="Replies"

text={
isOwnProfile
?
"Your replies and conversations will appear here."
:
"Replies are limited to protect conversations."
}

/>

}





            {
tab==="likes" &&

<ProfileLockedSection

icon="❤️"

title="Liked Posts"

text={
isOwnProfile
?
"Posts you liked will appear here."
:
"This section is private."
}

/>

}




{
tab==="friends" &&

<ProfileFriends

user={user}

isOwnProfile={isOwnProfile}

/>

}




            {
tab==="activity" &&

<ProfileLockedSection

icon="⚡"

title="Activity"

text={
isOwnProfile
?
"Your community activity will appear here."
:
"Activity timeline is private."
}

/>

}




            {
              tab==="media" &&

              <ProfilePhotos
                user={user}
              />

            }





            {
              tab==="communities" &&

              <ProfileCommunities
                user={user}
              />

            }





            {
              tab==="about" &&

              <>

                <ProfileAbout
                  user={user}
                />


                <ProfileInterests
                  user={user}
                />


                <ProfileAchievements
                  user={user}
                />


                <ProfileSocialLinks
                  user={user}
                />


              </>

            }


          </section>





          <ProfileSidebar

            user={user}

          />



        </div>



      </main>


    </Layout>

  )

}


export default Profile