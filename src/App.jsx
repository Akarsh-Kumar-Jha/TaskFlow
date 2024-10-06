import { useState } from "react";
import { CiSquareRemove } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";

export default function App() {
  const [todos, SetTodos] = useState([]);
  const [text, SetText] = useState("");
  const [filterChoice, SetFilter] = useState("All");
  const [editIndex, SeteditIndex] = useState(null);
  function handleChange(event) {
    console.log(event.target.value);
    SetText(event.target.value);
  }
  function handleSubmit() {
    if (text.trim()) {
      if (editIndex !== null) {
        SetTodos((prev) => {
          return prev.map((todo, ind) =>
            ind == editIndex ? { ...todo, text: text.trim() } : todo
          );
        });
        SeteditIndex(null);
      } else {
        SetTodos((prev) => {
          const temp = { text: text.trim(), isCompleted: false };
          return [...prev, temp];
        });
      }
      SetText("");
    }
  }
  function handleComplete(index) {
    SetTodos((prev) => {
      return prev.map((todo, ind) => {
        return index == ind
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo;
      });
    });
  }
  function handleFilter(txt) {
    SetFilter(txt);
  }
  function handleRemove(index) {
    SetTodos(todos.filter((_, ind) => ind != index));
  }
  function handleEdit(index) {
    SetText(todos[index].text);
    SeteditIndex(index);
  }
  const filteredItems = todos.filter((item) => {
    if (filterChoice == "Completed") {
      return item.isCompleted === true;
    }
    if (filterChoice == "Incompleted") {
      return item.isCompleted === false;
    }
    return true;
  });
  return (
    <div className="App bg-[#2D3250] min-h-[100vh] w-[100vw] overflow-hidden">
      <header className="text-4xl md:text-5xl text-center text-zinc-300 font-semibold">TaskFlow</header>
      <div className="inputDiv  mx-auto flex items-center gap-4 mt-[5vh] w-[90vw] md:w-[350px] md:mt-8">
        <input
        className="px-2 py-1 md:px-3 md:py-2 rounded-lg outline-none bg-[#1B262C] text-zinc-500"
          value={text}
          onChange={handleChange}
          type="text"
          placeholder="Write Your Task..."
        />
        <button className="px-3 py-1 md:px-3 md:py-2 text-white bg-sky-400 rounded-lg"
          style={{
            // display: text ? "flex" : "none",
            cursor: text.trim() ? "pointer" : "not-allowed",
          }}
          onClick={handleSubmit}
        >
          Add Todo
        </button>
      </div>
      <div className="todolist mt-[5vh] relative">

        <div className="filters flex justify-between items-center w-[90vw] mx-auto">
          {["All", "Completed", "Incompleted"].map((item, index) => (
            <button
            className="px-2 py-1  md:px-3 md:py-2 rounded-md bg-zinc-400 text-white"
              style={{
                border: filterChoice == item ? "2px solid #E7F6F2" : "",
              }}
              key={index}
              onClick={() => handleFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2">
        {filteredItems && filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            return (
          <div className="w-full mt-5"> 
                <div
                key={index}
                style={{
                  border: item.isCompleted
                    ? "2px solid green"
                    : "2px solid yellow",
                }}
                className="listItem rounded-lg p-4 text-white bg-[#363062] h-[30vh] md:min-h-[300px] text-center font-semibold relative"
              >
                <h1 className="font-bold text-[4vw] md:text-[25px] text-wrap">{item.text}</h1>
                <button className="px-2 text-sm py-1 rounded-lg bg-green-300 mt-5 mb-5" onClick={() => handleComplete(index)}>
                  {item.isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
                </button>
            <div className="absolute bottom-2 md:bottom-1 left-[50%] -translate-x-[50%] flex justify-center items-center gap-5">
            <CiEdit className="text-3xl text-zinc-400 cursor-pointer" onClick={() => handleEdit(index)} />
            <CiSquareRemove className="text-4xl text-red-400 cursor-pointer" onClick={() => handleRemove(index)} />
            </div>
              </div>
          </div>
            );
          })
        ) : (
          <p className="text-center text-red-500 text-4xl md:text-5xl mt-5 w-[90vw]">No Todos</p>
        )}
        </div>
    
        {filteredItems.length > 0 ? (
          <button className="absolute left-[50%] -translate-x-[50%] bg-red-500 px-3 py-1 text-white rounded-lg mt-5 hover:bg-red-600" onClick={() => SetTodos([])}> Clear All</button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
