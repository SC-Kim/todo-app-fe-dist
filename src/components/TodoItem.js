import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({item, deleteTask, updateTask}) => {
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${item.isComplete ? 'completed animate-move' : ''}`}>
          <div className="todo-content">{item.task}</div>

          <div>
            <button className="button-delete" onClick={
              ()=>deleteTask(item._id)}>삭제</button>
            <button className="button-delete" onClick={
              ()=>updateTask(item._id)}>
                {item.isComplete? "끝남":"안끝남"}</button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
