import "./Section.css"

interface SectionProps {
  title:string
  subtitle?:string
  children:React.ReactNode
}

function Section({
  title,
  subtitle,
  children
}:SectionProps){

  return (

    <section className="section">

      <h2>
        {title}
      </h2>

      {subtitle && (
        <p className="section-subtitle">
          {subtitle}
        </p>
      )}

      <div>
        {children}
      </div>

    </section>

  )

}

export default Section