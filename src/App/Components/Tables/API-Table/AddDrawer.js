import React, { useState, useContext } from "react";
import { Drawer, Form, Button, Input, message, Radio } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { TodosContext } from "../../../store/ContextStore/TodoContext";

const AddDrawer = () => {
  const [visible, setVisible] = useState(false);
  const TodosContexts = useContext(TodosContext);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    message.info(`Added successfully`);
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title: values.todoName,
        completed: values.complete_status,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("data", json);
        TodosContexts.dispatch({ type: "fetching_post_data", payload: json });
        onClose();
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.info(`Please fill all required inputs`);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        <PlusOutlined /> Add Todo
      </Button>
      <Drawer
        title="Create a new Todo"
        placement="top"
        height="auto"
        onClose={onClose}
        visible={visible}
      >
        <div className="AddTodoFrom">
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="TodoName"
              name="todoName"
              rules={[
                {
                  required: true,
                  message: "Please input your todoname!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="complete_status"
              label="Status"
              rules={[
                {
                  required: true,
                  message: "Please select",
                },
              ]}
              // style={{
              //   marginLeft: "20px",
              // }}
            >
              <Radio.Group>
                <Radio value="true">Ture</Radio>
                <Radio value="false">False</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit">
                Add Todo
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </>
  );
};
export default AddDrawer;
