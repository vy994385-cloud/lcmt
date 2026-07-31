import api from "../api/axios"


export interface NetworkData {

  requests:any[]

  discover:any[]

  connections:any[]

  communities:any[]

  stats:{
    requests:number
    connections:number
    communities:number
  }

}


// Get complete network state

export async function getNetwork()
:Promise<NetworkData>{

  const response =
    await api.get("/network")

  return response.data

}



// Send connection request

export async function sendRequest(
  id:string
){

  const response =
    await api.post(
      `/friends/request/${id}`
    )

  return response.data

}



// Accept request

export async function acceptRequest(
  id:string
){

  const response =
    await api.post(
      `/friends/accept/${id}`
    )

  return response.data

}



// Reject request

export async function rejectRequest(
  id:string
){

  const response =
    await api.post(
      `/friends/reject/${id}`
    )

  return response.data

}



// Join community

export async function joinCommunity(
  id:string
){

  const response =
    await api.post(
      `/communities/${id}/join`
    )

  return response.data

}



// Universal user search

export async function searchPeople(
  query:string
){

  const response =
    await api.get(
      `/users/search?q=${query}`
    )

  return response.data

}



// Get suggestions

export async function getSuggestions(){

  const response =
    await api.get(
      "/users/discover"
    )

  return response.data

}