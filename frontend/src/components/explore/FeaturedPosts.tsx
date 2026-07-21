import Section from "../ui/Section/Section"
import PostCard from "../cards/PostCard/PostCard"

import posts from "../../mock/posts"

import "./FeaturedPosts.css"

function FeaturedPosts() {

  return (

    <Section
      title="🔥 Featured Discussions"
      subtitle="Trending conversations across LCMT"
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

  )

}

export default FeaturedPosts