import "./CommunityAbout.css"

const rules = [

"Be respectful to everyone.",

"Keep discussions relevant.",

"No spam or self-promotion.",

"Credit original creators.",

"Help others whenever possible."

]

const tags = [

"AI",

"Machine Learning",

"Python",

"Startups",

"Technology"

]

function CommunityAbout(){

return(

<section className="community-about">

<h2>

ℹ️ About Community

</h2>

<div className="about-section">

<h3>

📖 About

</h3>

<p>

A community for people passionate about Artificial Intelligence, Machine Learning and building impactful projects together.

</p>

</div>

<div className="about-section">

<h3>

🎯 Purpose

</h3>

<p>

Learn together, collaborate on projects, share opportunities and help each other grow.

</p>

</div>

<div className="about-section">

<h3>

📜 Community Rules

</h3>

<ul>

{

rules.map(rule=>(

<li key={rule}>

{rule}

</li>

))

}

</ul>

</div>

<div className="about-grid">

<div className="info-card">

<h4>

🌍 Visibility

</h4>

<p>

Public Community

</p>

</div>

<div className="info-card">

<h4>

📅 Created

</h4>

<p>

January 2026

</p>

</div>

<div className="info-card">

<h4>

👤 Founder

</h4>

<p>

LCMT Team

</p>

</div>

<div className="info-card">

<h4>

📈 Activity

</h4>

<p>

12.4k Members

</p>

</div>

</div>

<div className="about-section">

<h3>

🏷 Tags

</h3>

<div className="tags">

{

tags.map(tag=>(

<span key={tag}>

#{tag}

</span>

))

}

</div>

</div>

<div className="about-section">

<h3>

🔗 Community Links

</h3>

<div className="links">

<button>

🌐 Website

</button>

<button>

💻 GitHub

</button>

<button>

📷 Instagram

</button>

</div>

</div>

</section>

)

}

export default CommunityAbout