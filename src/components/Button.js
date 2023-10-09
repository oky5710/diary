export default function Button({text, type = "default", onClick}) {
  return <button type={"button"} className={`button btn-${type}`} onClick={onClick}>{text}</button>
}