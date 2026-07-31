export interface Person {

    id:string

    name:string

    image?:string

    bio:string

    interests:string[]

    common?:string

}



export interface Community {

    id:string

    name:string

    description:string

    interests:string[]

    members:number

}





export const connectionRequests:Person[]=[

{

id:"1",

name:"Rahul Sharma",

bio:"Building AI projects and exploring new technology ideas",

interests:[
"🤖 AI",
"💻 Coding",
"🚀 Startups"
],

common:"AI & ML Community"

},

{

id:"2",

name:"Priya Singh",

bio:"Web developer interested in creative projects",

interests:[
"🌐 Web Development",
"🎨 Design",
"📚 Learning"
],

common:"Web Development Community"

}

]






export const discoverPeople:Person[]=[

{

id:"3",

name:"Aman Verma",

bio:"Machine learning enthusiast building student projects",

interests:[
"🤖 Machine Learning",
"🏆 Hackathons",
"📖 Research"
],

common:"Coding Interests"

},

{

id:"4",

name:"Neha Gupta",

bio:"Creative designer who loves photography and movies",

interests:[
"🎨 Design",
"📸 Photography",
"🎬 Movies"
],

common:"Creative Community"

}

]






export const myConnections:Person[]=[

{

id:"5",

name:"Arjun Mehta",

bio:"AI enthusiast building projects and exploring new ideas",

interests:[
"🤖 AI",
"🚀 Startups",
"💻 Projects"
]

},

{

id:"6",

name:"Simran Kaur",

bio:"Creative thinker interested in design and technology",

interests:[
"🎨 Design",
"📸 Photography",
"💡 Creativity"
]

}

]







export const communityInvitations:Community[]=[

{

id:"1",

name:"AI Research Circle",

description:"A community for students exploring artificial intelligence",

interests:[
"🤖 AI",
"🧠 Research",
"💡 Innovation"
],

members:320

},

{

id:"2",

name:"Startup Builders",

description:"A space for creators, founders and idea explorers",

interests:[
"🚀 Startups",
"💼 Business",
"🔥 Ideas"
],

members:180

}

]