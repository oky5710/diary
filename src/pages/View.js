import {useNavigate, useParams} from "react-router-dom";
import Header from "../components/Header";
import {DiaryStateContext} from "../App";
import {useContext, useEffect, useState} from "react";
import {emotionList, getStringDate} from "../components/Editor";
import Button from "../components/Button";

export default function View() {
  const navigate = useNavigate();
  const {id} = useParams();
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState();
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(it => Number(it.id) === Number(id));
      if (targetDiary) {
        setData(targetDiary)
      } else {
        alert("없는 일기입니다.")
        navigate("/", {replace: true});
      }
    }
  }, [diaryList, id]);
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
  }, []);
  if (!data) {
    return <div className={"content"}>로딩중 입니다.</div>
  }

  const currentEmotion = emotionList.find(it => Number(it.id) === Number(data.emotion))

  return <>
    <Header
      headText={`${getStringDate(new Date(data.date))} 기록`}
      leftChild={<Button text={"< 뒤로가기"} onClick={() => navigate(-1)}/>}
      rightChild={<Button text={"수정"} onClick={() => {
        navigate(`/edit/${data.id}`);
      }}/>}
    />
    <div className={"content view"}>
      <section>
        <h4>오늘의 감정</h4>
        <div className={`emotion-${currentEmotion.id} emotion-square`}>
          <img src={currentEmotion.img} alt=""/>
          <span>{currentEmotion.descript}</span>
        </div>
      </section>
      <section>
        <h4>오늘의 일기</h4>
        <div className={"content-view"}>
          {data.content}
        </div>
      </section>
    </div>
  </>
}