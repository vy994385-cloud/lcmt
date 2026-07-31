import User from "../models/User"
import Community from "../models/Community"
import Post from "../models/Post"
import Event from "../models/Event"

export async function getExploreData(userId?: string) {
  const [
    posts,
    communities,
    people,
    events
  ] = await Promise.all([

    Post.find()
      .populate("user", "name username image headline")
      .populate("community", "name icon")
      .sort({ createdAt: -1 })
      .limit(20),

    Community.find()
      .populate("createdBy", "name image")
      .sort({ createdAt: -1 })
      .limit(12),

    User.find(
      userId
        ? { _id: { $ne: userId } }
        : {}
    )
      .select(
        "name username image headline bio interests followers"
      )
      .limit(12),

    Event.find()
      .populate("community", "name icon")
      .populate("createdBy", "name image")
      .sort({ startTime: 1 })
      .limit(10)

  ])

  const trendingTopics = buildTrendingTopics(posts)

  return {
    posts,
    communities,
    people,
    events,
    trendingTopics
  }
}

function buildTrendingTopics(posts: any[]) {

  const counter = new Map<string, number>()

  posts.forEach(post => {

    const text =
      String(post.content || "")

    const words =
      text.match(/#[A-Za-z0-9_]+/g) || []

    words.forEach(tag => {

      counter.set(
        tag,
        (counter.get(tag) || 0) + 1
      )

    })

  })

  return [...counter.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, posts]) => ({
      name,
      posts
    }))
}