
function TodoItem(props) {
  // a todo item structure ;
  return (

    <div className="todo-item-container">
      <div>
        <input type="checkbox" name="checkbox"
          className="todo-item-checkbox"
          checked={props.item.completed}
          id={props.item.id == 101 ? props.item.localId : props.item.id}
          onChange={props.handlingToggleTask}></input>
        <label htmlFor="checkbox">{props.item.title}</label>
      </div>
      <div>
        <img src="https://cdn-icons-png.flaticon.com/128/10336/10336114.png"
          className="edit-icon" onClick={props.handleEditTask}
          id={props.item.id == 101 ? props.item.localId : props.item.id}></img>
        <img src="https://cdn-icons-png.flaticon.com/128/2763/2763138.png"
          className="delete-icon" onClick={props.deleteTaskhandler}
          id={props.item.id == 101 ? props.item.localId : props.item.id}></img>
      </div>

    </div>
  );
}

export default TodoItem;
