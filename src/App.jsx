import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import { v4 as uuidv4 } from "uuid";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState(""); //input text
  const [todos, setTodos] = useState([]); // hold all the arrays
  const [showFinished, setshowFinished] = useState(true);

  const savels = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  // to mange the click buttons
  const handleedit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos);
    savels();
  };

  const handledelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    savels();
  };

  const handleadd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    savels();
  };

  const handlechange = (e) => {
    setTodo(e.target.value);
  };

  const handlecheckbox = (e) => {
    let id = e.target.name;

    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto  bg-violet-100 my-5 p-5 rounded-xl min-h-[80vh]">
        <div className="addtodo my-5">
          <h2 className="text-xl font-bold">add todo</h2>

          <input
            onChange={handlechange}
            value={todo}
            type="text"
            className="w-1/2"
          />
          <button
            onClick={handleadd}
            disabled={todo.length <= 4}
            className="bg-purple-800 px-4  disabled:bg-purple-500 text-white hover:bg-purple-950 mx-3 rounded-sm"
          >
            Add
          </button>
        </div>
        <input
          // className="my-4"
          // id="show"
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />
        show finished
        <h2 className="text-xl font-bold">Your todo</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div key={item.id} className="flex justify-between w-3/4 my-2">
                  <div className="flex gap-5">
                    <input
                      name={item.id}
                      onChange={handlecheckbox}
                      type="checkbox"
                      value={item.isCompleted}
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => {
                        handledelete(e, item.id);
                      }}
                      className="bg-purple-800 px-4  text-white hover:bg-purple-950 mx-2 rounded-sm"
                    >
                    <MdDeleteOutline />
                    </button>
                    <button
                      onClick={(e) => {
                        handleedit(e, item.id);
                      }}
                      className="bg-purple-800 px-4  text-white hover:bg-purple-950 mx-2 rounded-sm"
                    >
                      <CiEdit />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
