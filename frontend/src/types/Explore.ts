export interface ExploreUser {

  _id:string

  name:string

  username?:string

  image:string

  headline?:string

  bio?:string

  interests:string[]

  followers:string[]

}

export interface ExploreCommunity{

  _id:string

  name:string

  description:string

  category:string

  icon:string

  members:string[]

}

export interface ExplorePost{

  _id:string

  content:string

  createdAt:string

  likes:string[]

  comments:any[]

  user:ExploreUser

  community?:{

    _id:string

    name:string

    icon:string

  }

}

export interface ExploreEvent{

  _id:string

  title:string

  description:string

  image:string

  location:string

  startTime:string

  endTime:string

}

export interface TrendingTopic{

  name:string

  posts:number

}

export interface ExploreResponse{

  posts:ExplorePost[]

  communities:ExploreCommunity[]

  people:ExploreUser[]

  events:ExploreEvent[]

  trendingTopics:TrendingTopic[]

}