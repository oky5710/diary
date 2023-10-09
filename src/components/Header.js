export default function Header({headText, leftChild, rightChild}) {

  return <header>
    <div className="head-left">{leftChild}</div>
    <h2>{headText}</h2>
    <div className="head-right">{rightChild}</div>
  </header>
}