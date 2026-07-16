import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import "./Login.css"


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


      await api.put("/profile", {

        age: Number(form.age),
        gender: form.gender,
        college: form.college,
        course: form.course,
        year: Number(form.year),
        bio: form.bio,

        interests: form.interests
          .split(",")
          .map(item => item.trim()),

        lookingFor: form.lookingFor,

        values: form.values
          .split(",")
          .map(item => item.trim()),

        personality: form.personality,

      })


      navigate("/discover")


    } catch(error) {

      console.log("Profile update failed", error)

      alert("Could not save profile")

    }

  }



  return (

    <main className="login-page">

      <section className="login-card">

        <div className="brand">

          <h1>LCMT ❤️</h1>

          <p>
            Love Creates Magic Together
          </p>

        </div>


        <h2>
          Build your profile
        </h2>


        <form onSubmit={handleSubmit}>


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
            placeholder="Year"
            value={form.year}
            onChange={handleChange}
          />


          <textarea
            name="bio"
            placeholder="Tell something about yourself"
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
            placeholder="What are you looking for?"
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
            placeholder="Describe your personality"
            value={form.personality}
            onChange={handleChange}
          />


          <button type="submit">
            Complete Profile ❤️
          </button>


        </form>


      </section>

    </main>

  )

}


export default Onboarding