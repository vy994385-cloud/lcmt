import {
  useEffect,
  useState
} from "react"

import {
  getNetwork,
  sendRequest,
  acceptRequest,
  rejectRequest,
  joinCommunity,
  type NetworkData
} from "../services/networkService"



const initialNetwork:NetworkData = {

  requests:[],

  discover:[],

  connections:[],

  communities:[],

  stats:{

    requests:0,

    connections:0,

    communities:0

  }

}



export default function useNetwork(){


  const [loading,setLoading] =
    useState(true)


  const [network,setNetwork] =
    useState<NetworkData>(
      initialNetwork
    )



  async function loadNetwork(){

    try{

      setLoading(true)

      const data =
        await getNetwork()

      setNetwork(data)

    }

    catch(error){

      console.log(
        "NETWORK LOAD ERROR:",
        error
      )

    }

    finally{

      setLoading(false)

    }

  }



  async function connect(id:string){

    await sendRequest(id)

    await loadNetwork()

  }



  async function accept(userId:string){

    await acceptRequest(userId)

    await loadNetwork()

  }



  async function reject(userId:string){

    await rejectRequest(userId)

    await loadNetwork()

  }



  async function join(communityId:string){

    await joinCommunity(
      communityId
    )

    await loadNetwork()

  }



  useEffect(()=>{

    loadNetwork()

  },[])



  return {

    // new structure

    network,

    loading,


    // old structure compatibility

    requests:
      network.requests,

    discover:
      network.discover,

    connections:
      network.connections,

    communities:
      network.communities,

    stats:
      network.stats,


    // actions

    reload:
      loadNetwork,

    connect,

    accept,

    reject,

    join

  }

}