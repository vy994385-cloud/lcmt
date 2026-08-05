import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import Layout from "../components/Layout"
import Section from "../components/ui/Section/Section"

import UniversalSearch from "../components/search/UniversalSearch"
import CategoryChips from "../components/explore/CategoryChips"
import FeedTabs from "../components/explore/FeedTabs"
import MyCommunities from "../components/community/MyCommunities/MyCommunities"

import CommunityCard from "../components/community/CommunityCard"
import PostCard from "../components/cards/PostCard/PostCard"

import { getExploreData } from "../services/exploreService"
import type {
  ExploreResponse
} from "../types/Explore"

import "./Explore.css"

const emptyData: ExploreResponse = {
  posts: [],
  communities: [],
  people: [],
  events: [],
  trendingTopics: []
}

export default function Explore() {

  const navigate = useNavigate()

  const [feed, setFeed] =
    useState("For You")

  const [loading, setLoading] =
    useState(true)

  const [data, setData] =
    useState<ExploreResponse>(emptyData)

  useEffect(() => {

    loadExplore()

  }, [])

  async function loadExplore() {

    try {

      setLoading(true)

      const response =
        await getExploreData()

      setData(response)

    }

    catch (error) {

      console.error(error)

    }

    finally {

      setLoading(false)

    }

  }

  return (

    <Layout>

      <main className="explore-page">

        <div className="explore-header">

          <h1>
            Explore
          </h1>

          <p>
            Discover people, communities, conversations and events across LCMT.
          </p>

          <UniversalSearch />

          <MyCommunities />

        </div>

        <CategoryChips />

        <FeedTabs
          active={feed}
          setActive={setFeed}
        />

        {

          loading &&

          <div className="coming-card">

            Loading...

          </div>

        }

        {

          !loading &&

          <>

            <Section
              title="🔥 Latest Posts"
              subtitle="Recent conversations from the community"
            >

              <div className="featured-posts">

                {

                  (data.posts || []).map(post => (

                    <PostCard
                      key={post._id}
                      post={post as any}
                    />

                  ))

                }

              </div>

            </Section>

            <Section
              title="👥 Suggested People"
              subtitle="People you may know"
            >

              <div className="community-grid">

                {

                  (data.people || []).map(person => (

                    <div
                      key={person._id}
                      className="community-card"
                      onClick={() =>
                        navigate(`/profile/${person._id}`)
                      }
                    >

                      <img
                        src={
                          person.image ||
                          "https://i.pravatar.cc/150"
                        }
                        alt={person.name}
                        style={{
                          width: 72,
                          height: 72,
                          borderRadius: "50%"
                        }}
                      />

                      <h3>

                        {person.name}

                      </h3>

                      <p>

                        {person.headline}

                      </p>

                    </div>

                  ))

                }

              </div>

            </Section>

            <Section
              title="🌍 Communities"
              subtitle="Join conversations that interest you"
            >

              <div className="community-grid">

                {

                  (data.communities || []).map(c => (

                    <CommunityCard
                      key={c._id}
                      id={c._id}
                      name={c.name}
                      icon={c.icon}
                      members={String(c.members.length)}
posts={"0"}
                    />

                  ))

                }

              </div>

            </Section>

            <Section
              title="📅 Upcoming Events"
              subtitle="Don't miss what's happening"
            >

              <div className="community-grid">

                {

                  (data.events || []).map(event => (

                    <div
                      key={event._id}
                      className="community-card"
                    >

                      <h3>

                        {event.title}

                      </h3>

                      <p>

                        {event.location}

                      </p>

                      <small>

                        {

                          new Date(
                            event.startTime
                          ).toLocaleDateString()

                        }

                      </small>

                    </div>

                  ))

                }

              </div>

            </Section>

            <Section
              title="📈 Trending Topics"
              subtitle="Popular hashtags on LCMT"
            >

              <div className="community-grid">

                {

                  (data.trendingTopics || []).map(topic => (

                    <div
                      key={topic.name}
                      className="community-card"
                    >

                      <h3>

                        {topic.name}

                      </h3>

                      <p>

                        {topic.posts} posts

                      </p>

                    </div>

                  ))

                }

              </div>

            </Section>

          </>

        }

      </main>

    </Layout>

  )

}