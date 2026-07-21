import "./ExploreHero.css"

import Input from "../ui/Input/Input"
import Button from "../ui/Button/Button"
import Chip from "../ui/Chip/Chip"

const filters = [
  "🔥 Trending",
  "🕒 Latest",
  "🌍 Communities",
  "👥 People",
  "📅 Events",
  "📊 Polls",
]

const trendingTopics = [
  "🏏 Cricket",
  "⚽ Football",
  "🏛 Politics",
  "🤖 Artificial Intelligence",
  "💻 Programming",
  "🚀 Startups",
  "🎬 Movies",
  "🎵 Music",
  "📚 Books",
  "✈️ Travel",
  "💼 Careers",
  "🎨 Design",
]

function ExploreHero() {
  return (
    <section className="explore-hero">

      <div className="explore-hero-content">

        <span className="hero-badge">
          🌍 Communities • Conversations • Connections
        </span>

        <h1>
          Discover Ideas,
          <br />
          Communities &
          <br />
          Conversations
        </h1>

        <p>
          Explore public discussions, join communities, discover events,
          connect with like-minded people, and stay updated with what's
          happening around you.
        </p>

        <div className="hero-search">

          <Input
            placeholder="Search communities, people, posts, events..."
          />

          <Button>
            Search
          </Button>

        </div>

        <div className="hero-filters">

          {
            filters.map((filter) => (

              <Chip
                key={filter}
                label={filter}
              />

            ))
          }

        </div>

        <div className="hero-chips">

          {
            trendingTopics.map((topic) => (

              <Chip
                key={topic}
                label={topic}
              />

            ))
          }

        </div>

        <div className="hero-stats">

          <div className="hero-stat">

            <h3>120+</h3>

            <span>Communities</span>

          </div>

          <div className="hero-stat">

            <h3>15K+</h3>

            <span>Members</span>

          </div>

          <div className="hero-stat">

            <h3>4K+</h3>

            <span>Daily Discussions</span>

          </div>

          <div className="hero-stat">

            <h3>250+</h3>

            <span>Weekly Events</span>

          </div>

        </div>

      </div>

    </section>
  )
}

export default ExploreHero