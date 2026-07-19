import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import "./Onboarding.css"


function Onboarding() {

  const navigate = useNavigate()


  const [form, setForm] = useState({

    age: "",
    gender: "",
    college: "",
    course: "",
    year: "",
    bio: "",
    interests: "",
    lookingFor: "",
    values: "",
    personality: "",

  })



  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    })

  }





  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault()


    try {


      const response = await api.put("/profile", {


  age:Number(form.age),

  gender:form.gender,

  college:form.college,

  course:form.course,

  year:Number(form.year),

  bio:form.bio,

  interests:
    form.interests
    .split(",")
    .map(item=>item.trim())
    .filter(Boolean),


  lookingFor:form.lookingFor,


  values:
    form.values
    .split(",")
    .map(item=>item.trim())
    .filter(Boolean),


  personality:form.personality,


})


localStorage.setItem(
  "user",
  JSON.stringify(response.data)
)



      navigate("/home")


    } catch(error) {


      console.log(
        "Profile update failed",
        error
      )


      alert(
        "Could not save profile"
      )


    }


  }





  return (


    <main className="onboarding-page">



      <div className="onboarding-card">



        <div className="onboarding-brand">


          <h1>
            LCMT ❤️
          </h1>


          <p>
            Love Creates Magic Together
          </p>


        </div>





        <div className="welcome-text">


          <h2>
            Build your identity ✨
          </h2>


          <p>
            LCMT is not just about profiles.
            It's about understanding people.
          </p>


        </div>







        <form onSubmit={handleSubmit}>



          <div className="input-grid">


            <input
              name="age"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
            />



            <input
              name="gender"
              placeholder="Gender"
              value={form.gender}
              onChange={handleChange}
            />



            <input
              name="college"
              placeholder="College"
              value={form.college}
              onChange={handleChange}
            />



            <input
              name="course"
              placeholder="Course"
              value={form.course}
              onChange={handleChange}
            />



            <input
              name="year"
              placeholder="Current Year"
              value={form.year}
              onChange={handleChange}
            />


          </div>





          <textarea

            name="bio"

            placeholder="Tell something about yourself..."

            value={form.bio}

            onChange={handleChange}

          />






          <input

            name="interests"

            placeholder="Interests (Coding, Music, Cricket)"

            value={form.interests}

            onChange={handleChange}

          />







          <input

            name="lookingFor"

            placeholder="What kind of connection are you looking for?"

            value={form.lookingFor}

            onChange={handleChange}

          />







          <input

            name="values"

            placeholder="Your values (Honesty, Growth)"

            value={form.values}

            onChange={handleChange}

          />








          <textarea

            name="personality"

            placeholder="Describe your personality..."

            value={form.personality}

            onChange={handleChange}

          />








          <button type="submit">

            Complete Profile ❤️

          </button>



        </form>




      </div>



    </main>


  )

}


export default Onboarding