import "./ReactionPicker.css"

const EMOJIS = [
  "👍",
  "❤️",
  "😂",
  "🔥",
  "👏",
  "😍",
  "😮",
  "😢",
  "😡",
  "🙏",
  "🎉",
  "💯",
]

type Props = {
  open: boolean
  onSelect: (emoji: string) => void
}

function ReactionPicker({
  open,
  onSelect,
}: Props) {

  if (!open) return null

  return (
    <div className="reaction-picker">

      {EMOJIS.map((emoji) => (

        <button
          key={emoji}
          className="reaction-emoji"
          onClick={() => onSelect(emoji)}
        >
          {emoji}
        </button>

      ))}

    </div>
  )
}

export default ReactionPicker