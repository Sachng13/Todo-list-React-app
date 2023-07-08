
function AddTodo(props) {

    function handleInputchange(e) {
        props.setAddTodoInput(e.target.value);
    }

    return (
        <div className="Add-todo-form">
            <input type="text" className="Add-todo-input-box" value={props.addTodoInput} onChange={handleInputchange}></input>
            <button type="submit" className="Add-todo-add-btn" onClick={props.addTodoHandler}>Add Task</button>
        </div>

    );
}

export default AddTodo;
