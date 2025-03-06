import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./todo.css";

function Todo() {
  let [todos, setTodos] = useState([
    { task: "Add Your Task", id: uuidv4(), isDone: false },
  ]);
  let [newTodo, setNewtodo] = useState("");

  let addNewTask = () => {
    if (newTodo.trim()) {
      console.log("task added");
      setTodos((prevTodos) => {
        return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }];
      });
      setNewtodo("");
    }
  };

  let updateTodoValue = (event) => {
    console.log(event.target.value);
    setNewtodo(event.target.value);
  };

  let handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addNewTask();
    }
  };

  let deleteTodo = (id) => {
    setTodos((prevTodos) => todos.filter((prevTodos) => prevTodos.id !== id));
  };

  let deleteAllTodo = () => {
    setTodos([]);
  };

  let upperCaseOne = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            task: todo.task.toUpperCase(),
          };
        } else {
          return todo;
        }
      })
    );
  };

  let markAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: true,
          };
        } else {
          return todo;
        }
      })
    );
  };

  let markAllDone = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({
        ...todo,
        isDone: true,
      }))
    );
  };

  return (
    <div>
      <h1 id="mainhead">Todo List</h1>
      <div>
        <input
          className="inp"
          type="text"
          placeholder="Add new Task"
          value={newTodo}
          onChange={updateTodoValue}
          onKeyPress={handleKeyPress}
        />
        <br />
        <br />
        <button onClick={addNewTask} disabled={!newTodo.trim()}>
          ➕ Add
        </button>
      </div>

      <hr />
      <h3 id="heading">ADDED LIST</h3>
      <hr />

      <ul>
        {todos.map((todo) => (
          <li className="list" key={todo.id}>
            <span className={todo.isDone ? "completed" : ""}>{todo.task}</span>
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
            <button onClick={() => upperCaseOne(todo.id)}>🔠</button>
            <button onClick={() => markAsDone(todo.id)}>✔️</button>
          </li>
        ))}
      </ul>

      <hr />
      <div className="buttonDiv">
        <button onClick={deleteAllTodo}>❌ Delete ALL</button>
        <button onClick={markAllDone}>✔️ Mark All Done</button>
      </div>
    </div>
  );
}

export default Todo;
