import "./Profile.css"

function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  )


  return (

    <main className="profile-page">


      <section className="profile-card">


        <div className="profile-cover"></div>



        <img
          className="profile-image"
          src={
            user.image ||
            "https://picsum.photos/300/300"
          }
          alt="Profile"
        />




        <div className="profile-header">


          <h1>
            {user.name || "LCMT User"}, {user.age || ""}
          </h1>


          <p>
            {user.bio || "No bio added yet ❤️"}
          </p>


        </div>







        <div className="profile-details">



          <div className="detail-box">

            <span>
              🎓
            </span>

            <h3>
              College
            </h3>

            <p>
              {user.college || "Not added"}
            </p>

          </div>





          <div className="detail-box">

            <span>
              💻
            </span>

            <h3>
              Course
            </h3>

            <p>
              {user.course || "Not added"}
            </p>

          </div>



        </div>







        <div className="section">


          <h2>
            ✨ Interests
          </h2>


          <div className="chips">


            {
              user.interests?.length ?

              user.interests.map(
                (item:string)=>(
                  <span key={item}>
                    {item}
                  </span>
                )
              )

              :

              <p>
                No interests added
              </p>
            }


          </div>


        </div>








        <div className="section">


          <h2>
            💎 Values
          </h2>


          <div className="chips">


            {
              user.values?.length ?

              user.values.map(
                (item:string)=>(
                  <span key={item}>
                    {item}
                  </span>
                )
              )

              :

              <p>
                No values added
              </p>

            }


          </div>


        </div>






        <div className="personality-box">


          <h2>
            🧠 Personality
          </h2>


          <p>
            {user.personality || 
            "Tell people about yourself"}
          </p>


        </div>




      </section>



    </main>

  )

}


export default Profile