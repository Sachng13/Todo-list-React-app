import AddTodo from "./AddTodo";  // importing add todo component;
import Todos from "./Todos";     // importing todos component;
import { useState } from "react";  // importing state;
import { useEffect } from "react";   // importing useEffect
import { ToastContainer, toast } from 'react-toastify';  // importing react toastify for notifications;
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [todos, setTodos] = useState([]);   // A array for todos.
  const [addTodoInput, setAddTodoInput] = useState("");   //State for the todo input box
  const [editTaskId, setEditTaskId] = useState(null);  // state used when editing the task

  const fetchingTodos = () => {
    // fecthing limited todos initially;
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
  // use effect for the initial fetching,
  useEffect(() => {
    fetchingTodos()
  }, []);

  // function used when adding the todo ;
  const addTodoHandler = () => {
    // checking if the input box empty;
    if (addTodoInput == "") {
      return
    }

    const newTodo = {
      title: addTodoInput,
      completed: false,
      localId: Date.now().toString(),  // used for deleting and toggling and editing of todos which we will add. 
    }
    try {
      //dummy call to server;
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setTodos((prevState) => [json, ...prevState]);
          toast.success("Todo added succesfully");
        });
      setAddTodoInput("");
    } catch (error) {
      console.log(error);
      toast.error("Some error occured");
    }
  }
  // function used to delete the todo ;
  const deleteTaskhandler = (e) => {
    try {
      //dummy call to server
      fetch(`https://jsonplaceholder.typicode.com/todos/${e.target.id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      toast.error("Some error occured")
    }
    // checking is the todo is of server or we have added ;
    if (e.target.id > 100) {
      // in this we delete the todos which we have added .
      const delArray = todos.filter((todo) => {
        return todo.localId != e.target.id;
      });

      setTodos(delArray);
      toast.success("Todo deleted succesfully");
      return;
    }
    // else in this we delete the todos which are from the server;
    const delArray = todos.filter((todo) => {
      return todo.id != e.target.id;
    });

    setTodos(delArray);
    toast.success("Todo deleted succesfully");

  }
  // function used to toggle the todo ;
  const handlingToggleTask = (e) => {
    // checking is the todo is of server or we have added ;
    if (e.target.id > 100) {
      // in this we toggle the todos which we have added .
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
    // else in this we delete the todos which are from the server;
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
  // function used to edit the task 
  const updateTaskHandler = () => {
    // checking if the input box empty;
    if (addTodoInput == "") {
      return;
    }
    // checking is the todo is of server or we have added ;
    if (editTaskId > 100) {
      // in this we update the todos which we have added .
      const updatedArray = todos.map((item) => {
        if (item.localId == editTaskId) {
          item.title = addTodoInput;
          item.completed = false;
          console.log(item);
          return item;
        }
        return item;
      })
      setTodos(updatedArray);
      toast.success("Todo updated succesfully");
      setAddTodoInput("");
      setEditTaskId(null);
      return
    }

    // else in this we update the todos which are from the server;
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
          const updatedArray = todos.map((item) => {
            if (item.id == editTaskId) {
              item.title = json.title;
              item.completed = json.completed;
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
      toast.error("Some error occured");
    }


  }

  const handleEditTask = (e) => {
    // checking is the todo is of server or we have added ;
    if (e.target.id > 100) {
      // in this we handle  the todos which we have added .
      setEditTaskId(e.target.id);
      todos.forEach((item) => {
        if (item.localId == e.target.id) {
          setAddTodoInput(item.title);
        }
      })
      return;
    }
    // else in this we handle the todos which are from the server;
    setEditTaskId(e.target.id);
    todos.forEach((item) => {
      if (item.id == e.target.id) {
        setAddTodoInput(item.title);
      }
    })
  }


  // our main part;
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
