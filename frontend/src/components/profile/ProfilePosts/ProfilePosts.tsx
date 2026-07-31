import PostCard from "../../cards/PostCard/PostCard"
import "./ProfilePosts.css"

interface Props{
  user:any
}

export default function ProfilePosts({
  user
}:Props){

  const posts = user.posts || []

  return(

    <section className="profile-posts">

      <div className="posts-header">

        <h2>
          📝 Posts
        </h2>

        <span>
          {posts.length} Posts
        </span>

      </div>

      {

        posts.length===0

        ?

        <div className="empty-posts">

          <h3>
            Nothing posted yet
          </h3>

          <p>
            When posts are shared, they'll appear here.
          </p>

        </div>

        :

        <div className="profile-post-feed">

          {

            posts.map((post:any)=>(

              <PostCard
                key={post._id}
                post={post}
              />

            ))

          }

        </div>

      }

    </section>

  )

}