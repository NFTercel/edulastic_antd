import React, { useState } from "react";
import PropTypes from "prop-types";
import { EduButton, FlexContainer } from "@edulastic/common";
import { Input } from "antd";
import { Container } from "./styled";

const Prompt = ({ style, onSuccess }) => {
  const [position, setPosition] = useState(1);

  const handleChange = e => {
    setPosition(e.target.value);
  };

  const handleSuccess = () => {
    onSuccess(position);
  };

  return (
    <Container style={style}>
      <FlexContainer style={{ marginBottom: 10 }}>
        <Input placeholder="Position" type="number" value={position} onChange={handleChange} />
      </FlexContainer>
      <FlexContainer justifyContent="center">
        <EduButton type="primary" size="small" onClick={handleSuccess}>
          Reorder
        </EduButton>
      </FlexContainer>
    </Container>
  );
};

Prompt.propTypes = {
  style: PropTypes.object,
  onSuccess: PropTypes.func.isRequired
};

Prompt.defaultProps = {
  style: {}
};

export default Prompt;
