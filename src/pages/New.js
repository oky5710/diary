import Button from "../components/Button";
import Header from "../components/Header";

export default function New() {
  return <>
    <Header headText={"새 일기 쓰기"} leftChild={<Button text={"< 뒤로가기"}/>}></Header>
  </>
}