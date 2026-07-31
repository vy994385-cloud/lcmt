import TrendingCommunities from "./TrendingCommunities/TrendingCommunities"
import YourCommunities from "./YourCommunities/YourCommunities"
import SuggestedPeople from "./SuggestedPeople/SuggestedPeople"
import RecentChats from "./RecentChats/RecentChats"

import "./HomeSidebar.css"

interface Props{

  communities?:any[]

  people?:any[]

  chats?:any[]

  groups?:any[]

}

export default function HomeSidebar({

  communities=[],

  people=[],

  chats=[],



}:Props){

  return(

    <aside className="home-sidebar">

      <TrendingCommunities
        communities={communities}
      />

      <YourCommunities
        communities={communities}
      />

      <SuggestedPeople
        people={people}
      />

      <RecentChats
        chats={chats}
      />

      
    </aside>

  )

}