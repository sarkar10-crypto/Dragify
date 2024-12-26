import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import logo from "../public/drag.png";

function App() {
  const TODO = "TODO";
  const DOING = "DOING";
  const DONE = "DONE";
  const [value, setvalue] = useState("");
  const [Task, setTask] = useState([]);
  const [Dragtask, setDragtask] = useState(null);
  const [UpdateItem, setUpdateItem] = useState(null);

  const handleChange = (e) => {
    setvalue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (UpdateItem) { // if we are updating a task
        const obj = {
          title: value,
          id: UpdateItem.id,
          status : UpdateItem.status
        }
        // ab purane wala task ko delete karke naya task implement karna hai
        const copyTask = [...Task];
        const filtered = copyTask.filter((item) => item.id !== UpdateItem.id)
        setTask((prevTasks) => [...filtered, obj]);
        setUpdateItem(null);

      } else {
        const obj = {
        title: value,
        status: TODO,
        id : Date.now(),
      }
      setTask((prevTasks) => [...prevTasks, obj]); //obj ka value array main add hote he input empty dekhna chaiye uske liye 
      }
      
      setvalue('');
    }
    
    
  }

  

  const handleDrag = (e, task) => {
    
    setDragtask(task);
  
  }

  const handleDragNDrop = (status) => {
    // task ko use karke data set drag and drop honge
    // lets copy the data in task first
    let copyTask = [...Task];
    copyTask = copyTask.map((item) => {
      if (Dragtask.id === item.id) {
        item.status = status;
      }
      return item;
    });
    setTask(copyTask);
    setDragtask(null)
  }
  
  const handleonDrop = (e) => {
    const status = e.target.getAttribute('data-status'); //data drop location provide kar rahe hai (.getAttribute se)
    if (status === TODO) {
      handleDragNDrop(TODO);
    }
    else if (status === DOING) {
      handleDragNDrop(DOING);
    }
    else if (status === DONE) {
      handleDragNDrop(DONE);
    }
  }

  
  const handleDragOver = (e) => {
  e.preventDefault();
  }

  const handleDelete = (item) => {
    let copyTask = [...Task];
    copyTask = copyTask.filter((task) => task.id !== item.id) // jis task pe click hua use chod kar baki sare filter hojayenge
    setTask(copyTask);
  }

  const handleUpdate = (task) => {
    // update state ko maintain karna hai yaha pe
    setUpdateItem(task);
    // ab tasks pure UpdateItem main store horaha hai , or ab title ka use kar ke input feild main display karenge
    setvalue(task.title);
  }
