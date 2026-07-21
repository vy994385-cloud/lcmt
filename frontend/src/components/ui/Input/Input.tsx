import "./Input.css"

interface InputProps{

  value?: string

  placeholder?: string

  type?: string

  className?: string

  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void

  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => void

  disabled?: boolean

}

function Input({

  value,

  placeholder,

  type="text",

  className = "",

  onChange,

  onKeyDown,

  disabled=false

}:InputProps){

  return(

    <input

      className={`input-ui ${className}`}

      value={value}

      placeholder={placeholder}

      type={type}

      onChange={onChange}

      onKeyDown={onKeyDown}

      disabled={disabled}

    />

  )

}

export default Input