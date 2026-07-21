import type { Post } from "../types/Post"

const posts: Post[] = [

{
id:"1",

author:{
id:"1",
name:"Aryan Kumar",
avatar:"https://i.pravatar.cc/150?img=11"
},

community:{
id:"1",
name:"Cricket Hub",
icon:"🏏",
description:"",
members:12000,
category:"Sports"
},

content:
"India's bowling attack looked much sharper today. What changes would you make before the next match?",

tags:[
"Cricket",
"India"
],

likes:241,

comments:39,

shares:12,

createdAt:"2h ago"
},

{
id:"2",

author:{
id:"2",
name:"Priya Sharma",
avatar:"https://i.pravatar.cc/150?img=5"
},

community:{
id:"2",
name:"AI Builders",
icon:"🤖",
description:"",
members:8500,
category:"Technology"
},

content:
"Open-source AI tools are evolving rapidly. Which one has improved your workflow the most this month?",

tags:[
"AI",
"OpenSource"
],

likes:318,

comments:61,

shares:27,

createdAt:"4h ago"
}

]

export default posts