console.log("updated", UpdateItem);






  return (
    <>
      <div  className="main font-josefin bg-black min-h-screen flex flex-col p-4">
        {/* Logo */}
        <div className="logo  top-4">
          <img
            src={logo}
            className="w-20 h-16 sm:w-28 sm:h-20 cursor-pointer"
            alt="Logo not found"
          />
        </div>

        {/* Input Section */}
        <div className="App w-full flex justify-center mt-20">
          <label className="relative block w-full sm:w-3/4 lg:w-1/2">
            <input
              value={value}
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              
              className="placeholder:italic placeholder:text-slate-400 placeholder:font-merinda  block bg-gray-700 text-white w-full border border-slate-500 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 text-sm md:text-base lg:text-lg"
              placeholder="Add tasks"
              type="text"
            />
          </label>
        </div>

        {/* Task Sections */}
        <div className="board flex flex-wrap justify-center gap-3 mt-10 w-full cursor-pointer">
          {/* ToDo Section */}
          <div data-status={TODO} onDrop={handleonDrop} onDragOver={handleDragOver} className="todo w-full sm:w-1/3 md:w-1/4  flex flex-col items-center">
            <h1 className="bg-fav5 text-gray-900 p-3 w-40 text-center rounded-md font-fantasy tracking-wide text-sm sm:text-lg lg:text-2xl font-bold hover:opacity-80">
              ToDo
            </h1>
            {
              Task.length > 0 && Task.map((task) => (
              task.status === TODO &&  <div onDrag={(e)=>handleDrag(e,task)} draggable key={task.id} className="task-items gap-10 sm:w-40 md:w-40 lg:w-min bg-gray-800 text-white border border-gray-500 p-3 cursor-grab rounded-md flex justify-between mt-3 hover:bg-gray-700">
                  <span className="text-xs sm:text-sm md:text-base">{task.title}</span>
              <div className="btns flex gap-2 items-center">
                <span onClick={(e)=>handleUpdate(task)} className="btn bg-gray-600 p-1 rounded hover:bg-gray-500 text-sm cursor-pointer">
                  <CiEdit />
                </span>
                <span onClick={(e) => handleDelete(task)} className="btn bg-gray-600 p-1 rounded hover:bg-gray-500 text-sm cursor-pointer">
                  <RiDeleteBin5Line  />
                </span>
              </div>
                </div>
              )
              )
            }
          </div>

          {/* Doing Section */}
          <div data-status={DOING} onDrop={handleonDrop} onDragOver={handleDragOver} className="doing  w-full sm:w-1/3 md:w-1/4 flex flex-col items-center">
            <h1 className="bg-gray-700 text-fav4  w-40 text-center rounded-md p-3  font-fantasy tracking-wide text-sm sm:text-lg lg:text-2xl font-bold hover:opacity-80">
              Doing
            </h1>
            {
              Task.length && Task.map((task) => (
              task.status === DOING &&  <div onDrag={(e)=>handleDrag(e,task)} draggable key={task.id} className="task-items gap-10 sm:w-40 md:w-40 lg:w-min bg-gray-800 text-white border border-gray-500 p-3 cursor-grab rounded-md flex justify-between mt-3 hover:bg-gray-700">
                  <span className="text-xs sm:text-sm md:text-base">{task.title}</span>
              <div className="btns flex gap-2 items-center">
                <span onClick={(e)=>handleUpdate(task)} className="btn bg-gray-600 p-1 rounded hover:bg-gray-500 text-sm cursor-pointer">
                  <CiEdit />
                </span>
                <span onClick={(e) => handleDelete(task)}  className="btn bg-gray-600 p-1 rounded hover:bg-gray-500 text-sm cursor-pointer">
                  <RiDeleteBin5Line />
                </span>
              </div>
                </div>
              )
              )
            }
          </div>

          {/* Done Section */}
          <div data-status={DONE} onDrop={handleonDrop} onDragOver={handleDragOver} className="done w-full sm:w-1/3 md:w-1/4 h-[400px] flex flex-col items-center">
            <h1 className="bg-fav4 text-blue-900 p-3 w-40 text-center rounded-md font-fantasy tracking-wide text-sm sm:text-lg lg:text-2xl font-bold hover:opacity-80">
              Done
            </h1>
            {
              Task.length && Task.map((task) => (
              task.status === DONE &&  <div onDrag={(e)=>handleDrag(e,task)} draggable key={task.id} className="task-items gap-10 sm:w-40 md:w-40 lg:w-40 bg-gray-800 text-white border border-gray-500 p-3 cursor-grab rounded-md flex justify-between mt-3 hover:bg-gray-700">
                  <span className="text-xs sm:text-sm md:text-base">{task.title}</span>
              <div className="btns flex gap-2 items-center">
                <span onClick={(e)=>handleUpdate(task)} className="btn bg-gray-600 p-1 rounded hover:bg-gray-500 text-sm cursor-pointer">
                  <CiEdit />
                </span>
                <span onClick={(e) => handleDelete(task)} className="btn bg-gray-600 p-1 rounded hover:bg-gray-500 text-sm cursor-pointer">
                  <RiDeleteBin5Line  />
                </span>
              </div>
                </div>
              )
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
