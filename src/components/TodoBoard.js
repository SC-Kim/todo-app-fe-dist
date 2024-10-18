import React from "react";
import TodoItem from "./TodoItem"

const TodoBoard = ({todoList, deleteTask, updateTask}) => {
  // console.log("todoList: ", todoList)
  return (
    <div>
      <h2>Todo List</h2>
      {todoList.length>0? todoList.map(
        (item) =><TodoItem item={item} deleteTask={deleteTask} 
                  updateTask={updateTask} />) : <h2>There is no item to show</h2>}
      {/* <TodoItem/> will be here once we get the todoList */}
    </div>
  );
};

export default TodoBoard;
