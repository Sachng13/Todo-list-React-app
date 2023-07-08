import AddTodo from "./AddTodo";
import Todos from "./Todos";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [todos, setTodos] = useState([]);
  const [addTodoInput, setAddTodoInput] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);

  const fetchingTodos = () => {
    try {
      fetch("https://jsonplaceholder.typicode.com/todos?_limit=4")
        .then(response => {
          return response.json()
        })
        .then((data) => {
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
      completed:false,
      localId:Date.now().toString(),

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
          setTodos((prevState) => [ json,...prevState]);
          toast.success("Todo added succesfully");
        });
      setAddTodoInput("");
    } catch (error) {
      console.log(error);
      toast.error("Some error occured");
    }
  }

  const deleteTaskhandler = (e) => {
    try {
      fetch(`https://jsonplaceholder.typicode.com/todos/${e.target.id}`, {
      method: 'DELETE',
    });
    } catch (error) {
      toast.error("Some error occured")
    }
    if (e.target.id>100){
      console.log(e.target.id);
      const delArray = todos.filter((todo) => {
        return todo.localId != e.target.id;
      });
  
      setTodos(delArray);
      toast.success("Todo deleted succesfully");
      return ;
    }
    const delArray = todos.filter((todo) => {
      return todo.id != e.target.id;
    });

    setTodos(delArray);
    toast.success("Todo deleted succesfully");

  }

  const handlingToggleTask = (e) => {
    if (e.target.id>100){
      const ToggledArray = todos.map((item) => {
         if (item.localId == e.target.id) {
          item.completed = !item.completed;
          return item;
        }
        return item;
      })
      setTodos(ToggledArray);
      toast.success("Todo toggled succesfully");
      return;
    }
    const ToggledArray = todos.map((item) => {
      if (item.id == e.target.id) {
        item.completed = !item.completed;
        return item;
      }
      return item;
    })
    setTodos(ToggledArray);
    toast.success("Todo toggled succesfully");
  }

  const updateTaskHandler = () => {
    const updatedTask = {
      title: addTodoInput,
      completed: false
    };

    try {
      fetch(`https://jsonplaceholder.typicode.com/posts/${editTaskId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedTask),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          const updatedArray=todos.map((item)=>{
              if (item.id==editTaskId){
                item.title=json.title;
                item.completed=json.completed;
                return item;
              }
              return item;
          })
          setTodos(updatedArray);
          toast.success("Todo updated succesfully");
        });
      setAddTodoInput("");
      setEditTaskId(null);
    } catch (error) {
      console.log("error aa gya chacha " ,error);
      toast.error("Some error occured");
    }


  }

  const handleEditTask = (e) => {
    setEditTaskId(e.target.id);
    todos.forEach((item) => {
      if (item.id == e.target.id) {
        setAddTodoInput(item.title);
      }
    })
  }

  return (
    <div className="container">
      <ToastContainer />
      <div className="heading"><h1>Todo List App</h1></div>
      <AddTodo addTodoInput={addTodoInput}
        setAddTodoInput={setAddTodoInput}
        addTodoHandler={addTodoHandler}
        editTaskId={editTaskId}
        updateTaskHandler={updateTaskHandler}
      ></AddTodo>
      <Todos todos={todos}
        // editTaskId={editTaskId}
        deleteTaskhandler={deleteTaskhandler}
        handlingToggleTask={handlingToggleTask}
        handleEditTask={handleEditTask}
      ></Todos>
    </div>
  );
}



export default App;
