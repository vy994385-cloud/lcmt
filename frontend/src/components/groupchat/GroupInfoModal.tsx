type Props = {
  open: boolean

  name: string

  description: string

  onClose: () => void
}

export default function GroupInfoModal({
  open,
  name,
  description,
  onClose,
}: Props) {

  if (!open) return null

  return (
    <div className="modal-overlay">

      <div className="group-info-modal">

        <h2>{name}</h2>

        <p>{description}</p>

        <button onClick={onClose}>
          Close
        </button>

      </div>

    </div>
  )
}