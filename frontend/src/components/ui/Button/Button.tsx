import "./Button.css"

interface ButtonProps {

  children: React.ReactNode

  className?: string

  onClick?: () => void

  type?:
    | "button"
    | "submit"
    | "reset"

  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "danger"
    | "ghost"

  disabled?: boolean

}

function Button({

  children,

  className = "",

  onClick,

  type = "button",

  variant = "primary",

  disabled = false

}: ButtonProps){

  return(

    <button

      className={`btn ${variant} ${className}`}

      type={type}

      onClick={onClick}

      disabled={disabled}

    >

      {children}

    </button>

  )

}

export default Button