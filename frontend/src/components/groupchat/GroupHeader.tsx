import "./../../pages/GroupChat/GroupChat.css"

type Props = {
  name: string
  members: number
  image?: string
  onInfo: () => void
  onMembers: () => void
}

export default function GroupHeader({
  name,
  members,
  image,
  onInfo,
  onMembers,
}: Props) {
  return (
    <header className="group-header">

      <div className="group-header-left">

        <img
          src={
            image ||
            "https://placehold.co/80x80?text=Group"
          }
          alt={name}
          className="group-avatar"
        />

        <div>

          <h2>{name}</h2>

          <p>{members} members</p>

        </div>

      </div>

      <div className="group-header-actions">

        <button onClick={onMembers}>
          👥
        </button>

        <button onClick={onInfo}>
          ℹ️
        </button>

      </div>

    </header>
  )
}