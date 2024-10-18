import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import api from "./utils/api"

function App() {
  const [todoList, setTodoList] = useState([])
  const [todoValue, setTodoValue] = useState("")

  const getTask = async () => {
    const response = await api.get('/tasks')
    const tasks = response.data.data;
    // console.log("getTask response: ", response)
    // 완료된 항목은 하단으로, 완료되지 않은 항목은 상단으로 정렬
    const sortedTasks = tasks.sort((a, b) => a.isComplete - b.isComplete);

    setTodoList(sortedTasks);  // 정렬된 할 일 목록을 상태로 설정
  }

  const addTask = async () => {
    try {
      const response = await api.post('/tasks', {
        task: todoValue,
        isComplete: false,
      })
      if (response.status === 200) {
        console.log("Success")
        setTodoValue("")
      } else {
        throw new Error('Task can not be added.')
      }
    } catch (err) {
      console.log("err: ", err)
    }
  }

  // 유저는 끝남, 안끝남 버튼을 누르면서 메모의 상태를 바꿀수 있다. 끝난 메모는 회색으로 처리된다. 
  const updateTask = async (id) => {

    try {
      // todoList 객채에서 상태 변경된 task 찾아낸다. 
      const task = todoList.find((item) => item._id === id)

      const response = await api.put(`tasks/${id}`, {
        isComplete: !task.isComplete
      })

      if (response.status === 200) {
        getTask();
      }

    } catch (err) {
      console.log("err: ", err)
    }
  }

  // 유저는 메모를 삭제할 수 있다. 
  const deleteTask = async (id) => {
    try {
      // fe 에서 id 받아와서 api에 함께 넘긴다.
      // console.log("task's id: ", id)
      const response = await api.delete(`/tasks/${id}`)
      if (response.status === 200) {
        // console.log("delete success")
        getTask()
      }
    } catch (err) {
      console.log("err: ", err)
    }
  }

  useEffect(() => {
    getTask()
  }, [todoValue])

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event) => setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>추가</button>
        </Col>
      </Row>

      <TodoBoard todoList={todoList} deleteTask={deleteTask}
        updateTask={updateTask} />
    </Container>
  );
}

export default App;
