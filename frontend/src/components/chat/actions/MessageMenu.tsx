import "./MessageMenu.css"

type Props = {
  open: boolean

  isMine: boolean

  onReact: () => void
  onReply: () => void
  onForward: () => void
  onCopy: () => void
  onStar: () => void
  onEdit: () => void
  onDelete: () => void
  onDownload?: () => void
  onPin?: () => void
}

function MessageMenu({
  open,
  isMine,
  onReact,
  onReply,
  onForward,
  onCopy,
  onStar,
  onEdit,
  onDelete,
  onDownload,
  onPin,
}: Props) {

  if (!open) return null

  return (

    <div className="message-menu">

      <button onClick={onReact}>😀 React</button>

      <button onClick={onReply}>↩ Reply</button>

      <button onClick={onForward}>📤 Forward</button>

      <button onClick={onCopy}>📋 Copy</button>

      <button onClick={onStar}>⭐ Star</button>

      {onDownload && (
        <button onClick={onDownload}>
          📥 Download
        </button>
      )}

      {onPin && (
        <button onClick={onPin}>
          📌 Pin
        </button>
      )}

      {isMine && (
        <>
          <button onClick={onEdit}>
            ✏ Edit
          </button>

          <button
            className="danger"
            onClick={onDelete}
          >
            🗑 Delete
          </button>
        </>
      )}

    </div>

  )

}

export default MessageMenu