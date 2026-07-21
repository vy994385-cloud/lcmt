import { useState } from "react"

import Section from "../components/ui/Section/Section"
import UniversalSearch from "../components/search/UniversalSearch"
import CategoryChips from "../components/explore/CategoryChips"
import FeedTabs from "../components/explore/FeedTabs"
import TrendingTopics from "../components/explore/TrendingTopics"

import PostCard from "../components/cards/PostCard/PostCard"
import CommunityCard from "../components/community/CommunityCard"

import posts from "../mock/posts"
import communities from "../mock/communities"

import "./Explore.css"
import MyCommunities from "../components/community/MyCommunities/MyCommunities"

function Explore() {

  const [feed, setFeed] = useState("For You")

  return (

    <main className="explore-page">

      <div className="explore-header">

        <h1>
          Explore
        </h1>

        <p>
          Discover conversations, ideas, communities and people from every interest.
        </p>

        <UniversalSearch />

        <MyCommunities />

      </div>

      <CategoryChips />

      <FeedTabs
        active={feed}
        setActive={setFeed}
      />

      <Section
        title="🔥 Trending Discussions"
        subtitle="The conversations everyone is talking about"
      >

        <div className="featured-posts">

          {
            posts.map(post => (

              <PostCard
                key={post.id}
                post={post}
              />

            ))
          }

        </div>

      </Section>

      <Section
        title="👥 People You May Like"
        subtitle="Interesting people worth following"
      >

        <div className="coming-card">

          Smart recommendations coming soon

        </div>

      </Section>

      <Section
        title="🔥 Trending Topics"
        subtitle="See what people across LCMT are discussing right now"
      >

        <TrendingTopics />

      </Section>

      <Section
        title="🌍 Popular Communities"
        subtitle="Find your people and join the conversations"
      >

        <div className="community-grid">

          {

            communities.map(c => (

              <CommunityCard

key={c.id}

id={c.id}

name={c.name}

icon={c.icon}

members={c.members}

posts={c.posts}

/>

            ))

          }

        </div>

      </Section>

    </main>

  )

}

export default Explore