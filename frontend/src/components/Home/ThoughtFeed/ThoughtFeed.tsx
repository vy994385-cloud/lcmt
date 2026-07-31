import FeedTabs from "../../feed/FeedTabs";
import PostCard from "../../cards/PostCard/PostCard";
import "./ThoughtFeed.css";

interface Props {
  loading: boolean;
  feed: string;
  setFeed: (value: string) => void;
  posts: any[];
}

export default function ThoughtFeed({
  loading,
  feed,
  setFeed,
  posts,
}: Props) {
  const filteredPosts = posts.filter((post: any) => {
    switch (feed) {
      case "Trending":
        return (post.likes?.length || post.likes || 0) > 5;

      case "Following":
        return post.following === true;

      case "Communities":
        return !!post.community;

      default:
        return true;
    }
  });

  return (
    <section className="home-section">
      <div className="feed-header">
        <div>
          <h2>📰 Community Feed</h2>
          <p>Discover discussions, ideas and updates from your network.</p>
        </div>
      </div>

      <FeedTabs active={feed} setActive={setFeed} />

      <div className="thought-feed">
        {loading ? (
          <div className="feed-state">
            <h3>Loading feed...</h3>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="feed-state">
            <h3>No posts yet</h3>
            <p>Be the first person to share something with your community.</p>
          </div>
        ) : (
          filteredPosts.map((post: any) => (
            <PostCard
  key={post._id || post.id}
  post={{
    ...post,
    author:
      typeof post.author === "object"
        ? post.author?.name
        : post.author,
    community:
      typeof post.community === "object"
        ? post.community?.name
        : post.community
  }}
/>
          ))
        )}
      </div>
    </section>
  );
}