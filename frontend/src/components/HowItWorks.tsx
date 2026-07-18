import "./HowItWorks.css"

function HowItWorks() {

  const steps = [
    {
      number: "01",
      title: "Create Your Story",
      text: "Build a profile that reflects your interests, passions, dreams, and personality—not just a photo."
    },
    {
      number: "02",
      title: "Share Your Thoughts",
      text: "Answer meaningful prompts and express your opinions so others can discover the real you."
    },
    {
      number: "03",
      title: "Discover Minds",
      text: "Explore people through their ideas, values, and conversations before first impressions."
    },
    {
      number: "04",
      title: "Build Real Connections",
      text: "Start conversations that can grow into friendships, collaborations, or something truly meaningful."
    }
  ]

  return (

    <section className="how">

      <div className="how-header">

        <span className="how-tag">
          ⚙️ Your Journey
        </span>

        <h2>
          How LCMT Works
        </h2>

        <p>
          Great relationships don't begin with a swipe.
          They begin with understanding.
        </p>

      </div>


      <div className="timeline">

        {steps.map((step, index) => (

          <div
            className="timeline-item"
            key={index}
          >

            <div className="timeline-left">

              <div className="timeline-number">

                {step.number}

              </div>

              {index !== steps.length - 1 &&
                <div className="timeline-line"></div>
              }

            </div>


            <div className="timeline-content">

              <h3>

                {step.title}

              </h3>

              <p>

                {step.text}

              </p>

            </div>

          </div>

        ))}

      </div>

    </section>

  )

}

export default HowItWorks