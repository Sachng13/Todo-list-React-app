import TodoItem from "./TodoItem";
function Todos(props) {


  // todos container............
    return (
       
        <div className="todos-container">
               {props.todos.map((item)=>{
                 return <TodoItem item={item} 
                 key={item.id == 101 ? item.localId:item.id}
                 deleteTaskhandler={props.deleteTaskhandler}
                 handlingToggleTask={props.handlingToggleTask}
                 handleEditTask={props.handleEditTask}
                 />
               })}
               
            
        </div>
      
    );
  }
  
  export default Todos;
  