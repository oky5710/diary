export default function EmotionItem({img, descript, onClick, eid, isSelected}) {
  // 강의에서는 div 요소로 작성했지만 기능상 버튼이 맞음. 탭을 이용하는 사용자에게도 적합
  return <button
    type={"button"}
    onClick={() => onClick(eid)}
    className={isSelected ? `emotion-btn-${eid}` : "btn-off"}>
    <img src={img} alt={descript}/>
    <span>{descript}</span>
  </button>
}