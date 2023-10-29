import {useNavigate} from "react-router-dom";
import Button from "./Button";
import {format} from "date-fns";
import React from "react";

function Diary({id: dId, emotion, date, content}) {
  const navigate = useNavigate();
  return <div className={"diary"}>
    <div className={"img-wrap"}>
      <img src={`/assets/emotion${emotion}.png`} alt={emotion}/>
    </div>
    <div className={"diary-cont"}>
      <p>{format(new Date(date), "yyyy년 M월 d일")}</p>
      <a href={`/view/${dId}`}>{content}</a>
    </div>
    <Button
      text={"수정하기"}
      onClick={() => {
        navigate(`/edit/${dId}`)
      }}/>
  </div>
}

export default React.memo(Diary);