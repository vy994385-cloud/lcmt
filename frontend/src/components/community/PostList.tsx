import PostCard from "./PostCard"

interface Props {
  posts: any[]
}

export default function PostList({
  posts
}: Props) {

  if (!posts.length) {
    return (
      <p>
        No posts yet. Start the conversation!
      </p>
    )
  }

  return (
    <section className="posts">
      {posts.map((post: any) => (
        <PostCard
          key={post.id || post._id}
          post={post}
        />
      ))}
    </section>
  )

}