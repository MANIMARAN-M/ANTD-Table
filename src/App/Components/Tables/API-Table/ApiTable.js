import React, { useContext, useState } from "react";
import {
  Table,
  Tag,
  Radio,
  Input,
  Row,
  message,
  Popconfirm,
  Popover,
  Tooltip,
  Alert,
} from "antd";
import { useEffect } from "react";
import axios from "axios";
import { TodosContext } from "../../../store/ContextStore/TodoContext";
import AddDrawer from "./AddDrawer";
import EditDrawer from "./EditDrawer";

const { Search } = Input;

const ApiTable = () => {
  // Get Todos from the context
  const TodosContexts = useContext(TodosContext);

  // Popup handle state
  const [PopVisible, setPopVisible] = useState(false);

  // Fetch data and throw the data in our context
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        const Data = res.data.slice(0, 500);
        TodosContexts.dispatch({ type: "fetching_data", payload: Data });
      })
      .catch((err) =>
        TodosContexts.dispatch({ type: "fetching_error", payload: err.message })
      );
  }, []);

  // Delete todo dispatch function
  function confirm(data) {
    TodosContexts.dispatch({ type: "delete_data", payload: data });
    message.success("Deleted successfully");
    hide();
  }

  // Toggle todo progress
  const ProgressHandler = (data) => {
    TodosContexts.dispatch({ type: "todo_progress_data", payload: data });
    console.log(data);
    if (data.completed) {
      message.success("Finish quickly");
    } else {
      message.success(" Congratulations");
    }
  };

  // PopUp function
  const hide = () => {
    setPopVisible(false);
  };
  // PopUp function
  const handleVisibleChange = (visible) => {
    setPopVisible(visible);
  };

  // Set table titles here
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

      // Completed progress design
      render: (completed, record) => {
        let color = completed ? "green" : "volcano";
        return (
          <Popconfirm
            title={
              completed
                ? "You don't finish this task?"
                : "Are you finished this task?"
            }
            onConfirm={() => ProgressHandler(record)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip placement="bottom" title="Click to update status">
              <Tag
                color={color}
                key={completed}
                style={{ cursor: "pointer" }}
                // title="Click to update status"
              >
                {completed.toString()}
              </Tag>
            </Tooltip>
          </Popconfirm>
        );
      },
    },
    {
      title: "actions",
      dataIndex: "actions",
      key: "actions",

      // Edit and delete options here
      render: (_, record) => {
        return (
          <div className="EditTabledot">
            <Popover
              content={
                <div>
                  <EditDrawer hide={hide} data={record} /> <br />
                  <Popconfirm
                    title="Are you sure to delete this task?"
                    onConfirm={() => confirm(record)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <span style={{ cursor: "pointer" }}>Delete</span>
                  </Popconfirm>
                </div>
              }
              title="Options"
              trigger="click"
              visible={PopVisible}
              onVisibleChange={() => handleVisibleChange()}
            >
              <div className="EditTabledots">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </Popover>
          </div>
        );
      },
    },
  ];

  // Search function and dispatch here
  const onSearch = (value) => {
    const filteredTodos = TodosContexts.state.todos.filter((todos) => {
      return todos.title
        .toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase());
    });
    TodosContexts.dispatch({ type: "filter_data", payload: filteredTodos });
  };

  // Sort todos functions and dispatch here
  const onSortTodos = (e) => {
    if (e.target.value === "a") {
      TodosContexts.dispatch({ type: "sorted_data", payload: [] });
    } else {
      const sortedTodo = TodosContexts.state.filteredTodos.filter((Todos) => {
        return Todos.completed
          .toString()
          .toLowerCase()
          .includes(e.target.value.toString().toLowerCase());
      });
      TodosContexts.dispatch({ type: "sorted_data", payload: sortedTodo });
    }
  };

  // Return function
  return (
    <div className="MyTodosTable">
      <div></div>
      <div className="TableSearchBox">
        <Search
          placeholder="search todos title"
          onSearch={onSearch}
          enterButton
        />
        <Alert
          style={{ marginTop: "20px" }}
          message="Total number of todos:"
          description={TodosContexts.state.filteredTodos.length}
        />
      </div>
      <Row justify="space-between" className="sortTable">
        <div>
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
        <div>
          <AddDrawer />
        </div>
      </Row>
      <Table
        key={1}
        dataSource={
          TodosContexts.state.sortedTodos.length === 0
            ? TodosContexts.state.filteredTodos
            : TodosContexts.state.sortedTodos
        }
        columns={columns}
      />
    </div>
  );
};

export default ApiTable;
