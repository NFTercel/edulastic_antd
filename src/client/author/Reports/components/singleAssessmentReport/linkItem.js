import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "antd";
import { grey, darkBlue, lightBlue, black } from "@edulastic/colors";

const Item = styled.div`
  height: 40px;
  color: ${lightBlue};
  border-bottom: solid 1px ${grey};
  padding: 10px;
`;

const StyledIcon = styled(Icon)`
  font-weight: bold;
  float: right;
  color: ${darkBlue};
`;

export const LinkItem = props => {
  return (
    <Item>
      <Link to={props.data.location}>{props.data.title}</Link>
      <StyledIcon type="right" />
    </Item>
  );
};
