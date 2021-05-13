import React, { useState, useContext, useEffect } from "react";
import { Drawer, Form, Button, Input, message, Radio } from "antd";
import { TodosContext } from "../../../store/ContextStore/TodoContext";

const EditDrawer = ({ hide, data }) => {
  const [visible, setVisible] = useState(false);

  //   Get Edited Values from the users
  const [EditedValue, setEditedValue] = useState([
    {
      title: "",
      completed: "",
      id: "",
    },
  ]);

  //   Get dispatch from the context
  const TodosContexts = useContext(TodosContext);

  //   Show Drawer fuction
  const showDrawer = () => {
    hide();
    setVisible(true);
  };

  //   Close Drawer fuction
  const onClose = () => {
    setVisible(false);
  };

  //   The user edited form submit handler here
  const onFinish = (values) => {
    message.info(`Added successfully`);
    setEditedValue({
      title: values.todoName,
      completed: values.complete_status,
      id: data.id,
    });
    console.log(values);
    onClose();
  };

  //   Here is the our edit state dispatch method
  useEffect(() => {
    TodosContexts.dispatch({
      type: "update_data",
      payload: EditedValue,
    });
    console.log(EditedValue);
  }, [EditedValue]);

  //   User edited form failed function here
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.info(`Please fill all required inputs`);
  };

  //   Retrun funtion
  return (
    <>
      <span
        type="primary"
        style={{ cursor: "pointer", display: "block" }}
        onClick={showDrawer}
      >
        Edit
      </span>
      <Drawer
        title="Edit your old Todo"
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
              <Input placeholder={data.title} />
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
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </>
  );
};
export default EditDrawer;
