import { useParams } from "react-router-dom"
import { useState } from "react"

import CommunityHeader from "../components/community/CommunityHeader"
import CommunityTabs from "../components/community/CommunityTabs"
import CommunityFeed from "../components/community/CommunityFeed"
import CreateContent from "../components/community/CreateContent/CreateContent"

import communities from "../mock/communities"

import "./Community.css"
import Communities from "./pages/Communities"


function Community(){


  const { id } = useParams()



  const [activeTab,setActiveTab] = useState("Feed")



  const [communityPosts,setCommunityPosts] = useState<any[]>([])




  const community = communities.find(
    c => c.id === id
  )





  if(!community){

    return (

      <main>

        <h2>
          Community not found
        </h2>

      </main>

    )

  }





  return (

    <main className="community-page">



      <CommunityHeader

        community={community}

      />




      <CreateContent

        onCreate={(post)=>

          setCommunityPosts(prev => [

            post,

            ...prev

          ])

        }

      />





      <CommunityTabs

        active={activeTab}

        setActive={setActiveTab}

      />





      <CommunityFeed

        community={community}

        tab={activeTab}

        posts={communityPosts}

      />



    </main>

  )

}



export default Community