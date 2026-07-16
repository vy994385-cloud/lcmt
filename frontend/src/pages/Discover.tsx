import { useApp } from "../context/AppContext"


function calculateCompatibility(currentUser:any, user:any){

  let score = 0


  if(
    currentUser.college &&
    currentUser.college === user.college
  ){
    score += 20
  }


  if(
    currentUser.course &&
    currentUser.course === user.course
  ){
    score += 20
  }


  const commonInterests =
    currentUser.interests?.filter(
      (item:string)=>
        user.interests?.includes(item)
    ) || []


  score += commonInterests.length * 10



  const commonValues =
    currentUser.values?.filter(
      (item:string)=>
        user.values?.includes(item)
    ) || []


  score += commonValues.length * 10



  if(score > 100){
    score = 100
  }


  return score

}




function Discover(){


  const {
    users,
    matches,
    passedUsers,
    likeUser,
    passUser
  } = useApp()



  const currentUser =
    JSON.parse(
      localStorage.getItem("user") || "{}"
    )




  const availableUsers =
    users.filter(
      (user)=>

        user.id !== currentUser._id &&

        !matches.some(
          match=>match.id===user.id
        )

        &&

        !passedUsers.some(
          passed=>passed.id===user.id
        )

    )




  return (

    <main style={{
      padding:"40px"
    }}>


      <h1>
        Discover ❤️
      </h1>



      {
        availableUsers.length===0 ?

        (

          <p>
            No more profiles available ❤️
          </p>

        )

        :

        (

          <div
          style={{
            display:"flex",
            gap:"25px",
            flexWrap:"wrap"
          }}
          >


          {
            availableUsers.map(
              (user)=>(


              <div

              key={user.id}

              style={{

                width:"300px",

                border:
                "1px solid #ddd",

                borderRadius:"20px",

                padding:"20px"

              }}

              >



              <img

              src={user.image}

              alt={user.name}

              style={{

                width:"100%",

                height:"300px",

                objectFit:"cover",

                borderRadius:"15px"

              }}

              />




              <h2>

                {user.name}, {user.age}

              </h2>




              <h3>

                ❤️ Compatibility:
                {" "}
                {
                  calculateCompatibility(
                    currentUser,
                    user
                  )
                }%

              </h3>




              <p>
                {user.bio}
              </p>




              <p>
                🎓 {user.college}
              </p>


              <p>
                💻 {user.course}
              </p>



              <p>

                🎯

                {
                  (user.interests || []).join(" • ")

                }

              </p>




              <div
              style={{
                display:"flex",
                justifyContent:"space-between"
              }}
              >

              <button
              onClick={()=>
                passUser(user)
              }
              >
                ❌ Pass
              </button>




              <button
              onClick={()=>
                likeUser(user)
              }
              >
                ❤️ Like
              </button>


              </div>



              </div>


              )

            )
          }


          </div>

        )

      }



    </main>

  )

}


export default Discover