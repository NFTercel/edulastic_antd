import React, { memo } from "react";
import PropTypes from "prop-types";
import { FlexContainer } from "@edulastic/common";
import { Container, Link } from "./styled";

function TestPageNav({ onChange, current, buttons }) {
  return (
    <Container>
      {buttons.map(({ value, text, icon }) => (
        <Link key={value} active={(current === value).toString()} onClick={onChange(value)}>
          <FlexContainer>
            {icon}
            <div>{text}</div>
          </FlexContainer>
        </Link>
      ))}
    </Container>
  );
}

TestPageNav.propTypes = {
  onChange: PropTypes.func.isRequired,
  current: PropTypes.string.isRequired,
  buttons: PropTypes.array.isRequired
};

export default memo(TestPageNav);
