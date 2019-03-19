import React from "react";
import { Radio, Row } from "antd";
import { Container } from "./styled";

import AssignmentsTable from "./Table";

const Group = Radio.Group;

const MainContent = ({ assignments, RegradeTypes, RegradeKeys, regradeType, handleRegradeTypeSelect }) => {
  return (
    <Container>
      <Group defaultValue={RegradeKeys[0]} onChange={handleRegradeTypeSelect}>
        {RegradeKeys.map(item => (
          <Row key={item}>
            <Radio value={item}>{RegradeTypes[item]}</Radio>
          </Row>
        ))}
      </Group>
      {regradeType == "SPECIFIC" && <AssignmentsTable assignments={assignments} />}
    </Container>
  );
};

export default MainContent;
