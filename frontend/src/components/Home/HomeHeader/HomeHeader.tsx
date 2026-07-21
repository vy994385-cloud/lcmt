import "./HomeHeader.css"


function HomeHeader(){

const user = JSON.parse(
  localStorage.getItem("user") || "{}"
)


const hour = new Date().getHours()


let greeting = "Good Evening"

if(hour < 12){
  greeting = "Good Morning"
}
else if(hour < 18){
  greeting = "Good Afternoon"
}


return(

<section className="home-header">

<h1>
{greeting}, {user.name || "there"} 👋
</h1>


<p>

What's happening in your communities today?

</p>


</section>

)

}


export default HomeHeader