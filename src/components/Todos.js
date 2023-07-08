import TodoItem from "./TodoItem";
function Todos(props) {
    return (
       
        <div className="todos-container">
               {props.todos.map((item)=>{
                 return <TodoItem item={item} 
                 deleteTaskhandler={props.deleteTaskhandler}
                 handlingToggleTask={props.handlingToggleTask}/>
               })}
               
            
        </div>
      
    );
  }
  
  export default Todos;
  