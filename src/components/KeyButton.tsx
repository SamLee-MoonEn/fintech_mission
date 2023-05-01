interface Props {
  onClick: any
  value: number
}

export default function KeyButton({ onClick, value }: Props) {
  return (
    <button
      onClick={onClick}
      className="btn btn-outline m-1"
      data-value={value}
    >
      {value}
    </button>
  )
}
