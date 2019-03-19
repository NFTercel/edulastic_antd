import React, { useState } from "react";
import { Menu, Dropdown } from "antd";

const options = ["Active Classes"];

const ClassSelector = () => {
  const [selectedOption, setOption] = useState(options[0]);

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => setOption(options[0])}>
        Active Classes
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      My Classes
      <Dropdown.Button overlay={menu}> {selectedOption} </Dropdown.Button>
    </div>
  );
};

export default ClassSelector;
