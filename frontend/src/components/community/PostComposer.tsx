import { useState } from "react"
import api from "../../api/axios"
import toast from "react-hot-toast"

import {
  Image,
  Video,
  Mic,
  BarChart3,
  Send
} from "lucide-react"

interface Props {
  user: any
  communityId: string
  loading: boolean
  setLoading: (value: boolean) => void
  onPostCreated: () => void
}

export default function PostComposer({
  user,
  communityId,
  loading,
  setLoading,
  onPostCreated
}: Props) {

  const [content, setContent] = useState("")

  async function createPost() {

    if (!content.trim()) return

    try {

      setLoading(true)

      await api.post(
        `/communities/${communityId}/posts`,
        {
          content,
          userId: user._id
        }
      )

      setContent("")
      toast.success("Post published 🎉")
      onPostCreated()

    } catch {

      toast.error("Unable to publish your post.")

    } finally {

      setLoading(false)

    }

  }

  return (

    <section className="feed-header">

      <div className="composer-top">

        <img
          src={user.image || "https://picsum.photos/60"}
          alt="Profile"
          className="composer-avatar"
        />

        <div className="composer-input">

          <h3>
            What's on your mind, {user.name || "Student"}?
          </h3>

          <textarea
            placeholder="Share something with your community..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

        </div>

      </div>

      <div className="composer-actions">

        <div className="composer-icons">

          <button type="button"><Image size={18}/> Photo</button>

          <button type="button"><Video size={18}/> Video</button>

          <button type="button"><Mic size={18}/> Voice</button>

          <button type="button"><BarChart3 size={18}/> Poll</button>

        </div>

        <button
          className="post-btn"
          onClick={createPost}
          disabled={loading}
        >

          <Send size={18}/>

          {loading ? "Posting..." : "Post"}

        </button>

      </div>

    </section>

  )

}