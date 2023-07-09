import React from "react";
import { nanoid } from "nanoid";
import { styled } from "styled-components";
import { useState } from "react";

const App = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [title, setTitle] = useState("선택하세요");
  const [contents, setContents] = useState("");
  const options = ["선택하세요", "강의", "과제", "운동"];
  const [todos, setTodos] = useState([
    {
      id: nanoid(),
      title: "과제",
      contents: "정예반 과제 하기",
      likes: 0,
    },
  ]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleContents = (event) => {
    setContents(event.target.value);
  };

  const handleAddButton = () => {
    if (title === "선택하세요") {
      alert("주제를 선택하세요");
    } else if (contents === "") {
      alert("내용을 입력하세요");
    } else {
      const newTodo = { id: nanoid(), title, contents, likes: 0 };
      setTodos([...todos, newTodo]);
      setTitle("");
      setContents("");
    }
  };

  const handleLikeButton = (id) => {
    const updatedLikeTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, likes: todo.likes + 1 };
      }
      return todo;
    });
    setTodos(updatedLikeTodos);
  };

  const handleDeleteButton = (id) => {
    const newTodo = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodo);
  };

  return (
    <>
      <Layout>
        <Container style={isDarkMode ? darkTheme : lightTheme}>
          <HeaderContainer>
            <DateBox>{formattedDate}</DateBox>
            <StButton style={{ marginRight: "20px" }} onClick={toggleDarkMode}>
              {isDarkMode ? "🌞" : "🌝"}
            </StButton>
          </HeaderContainer>
          <Layout>
            <h1>Daily Todo List</h1>
          </Layout>
          <Layout>
            <InputItem>
              <label>주제</label> &nbsp;
              <select value={title} onChange={handleTitle}>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </InputItem>
            <InputItem>
              <label>내용</label> &nbsp;
              <input type="text" value={contents} onChange={handleContents} />
            </InputItem>
            <button onClick={handleAddButton}>추가하기</button>
          </Layout>
          {todos.map((todo) => (
            <TodoCantainer
              style={
                isDarkMode
                  ? { border: "2px solid white" }
                  : { border: "2px solid black" }
              }
            >
              <TodoHeader>
                <div>주제 : {todo.title}</div>
                <div>
                  <span>{todo.likes}</span>
                  <StButton
                    onClick={() => handleLikeButton(todo.id)}
                    style={isDarkMode ? { color: "white" } : { color: "black" }}
                  >
                    Like
                  </StButton>
                  <StButton
                    onClick={() => handleDeleteButton(todo.id)}
                    style={isDarkMode ? { color: "white" } : { color: "black" }}
                  >
                    X
                  </StButton>
                </div>
              </TodoHeader>
              <div>내용 : {todo.contents}</div>
            </TodoCantainer>
          ))}
        </Container>
      </Layout>
    </>
  );
};

export default App;

// 스타일 영역

const darkTheme = {
  backgroundColor: "black",
  color: "white",
};

const lightTheme = {
  backgroundColor: "white",
  color: "black",
};

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 500px;
  height: 700px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DateBox = styled.div`
  margin: 20px;
`;

const StButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
`;

const InputItem = styled.div`
  margin: 10px;
`;

const TodoCantainer = styled.div`
  margin: 20px;
  padding: 10px;
  justify-content: space-between;
`;

const TodoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
