import "./TrendingTopics.css"

const topics = [
  {
    tag: "Technology",
    posts: "18.2K discussions",
    trend: "↑ 12%"
  },
  {
    tag: "Artificial Intelligence",
    posts: "12.4K discussions",
    trend: "Hot"
  },
  {
    tag: "Politics",
    posts: "25.8K discussions",
    trend: "Live"
  },
  {
    tag: "Finance",
    posts: "7.1K discussions",
    trend: "↑ 6%"
  },
  {
    tag: "Cricket",
    posts: "16.9K discussions",
    trend: "Trending"
  },
  {
    tag: "Startups",
    posts: "4.5K discussions",
    trend: "Growing"
  },
  {
    tag: "Movies",
    posts: "11K discussions",
    trend: "Popular"
  },
  {
    tag: "Gaming",
    posts: "8.7K discussions",
    trend: "Hot"
  }
]

function TrendingTopics() {

  return (

    <div className="trending-grid">

      {

        topics.map(topic => (

          <button
            key={topic.tag}
            className="topic-card"
          >

            <small>
              {topic.trend}
            </small>

            <h4>
              #{topic.tag}
            </h4>

            <span>
              {topic.posts}
            </span>

          </button>

        ))

      }

    </div>

  )

}

export default TrendingTopics