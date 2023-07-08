
function AddTodo(props) {

    function handleInputchange(e) {
        props.setAddTodoInput(e.target.value);
    }

    return (
        <div className="Add-todo-form">
            <input type="text" className="Add-todo-input-box" 
            value={props.addTodoInput} onChange={handleInputchange} placeholder="Add todo"></input>
            <button type="submit" className="Add-todo-add-btn" 
            onClick={props.editTaskId ? props.updateTaskHandler:props.addTodoHandler}>{props.editTaskId ? "Update Task":"Add Task"}</button>
        </div>

    );
}

export default AddTodo;
