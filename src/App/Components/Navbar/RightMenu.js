import React from "react";
import { Menu, Grid } from "antd";
import { Link } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const RightMenu = () => {
  const { md } = useBreakpoint();
  return (
    <Menu mode={md ? "horizontal" : "inline"}>
      <Menu.Item key="mail">
        <Link to="/signin">Signin</Link>
      </Menu.Item>
      <Menu.Item key="app">
        <Link to="/signup">Signup</Link>
      </Menu.Item>
    </Menu>
  );
};

export default RightMenu;
