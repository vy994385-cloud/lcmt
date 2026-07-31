import {
  useState
} from "react"

import {
  useNavigate
} from "react-router-dom"

import useNetwork from "../hooks/useNetwork"

import "./Network.css"

import NetworkHeader from "../components/NetworkHeader/NetworkHeader"
import NetworkTabs from "../components/NetworkTabs/NetworkTabs"
import NetworkSection from "../components/NetworkSection/NetworkSection"

import FriendRequestCard from "../components/FriendRequestCard/FriendRequestCard"
import ConnectionCard from "../components/ConnectionCard/ConnectionCard"
import CommunityInviteCard from "../components/CommunityInviteCard/CommunityInviteCard"
import SocialStats from "../components/network/SocialStats/SocialStats"
import QuickActions from "../components/network/QuickActions/QuickActions"
import ActivityFeed from "../components/network/ActivityFeed/ActivityFeed"
import TrendingCommunities from "../components/network/TrendingCommunities/TrendingCommunities"


export default function Network(){


const navigate = useNavigate()


const {
 network,
 loading,
 connect,
 accept,
 reject,
 join

}=useNetwork()



const {
 requests,
 discover,
 connections,
 communities,
 stats

}=network



const [
 activeTab,
 setActiveTab
]=useState("all")





if(loading){

return (

<main className="network-page">

<h2>
Loading your circle...
</h2>

</main>

)

}




return (

<main className="network-page">


<NetworkHeader

connections={stats.connections}

communities={stats.communities}

requests={stats.requests}

/>

<SocialStats
  stats={stats}
/>

<QuickActions />

<ActivityFeed
 connections={stats.connections}
 communities={stats.communities}
/>

<TrendingCommunities />


<NetworkTabs

active={activeTab}

onChange={setActiveTab}

/>





{
(activeTab==="all" ||
activeTab==="requests") &&

<NetworkSection

title="Friend Requests"

description="People who want to join your circle"

>

<div className="network-grid">


{
requests.map(
(person:any)=>(

<FriendRequestCard

key={person._id}

id={person._id}

name={person.name}

bio={person.bio}

image={person.image}

interests={person.interests || []}

status="request"


onAccept={()=>
accept(person._id)
}


onReject={()=>
reject(person._id)
}


onViewProfile={()=>
navigate(`/profile/${person._id}`)
}

/>

)

)

}


</div>


</NetworkSection>

}







{
(activeTab==="all" ||
activeTab==="people") &&


<NetworkSection

title="People Around You"

description="Discover people with shared interests"

>


<div className="network-grid">


{
discover.map(
(person:any)=>(


<FriendRequestCard

key={person._id}

id={person._id}

name={person.name}

bio={person.bio}

image={person.image}

interests={person.interests || []}

status="suggestion"


onConnect={()=>
connect(person._id)
}


onViewProfile={()=>
navigate(`/profile/${person._id}`)
}

/>


)

)

}


</div>


</NetworkSection>

}







{
(activeTab==="all" ||
activeTab==="connections") &&


<NetworkSection

title="Friends"

description="Your social circle"

>


<div className="network-grid">


{
connections.map(
(person:any)=>(


<ConnectionCard

key={person._id}

id={person._id}

name={person.name}

bio={person.bio}

image={person.image}

interests={person.interests || []}

/>


)

)

}


</div>


</NetworkSection>

}








{
(activeTab==="all" ||
activeTab==="communities") &&


<NetworkSection

title="Communities"

description="Communities to explore together"

>


<div className="network-grid">


{
communities.map(
(community:any)=>(


<CommunityInviteCard

key={community._id}

id={community._id}

name={community.name}

bio={community.description}

members={community.members?.length || 0}

onJoin={()=>
join(community._id)
}

/>


)

)

}


</div>


</NetworkSection>

}



</main>

)

}