import "./Chip.css"

interface ChipProps {
  label: string
  onClick?: () => void
  active?: boolean
}

function Chip({
  label,
  onClick,
  active = false,
}: ChipProps) {
  return (
    <button
      className={`chip-ui ${active ? "active" : ""}`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  )
}

export default Chip