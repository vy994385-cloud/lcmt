import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import "./ProfileStickyHeader.css"


function ProfileStickyHeader({
  user,
  isOwnProfile,
  tab
}:any){

  const navigate = useNavigate()

  const [show,setShow]=useState(false)


  useEffect(()=>{

    function handleScroll(){

      setShow(
        window.scrollY > 350
      )

    }


    window.addEventListener(
      "scroll",
      handleScroll
    )


    return()=>{

      window.removeEventListener(
        "scroll",
        handleScroll
      )

    }

  },[])



  if(!show) return null



  return(

    <div className="sticky-profile-header">


      <div className="sticky-left">


        <button
          className="back-btn"
          onClick={()=>{
            navigate(-1)
          }}
        >

          ←

        </button>


        <img

          src={
            user.image ||
            "https://placehold.co/100"
          }

          alt="profile"

        />


        <div>

          <h3>

            {user.name || user.username}

            {
              user.verified &&
              <span>
                ✔
              </span>
            }

          </h3>


          <p>
            @{user.username}
          </p>


        </div>


      </div>




      <div className="sticky-right">


        {
          isOwnProfile

          ?

          <button
            onClick={()=>
              navigate("/edit-profile")
            }
          >

            Edit

          </button>

          :

          <button>

            Follow

          </button>

        }


      </div>



      <div className="sticky-tab">

        {tab}

      </div>


    </div>

  )

}


export default ProfileStickyHeader