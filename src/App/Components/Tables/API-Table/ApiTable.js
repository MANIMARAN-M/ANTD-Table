import React from "react";
import { Table, Tag, Radio, Input } from "antd";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const { Search } = Input;

const ApiTable = () => {
  const [MainTodos, setMainTodos] = useState([]);
  const [Todos, setTodos] = useState({
    filteredTodo: [],
    sortedTodos: [],
  });
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        const Data = res.data.slice(0, 500);
        setMainTodos(Data);
        setTodos({ ...Todos, filteredTodo: Data });
      })
      .catch((err) => console.log(err.message));
  }, []);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "completed",
      dataIndex: "completed",
      key: "completed",
      //   filters: [
      //     { text: "false", value: "false" },
      //     { text: "true", value: "true" },
      //   ],
      //   onFilter: (value, record) => {
      //     const sortedTodo = Todos.filteredTodo.filter((Todos) => {
      //       return Todos.completed
      //         .toString()
      //         .toLowerCase()
      //         .includes(value.toString().toLowerCase());
      //     });
      //     setTodos({ ...Todos, sortedTodos: sortedTodo });
      //   },
      render: (completed) => {
        let color = completed ? "green" : "volcano";
        return (
          <Tag color={color} key={completed}>
            {completed.toString()}
          </Tag>
        );
      },
    },
  ];

  const onSearch = (value) => {
    const filteredTodos = MainTodos.filter((MainTodo) => {
      return MainTodo.title
        .toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase());
    });
    setTodos({ ...Todos, filteredTodo: filteredTodos });
  };

  const onSortTodos = (e) => {
    if (e.target.value === "a") {
      setTodos({ ...Todos, sortedTodos: [] });
    } else {
      const sortedTodo = Todos.filteredTodo.filter((Todos) => {
        return Todos.completed
          .toString()
          .toLowerCase()
          .includes(e.target.value.toString().toLowerCase());
      });
      setTodos({ ...Todos, sortedTodos: sortedTodo });
    }
  };

  return (
    <div className="MyTodosTable">
      <div className="TableSearchBox">
        <Search
          placeholder="search todos title"
          onSearch={onSearch}
          enterButton
        />
        {/* <p>Total number of todos: {Todos.filteredTodo.length}</p> */}
      </div>
      <div className="sortTable">
        <small>Sort: </small>
        <Radio.Group
          defaultValue="a"
          buttonStyle="solid"
          onChange={onSortTodos}
        >
          <Radio.Button value="a">All</Radio.Button>
          <Radio.Button value="true">True</Radio.Button>
          <Radio.Button value="false">False</Radio.Button>
        </Radio.Group>
      </div>
      <Table
        dataSource={
          Todos.sortedTodos.length === 0
            ? Todos.filteredTodo
            : Todos.sortedTodos
        }
        columns={columns}
      />
    </div>
  );
};

export default ApiTable;
