import React from "react";
import TableOne from "./TableOne";
import TableTwo from "./TableTwo";
import { Divider } from "antd";
// import FromDesign from "../FormDesign/FromDesign";

const Tables = () => {
  return (
    <div className="TableSection">
      <div className="Table-one">
        <Divider orientation="left" plain>
          Simple Table
        </Divider>
        <TableOne />
      </div>
      <div className="table-two">
        <Divider orientation="left" plain>
          Simple Table with actions
        </Divider>
        <TableTwo />
      </div>
    </div>
  );
};

export default Tables;
