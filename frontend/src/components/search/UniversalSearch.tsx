import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { Link } from "react-router-dom"

import posts from "../../mock/posts"
import people from "../../mock/people"
import communities from "../../mock/communities"

import "./UniversalSearch.css"


export default function UniversalSearch() {


  const [query,setQuery] = useState("")


  const q = query.toLowerCase().trim()



  const results = useMemo(()=>{


    if(!q) return null



    return {


      people:

      people.filter(person=>(

        person.name +
        person.bio +
        person.interests.join(" ")

      )
      .toLowerCase()
      .includes(q)
      ),




      posts: posts.filter(post=>(

  post.content +
  (post.tags?.join(" ") || "")

)
.toLowerCase()
.includes(q)
),
    





      communities: communities.filter(c=>(

  c.name +
  c.members +
  c.posts

)
.toLowerCase()
.includes(q)
),

    }


  },[q])




return (

<div className="universal-search">



<div className="search-box">


<Search size={18}/>



<input

placeholder="Search people, discussions, communities..."

value={query}

onChange={(e)=>
setQuery(e.target.value)
}

/>


</div>





{

query && results &&

<div className="search-results">





{/* PEOPLE */}


{

results.people.length > 0 &&

<>

<h4>
👤 People
</h4>


{

results.people.map(person=>(


<Link

key={person.id}

to={`/profile/${person.id}`}

className="search-result"

onClick={()=>
setQuery("")
}

>

{person.name}


</Link>


))


}

</>


}







{/* POSTS */}


{

results.posts.length > 0 &&

<>

<h4>
💬 Discussions
</h4>


{

results.posts.map(post=>(


<Link

key={post.id}

to={`/post/${post.id}`}

className="search-result"

onClick={()=>
setQuery("")
}

>

{

post.content.length > 60

?

post.content.slice(0,60)+"..."

:

post.content

}



</Link>


))


}


</>


}








{/* COMMUNITIES */}


{

results.communities.length > 0 &&

<>

<h4>
🌍 Communities
</h4>


{

results.communities.map(c=>(


<Link

key={c.id}

to={`/community/${c.id}`}

className="search-result"

onClick={()=>
setQuery("")
}

>

{c.name}


</Link>


))


}


</>


}







{

results.people.length===0 &&

results.posts.length===0 &&

results.communities.length===0 &&


<div className="no-results">

No results found

</div>


}





</div>


}



</div>


)

}