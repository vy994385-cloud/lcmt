import { useRef } from "react"
import { createPortal } from "react-dom"

import { sharePost } from "../../features/share/shareManager"
import PostShareCard from "../../features/share/PostShareCard"

interface Props {
  post: any
}

export default function ShareButton({ post }: Props) {

  const cardRef = useRef<HTMLDivElement>(null)

  async function handleShare() {
    await sharePost(
      post,
      cardRef.current || undefined
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={handleShare}
        className="share-button"
      >
        ↗ Share
      </button>

      {
        createPortal(

          <div
            style={{
              position: "fixed",
              left: "-10000px",
              top: "-10000px",
              pointerEvents: "none"
            }}
          >
            <div ref={cardRef}>
              <PostShareCard post={post} />
            </div>
          </div>,

          document.body

        )
      }

    </>
  )

}