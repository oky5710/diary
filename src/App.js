import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import React, {createContext, useEffect, useReducer, useRef} from "react";
import New from "./pages/New";
import Edit from "./pages/Edit";
import View from "./pages/View";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT":
      newState = action.data;
      break;
    case "CREATE":
      newState = [action.data, ...state];
      break;
    case "REMOVE":
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    case "EDIT":
      newState = state.map((it) => it.id === action.data.id ? {...action.data} : it);
      break;
    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  // 왜 useRef를 사용할까?
  const dataId = useRef(0);
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("diary"));
    // local data가 빈배열[] 일때 에러가 나서 조건 추가함.
    if (localData && localData.length) {
      // sort 숫자 정렬 시 유의사항
      const diaryList = localData.sort((a, b) => Number(b.id) - Number(a.id));
      dataId.current = Number(diaryList[0].id) + 1;
      dispatch({type: "INIT", data: diaryList});
    }
  }, []);
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    })
    dataId.current += 1;
  }
  const onRemove = (targetId) => {
    dispatch({type: "REMOVE", targetId})
  }
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT", data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    })
  }
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{
        onCreate,
        onEdit,
        onRemove
      }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path={"/"} element={<Home/>}></Route>
              <Route path={"/new"} element={<New/>}></Route>
              <Route path={"/edit/:id"} element={<Edit/>}></Route>
              <Route path={"/view/:id"} element={<View/>}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
