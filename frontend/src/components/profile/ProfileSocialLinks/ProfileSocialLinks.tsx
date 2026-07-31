import "./ProfileSocialLinks.css"

interface Props{
  user:any
}

function ProfileSocialLinks({
  user
}:Props){

  const links=[

    {
      icon:"🌐",
      name:"Website",
      url:user.website
    },

    {
      icon:"💼",
      name:"LinkedIn",
      url:user.linkedin
    },

    {
      icon:"🐙",
      name:"GitHub",
      url:user.github
    },

    {
      icon:"𝕏",
      name:"X",
      url:user.twitter
    },

    {
      icon:"📸",
      name:"Instagram",
      url:user.instagram
    },

    {
      icon:"🎥",
      name:"YouTube",
      url:user.youtube
    }

  ].filter(item=>item.url)



  return(

<section className="profile-social">


<div className="social-header">

<div>

<h2>
Links
</h2>

<p>
Find this member across the web
</p>

</div>

<span>

{links.length}

</span>

</div>



{

links.length===0

?

<div className="social-empty">

🔗

<p>

No public links added.

</p>

</div>

:

<div className="social-list">

{

links.map((item,index)=>(

<a

key={index}

href={item.url}

target="_blank"

rel="noreferrer"

className="social-item"

>

<div>

{item.icon}

</div>

<strong>

{item.name}

</strong>

</a>

))

}

</div>

}


</section>

)

}

export default ProfileSocialLinks