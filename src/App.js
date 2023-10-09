import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import {createContext, useReducer, useRef} from "react";
import New from "./components/New";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE":
      return [action.data, ...state];
    case "REMOVE":
      return state.filter((it) => it.id !== action.targetId)
    case "EDIT":
      return state.map((it) => it.id === action.data.id ? {...action.data} : it)
    default:
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();
const dummyData = [{
  id: 1,
  emotion: 1,
  content: "오늘의 일기 1",
  date: 1696813093053
}, {
  id: 2,
  emotion: 2,
  content: "오늘의 일기 2",
  date: 1696813083053
}, {
  id: 3,
  emotion: 3,
  content: "오늘의 일기 3",
  date: 1696813073053
}, {
  id: 4,
  emotion: 4,
  content: "오늘의 일기 4",
  date: 1696813063053
}, {
  id: 5,
  emotion: 5,
  content: "오늘의 일기 5",
  date: 1696813053053
}]

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);
  const dataId = useRef();
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
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
