import React from "react";
import { Table } from "antd";

const TableOne = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
      phnno: false,
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
      phnno: 434343,
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Phone Number",
      dataIndex: "phnno",
      key: "phnno",
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};

export default TableOne;
