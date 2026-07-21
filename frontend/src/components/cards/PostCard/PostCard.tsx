import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react"

import Card from "../../ui/Card/Card"
import Button from "../../ui/Button/Button"

import type { Post } from "../../../types/Post"

import "./PostCard.css"

interface Props {
  post: Post
}

function PostCard({ post }: Props) {
  return (
    <Card className="post-card">

      <div className="post-header">

        <div className="post-user">

          <img
            src={
              post.author.avatar ||
              post.author.image ||
              "https://i.pravatar.cc/150?img=12"
            }
            alt={post.author.name}
            className="post-avatar"
          />

          <div>

            <h3>{post.author.name}</h3>

            <span>
              {post.community.icon} {post.community.name}
            </span>

          </div>

        </div>

        <small>{post.createdAt}</small>

      </div>

      <p className="post-content">
        {post.content}
      </p>

      {post.image && (
        <img
          src={post.image}
          className="post-image"
          alt=""
        />
      )}

      <div className="post-tags">

        {post.tags.map(tag => (

          <span
            key={tag}
            className="post-tag"
          >
            #{tag}
          </span>

        ))}

      </div>

      <div className="post-actions">

        <Button variant="ghost">
          <Heart size={18}/>
          {post.likes}
        </Button>

        <Button variant="ghost">
          <MessageCircle size={18}/>
          {post.comments}
        </Button>

        <Button variant="ghost">
          <Share2 size={18}/>
          Share
        </Button>

        <Button variant="ghost">
          <Bookmark size={18}/>
        </Button>

      </div>

    </Card>
  )
}

export default PostCard