import "./WhyLCMT.css"

function WhyLCMT() {

  const features = [
    {
      icon: "💭",
      title: "Thoughts Before Photos",
      text: "Discover opinions, interests, and personalities before appearances. Because meaningful connections begin with understanding."
    },
    {
      icon: "❤️",
      title: "Meaningful Connections",
      text: "Meet people who share your values, ambitions, and outlook—not just your swipe direction."
    },
    {
      icon: "🎓",
      title: "Built For Students",
      text: "Connect with students, make friends, discover collaborators, or find someone special within a trusted community."
    },
    {
      icon: "🔒",
      title: "Safe & Respectful",
      text: "A welcoming space built around kindness, authenticity, and conversations that matter."
    }
  ]

  return (

    <section className="why">

      <div className="section-header">

        <span className="section-tag">
          ✨ Our Philosophy
        </span>

        <h2>
          Why Choose LCMT?
        </h2>

        <p>
          Because people are more than pictures. LCMT helps you discover
          personalities, ideas, and genuine connections before first
          impressions.
        </p>

      </div>


      <div className="cards">

        {features.map((item, index) => (

          <div
            className="why-card"
            key={index}
          >

            <div className="feature-icon">
              {item.icon}
            </div>

            <h3>
              {item.title}
            </h3>

            <p>
              {item.text}
            </p>

          </div>

        ))}

      </div>

    </section>

  )

}

export default WhyLCMT