import Button from "../components/Button";
import Header from "../components/Header";
import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {DiaryStateContext} from "../App";
import {useNavigate} from "react-router-dom";
import Diary from "../components/Diary";
import ControlMenu from "../components/ControlMenu";

const sortList = [{
  value: "desc",
  name: "최신순"
}, {
  value: "asc",
  name: "일자순"
}];
const emotionList = [{
  value: "all",
  name: "전부 다"
}, {
  value: "good",
  name: "좋은 것만"
}, {
  value: "bad",
  name: "나쁜 것만"
}];
export default function Home() {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장`;
  }, []);
  const diaryList = useContext(DiaryStateContext);
  const [current, setCurrent] = useState(new Date());
  const [currentData, setCurrentData] = useState([]);
  const [sort, setSort] = useState("desc");
  const [emotion, setEmotion] = useState("all");
  const changeCurrent = (direction) => {
    const newDate = new Date(current.getTime());
    if (direction === "prev") {
      newDate.setMonth(current.getMonth() - 1);
    } else {
      newDate.setMonth(current.getMonth() + 1);
    }
    setCurrent(newDate)
  }
  const headText = useMemo(() => `${current.getFullYear()}년 ${current.getMonth() + 1}월`, [current]);
  useEffect(() => {
    const start = new Date(current.getFullYear(), current.getMonth(), 1, 0, 0, 0).getTime();
    const end = new Date(current.getFullYear(), current.getMonth() + 1, 0, 23, 59, 59).getTime();
    setCurrentData(diaryList.filter(it => it.date >= start && it.date <= end));
  }, [current, diaryList]);
  const navigate = useNavigate();
  const handleChangeSort = useCallback((s) => {
    setSort(s);
    setCurrentData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      return copy.sort((a, b) => {
        if (a.date > b.date) {
          return (s === "asc") ? 1 : -1;
        }
        if (a.date < b.date) {
          return (s === "asc") ? -1 : 1;
        }
        return 0
      })
    });
  }, []);
  const handleChangeEmotion = useCallback((s) => {
    setEmotion(s);
  }, [])
  return <>
    <Header
      headText={headText}
      leftChild={<Button text={"<"} onClick={() => {
        changeCurrent("prev")
      }}/>}
      rightChild={<Button text={">"} onClick={() => {
        changeCurrent("next")
      }}/>}
    />
    <div className="content">
      <div className={"list-filter"}>
        <ControlMenu
          value={sort}
          optionList={sortList}
          onChange={handleChangeSort}
        />

        <ControlMenu
          value={emotion}
          optionList={emotionList}
          onChange={handleChangeEmotion}
        />
        <Button
          text={"새 일기 추가"}
          type={"positive"}
          onClick={() => {
            navigate("/new")
          }}/>
      </div>
      {currentData && currentData.filter(it => emotion === "all" || (emotion === "good" && it.emotion <= 3) || (emotion === "bad" && it.emotion > 3)).map((it) =>
        <Diary key={it.id} {...it} />)}
    </div>
  </>
}