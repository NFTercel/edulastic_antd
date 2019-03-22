import React, { useState } from "react";
import { Menu, Dropdown } from "antd";

import { ClassSelect, LabelMyClasses } from "./styled";

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
    <ClassSelect>
      <LabelMyClasses>My Classes</LabelMyClasses>
      <Dropdown.Button overlay={menu}> {selectedOption} </Dropdown.Button>
    </ClassSelect>
  );
};

export default ClassSelector;
