import {useNavigate} from "react-router-dom";
import {DiaryDispatchContext} from "../App";
import Header from "./Header";
import Button from "./Button";
import EmotionItem from "./EmotionItem";
import {useContext, useEffect, useRef, useState} from "react";

export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
}
export const emotionList = [
  {
    id: 1,
    img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    descript: "완전 좋음"
  }, {
    id: 2,
    img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    descript: "좋음"
  }, {
    id: 3,
    img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    descript: "그럭저럭"
  }, {
    id: 4,
    img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    descript: "나쁨"
  }, {
    id: 5,
    img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    descript: "끔찍함"
  }
]
export default function Editor({isEdit = false, originData}) {
  const contentRef = useRef();
  const navigate = useNavigate();

  const [date, setDate] = useState(getStringDate(isEdit ? new Date(originData.date) : new Date()));
  const [emotion, setEmotion] = useState(isEdit ? originData.emotion : 3);
  const [content, setContent] = useState(isEdit ? originData.content : "");
  const {onCreate, onEdit} = useContext(DiaryDispatchContext);

  const handleClickEmotion = (emotion) => {
    setEmotion(emotion);
  }

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (window.confirm(isEdit ? "일기를 수정 하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")) {
      if (isEdit) {
        onEdit(originData.id, date, content, emotion)
      } else {
        onCreate(date, content, emotion);
      }
    }

    navigate("/", {replace: true})
  }
  useEffect(() => {
    if (isEdit) {
      setContent(originData.content);
      setEmotion(originData.emotion);
    }
  }, [isEdit, originData]);
  return <>
    <Header headText={isEdit ? "일기 수정하기" : "새 일기 쓰기"}
            leftChild={<Button text={"< 뒤로가기"} onClick={() => navigate(-1)}/>}></Header>
    <div className="content diary-editor">
      <section>
        <h4>오늘은 언제인가요?</h4>
        <div className={"input-box"}>
          <input type={"date"} className={"input-date"} onChange={e => setDate(e.target.value)} value={date}/>
        </div>
      </section>
      <section>
        <h4>오늘의 감정</h4>
        <div className={"emotion-btns"}>
          {emotionList.map(it =>
            <EmotionItem
              isSelected={emotion === it.id}
              onClick={handleClickEmotion}
              key={it.id} eid={it.id}
              img={it.img}
              descript={it.descript}/>)}
        </div>
      </section>
      <section>
        <h4>오늘의 일기</h4>
        <div className={"input-box"}>
          <textarea
            placeholder={"오늘은 어땠니요?"} ref={contentRef} value={content}
            onChange={e => setContent(e.target.value)}/>
        </div>
      </section>
      <section>
        <div className={"bottom-btn"}>
          <Button text={"취소하기"} onClick={() => navigate(-1)}/>
          <Button text={"작성하기"} onClick={handleSubmit} type={"positive"}/>
        </div>
      </section>
    </div>
  </>
}