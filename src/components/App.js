import AddTodo from "./AddTodo";
import Todos from "./Todos";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [todos, setTodos] = useState([]);
  const [addTodoInput, setAddTodoInput] = useState("");

  const fetchingTodos = () => {
    try {
      fetch("https://jsonplaceholder.typicode.com/todos?_limit=4")
        .then(response => {
          return response.json()
        })
        .then(data => {
          setTodos(data)
        })
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    fetchingTodos()
  }, []);

  const addTodoHandler = () => {

    const newTodo = {
      title: addTodoInput,
      completed: false,
    }
    try {
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setTodos((prevState) => [...prevState, json]);
          toast.success("Todo added succesfully");
        });
      setAddTodoInput("");
    } catch (error) {
      console.log(error);
      toast.error("Some error occured");
    }
  }

  const deleteTaskhandler = (e) => {
    fetch('https://jsonplaceholder.typicode.com/todos/${e.target.value}', {
      method: 'DELETE',
    });
    const delArray = todos.filter((todo) => {
      return todo.id != e.target.id;
    });

    setTodos(delArray);
    toast.success("Todo deleted succesfully");

  }

  const handlingToggleTask=(e)=>{
    console.log(todos);
     const ToggledArray =todos.map((item)=>{
      if (item.id==e.target.id){
         item.completed=! item.completed;
         return item;
      }
      return item;
     })
     setTodos(ToggledArray);
     toast.success("Todo toggled succesfully");
  }

  return (
    <div className="container">
      <ToastContainer />
      <div><h1>Todo List App</h1></div>
      <AddTodo addTodoInput={addTodoInput} setAddTodoInput={setAddTodoInput} addTodoHandler={addTodoHandler}></AddTodo>
      <Todos todos={todos} 
      deleteTaskhandler={deleteTaskhandler} 
      handlingToggleTask={handlingToggleTask}></Todos>
    </div>
  );
}



export default App;
