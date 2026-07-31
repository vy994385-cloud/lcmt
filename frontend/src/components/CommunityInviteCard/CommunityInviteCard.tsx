import { useState } from "react"

import "./CommunityInviteCard.css"

interface Props{

  id?:string

  name:string

  bio?:string

  image?:string

  interests?:string[]

  members?:number

  onJoin?:()=>void

}

export default function CommunityInviteCard({

  id,

  name,

  bio,

  image,

  interests=[],

  members=0,

  onJoin

}:Props){

  const [loading,setLoading]=useState(false)

  const [joined,setJoined]=useState(false)



  async function handleJoin(){

    setLoading(true)

    try{

      await onJoin?.()

      setJoined(true)

    }

    finally{

      setLoading(false)

    }

  }



  return(

    <div
      className="community-invite-card"
      data-id={id}
    >

      <img

        src={
          image ||
          "https://picsum.photos/200"
        }

        alt={name}

        className="community-avatar"

      />



      <div className="community-info">

        <h3>

          {name}

        </h3>



        {

          bio &&

          <p className="community-bio">

            {bio}

          </p>

        }



        {

          interests.length>0 &&

          <div className="interest-list">

            {

              interests.map((item,index)=>(

                <span key={index}>

                  {item}

                </span>

              ))

            }

          </div>

        }



        <p className="member-count">

          👥 {members} members

        </p>



        <button

          className="join-btn"

          disabled={loading||joined}

          onClick={handleJoin}

        >

          {

            joined

            ?

            "Joined ✓"

            :

            loading

            ?

            "Joining..."

            :

            "Join Community"

          }

        </button>

      </div>

    </div>

  )

}