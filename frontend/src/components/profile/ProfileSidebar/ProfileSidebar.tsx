import ProfileMutuals from "../ProfileMutuals/ProfileMutuals"
import ProfileCommunityPreview from "../ProfileCommunityPreview/ProfileCommunityPreview"
import ProfileTrending from "../ProfileTrending/ProfileTrending"

import "./ProfileSidebar.css"


interface Props{
  user:any
}


export default function ProfileSidebar({
  user
}:Props){

  return(

    <aside className="profile-sidebar">

      <ProfileMutuals
        user={user}
      />

      <ProfileCommunityPreview
        user={user}
      />

      <ProfileTrending />

    </aside>

  )

}