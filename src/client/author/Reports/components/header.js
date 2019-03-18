import React from "react";
import HeaderWrapper from "../../src/mainContent/headerWrapper";
import { Title } from "../../src/components/common/ListHeader";

export const CustomizedHeaderWrapper = props => {
  return (
    <HeaderWrapper>
      <Title>{props.title}</Title>
    </HeaderWrapper>
  );
};
