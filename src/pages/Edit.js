import Editor from "../components/Editor";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {DiaryStateContext} from "../App";

export default function Edit() {
  const navigate = useNavigate();
  const {id} = useParams();
  const diaryList = useContext(DiaryStateContext);
  const [originData, setOriginData] = useState();
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(it => Number(it.id) === Number(id));
      if (targetDiary) {
        setOriginData(targetDiary)
      } else {
        navigate("/", {replace: true});
      }
    }
  }, [diaryList, id]);
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
  }, []);
  return <>{originData && <Editor isEdit={true} originData={originData}/>}</>
}