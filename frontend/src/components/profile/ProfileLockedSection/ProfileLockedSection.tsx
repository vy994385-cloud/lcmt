import "./ProfileLockedSection.css"

interface Props{
  icon:string
  title:string
  text:string
}

export default function ProfileLockedSection({
  icon,
  title,
  text
}:Props){

return(

<section className="profile-locked">

<div className="locked-icon">
{icon}
</div>

<h2>
{title}
</h2>

<p>
{text}
</p>

</section>

)

}