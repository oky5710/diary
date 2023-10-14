import Button from "../components/Button";
import Header from "../components/Header";
import {useContext, useEffect, useMemo, useState} from "react";
import {DiaryStateContext} from "../App";
import Select from "../components/Select";
import {useNavigate} from "react-router-dom";
import Diary from "../components/Diary";

export default function Home() {
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
        <Select
          value={sort}
          options={[{
            value: "desc",
            name: "최신순"
          }, {
            value: "asc",
            name: "일자순"
          }]}
          onChange={(s) => {
            setSort(s);
            const copy = JSON.parse(JSON.stringify(currentData));
            copy.sort((a, b) => {
              if (a.date > b.date) {
                return (s === "asc") ? 1 : -1;
              }
              if (a.date < b.date) {
                return (s === "asc") ? -1 : 1;
              }
              return 0
            })
            setCurrentData(copy)
          }}
        />
        <Select
          value={emotion}
          options={[{
            value: "all",
            name: "전부 다"
          }, {
            value: "good",
            name: "좋은 것만"
          }, {
            value: "bad",
            name: "나쁜 것만"
          }]}
          onChange={(s) => {
            setEmotion(s);
          }}
        />
        <Button
          text={"새 일기 추가"}
          type={"positive"}
          onClick={() => {
            navigate("/new")
          }}/>
      </div>
      {currentData.filter(it => emotion === "all" || (emotion === "good" && it.emotion >= 3) || (emotion === "bad" && it.emotion < 3)).map((it) =>
        <Diary key={it.id} {...it} />)}
    </div>
  </>
}