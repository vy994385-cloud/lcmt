import "./MessageActions.css"

interface Props {

  mine: boolean

  onCopy: () => void

  onReply: () => void

  onStar: () => void

  onEdit?: () => void

  onDeleteMe: () => void

  onDeleteEveryone?: () => void

}

export default function MessageActions({

  mine,

  onCopy,

  onReply,

  onStar,

  onEdit,

  onDeleteMe,

  onDeleteEveryone

}: Props) {

  return (

    <div className="message-actions">

      <button onClick={onReply}>
        ↩️ Reply
      </button>

      <button onClick={onCopy}>
        📋 Copy
      </button>

      <button onClick={onStar}>
        ⭐ Star
      </button>

      {

        mine && onEdit &&

        <button onClick={onEdit}>
          ✏️ Edit
        </button>

      }

      <button onClick={onDeleteMe}>
        🗑 Delete for me
      </button>

      {

        mine && onDeleteEveryone &&

        <button
          className="danger"
          onClick={onDeleteEveryone}
        >
          ❌ Delete for everyone
        </button>

      }

    </div>

  )

}