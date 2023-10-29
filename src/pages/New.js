import Editor from "../components/Editor";
import {useEffect} from "react";

export default function New() {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 새 일기 쓰기`;
  }, []);
  return <Editor/>
}