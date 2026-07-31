import {
  useMemo,
  useState,
  useEffect
} from "react"

import {
  useParams
} from "react-router-dom"

import toast from "react-hot-toast"

import Layout from "../components/Layout"

import api from "../api/axios"

import CommunityBanner from "../components/community/CommunityBanner/CommunityBanner"
import CommunityTabs from "../components/community/CommunityTabs/CommunityTabs"
import CommunityFeed from "../components/community/CommunityFeed"
import CommunityDiscussions from "../components/community/CommunityDiscussions/CommunityDiscussions"
import CommunityAnnouncements from "../components/community/CommunityAnnouncements/CommunityAnnouncements"
import CommunityEvents from "../components/community/CommunityEvents/CommunityEvents"
import CommunityResources from "../components/community/CommunityResources/CommunityResources"
import CommunityMembers from "../components/community/CommunityMembers/CommunityMembers"
import CommunityAbout from "../components/community/CommunityAbout/CommunityAbout"

import "./CommunityDetails.css"


type Tab =
| "Feed"
| "Discussions"
| "Announcements"
| "Events"
| "Resources"
| "Members"
| "About"



export default function CommunityDetails(){


const {
id
}=useParams()



const [community,setCommunity]=
useState<any>(null)

const [communityPosts,setCommunityPosts]=
useState<any[]>([])

const [activeTab,setActiveTab]=
useState<Tab>("Feed")



async function loadCommunity(){

try{

const res =
await api.get(
`/communities/${id}`
)

setCommunity(
res.data
)

}

catch{

toast.error(
"Unable to load community"
)

}

}

async function loadPosts(){

try{

const res =
await api.get(
`/community-feed/${id}`
)

setCommunityPosts(
Array.isArray(res.data)
?
res.data
:
[]
)

}

catch(error){

console.log(
"POST LOAD ERROR",
error
)

}

}

useEffect(()=>{

if(id){

loadCommunity()

loadPosts()

}

},[id])




const content =
useMemo(()=>{


switch(activeTab){


case "Feed":

return (

<CommunityFeed

posts={communityPosts}

/>

)


case "Discussions":
return <CommunityDiscussions />


case "Announcements":
return <CommunityAnnouncements />


case "Events":
return <CommunityEvents />


case "Resources":
return <CommunityResources />


case "Members":
return (
  <CommunityMembers
    members={community.members || []}
  />
)


case "About":
return <CommunityAbout />


default:
return <CommunityFeed />

}

},[activeTab,communityPosts])




if(!community){

return (

<Layout>

<main className="community-page">

<h2>
Loading community...
</h2>

</main>

</Layout>

)

}




return(

<Layout>


<main className="community-page">


<CommunityBanner

community={{

name:community.name,

description:community.description,

image:community.icon,

members:
community.members?.length,

tags:
community.tags,

visibility:
community.isPublic
?
"Public"
:
"Private"

}}

/>



<CommunityTabs

active={activeTab}

setActive={(tab)=>
setActiveTab(tab as Tab)
}

/>



<section className="community-content">

{content}

</section>


</main>


</Layout>

)


}