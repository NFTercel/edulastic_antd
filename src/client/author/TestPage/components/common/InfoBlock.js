import styled from "styled-components";
import React from "react";
import { textColor, greenDark, mainBgColor } from "@edulastic/colors";
import PropTypes from "prop-types";

const InfoBlock = ({ count, children }) => (
  <Block>
    <Count>{count}</Count>
    <Child>{children}</Child>
  </Block>
);

InfoBlock.propTypes = {
  count: PropTypes.number.isRequired,
  children: PropTypes.string.isRequired
};

const Block = styled.div`
  width: 49%;
  padding: 8px;
  border-radius: 5px;
  border: solid 1px rgba(0, 0, 0, 0.1);
  background-color: ${mainBgColor};
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  color: ${textColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Count = styled.span`
  color: ${greenDark};
  font-size: 18px;
  font-weight: 700;
  margin-right: 15px;
`;

const Child = styled.span`
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 0.2px;
  color: #444444;
`;

export default InfoBlock;
