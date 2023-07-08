
function TodoItem(props) {
    return (
     
      <div className="todo-item-container">
        <div>
        <input type="checkbox" name="checkbox" 
        className="todo-item-checkbox" 
        checked={props.item.completed} 
        id={props.item.id}
        onChange={props.handlingToggleTask}></input>
        <label htmlFor="checkbox">{props.item.title}</label>
        </div>
       
        <img src="https://cdn-icons-png.flaticon.com/128/2763/2763138.png" 
        className="delete-icon" onClick={props.deleteTaskhandler}
        id={props.item.id}></img>
      </div>
    );
  }
  
  export default TodoItem;
  