const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const shortid = require("shortid");

// 투두리스트 생성 함수
const todoGenerator = (data) => ({
  id: shortid.generate(),
  content: data,
});

// 투두리스트
const todoList = Array.from({ length: 3 }, (_, i) => todoGenerator(i));

// 투두리스트 전체 조회
app.get("/", function (req, res) {
  try {
    res.status(200).send(todoList);
  } catch (e) {
    res.status(500).send("error!");
  }
});

// 투두 추가
// {content}
app.post("/", function (req, res) {
  try {
    const { content } = req.body;
    const newTodo = todoGenerator(content);
    todoList.push(newTodo);
    res.status(200).send(newTodo);
  } catch (e) {
    res.status(500).send("error");
  }
});

// 투두 수정
// {content,todoId}
app.put("/", function (req, res) {
  try {
    const { todoId, content } = req.body;
    const targetIndex = todoList.findIndex((todo) => todo.id === todoId);
    todoList[targetIndex].content = content;
    res.status(200).send(todoList[targetIndex]);
  } catch (e) {
    res.status(500).send("error!");
  }
});

// 투두 삭제
// {todoId}
app.delete("/", function (req, res) {
  try {
    const { todoId } = req.body;
    todoList.filter((todo) => todo.id !== todoId);
    res.status(200).send(todoList[targetIndex]);
  } catch (e) {
    res.status(500).send("error!");
  }
});

app.listen(port, () => {
  console.log("toy server is running at port number 8000");
});
