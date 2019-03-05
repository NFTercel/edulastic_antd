import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { withNamespaces } from "@edulastic/localization";

import FlexContainer from "../common/FlexContainer";
import Circle from "../common/Circle";

const SidebarQuestionList = ({ questions, selectedQuestion, gotoQuestion, t }) => (
  <div>
    {questions.map((item, index) => {
      const active = selectedQuestion === index;
      return (
        <ItemContainer
          active={active}
          key={index}
          onClick={() => {
            gotoQuestion(index);
          }}
        >
          <FlexContainer alignItems="center">
            <Circle r={6} active={active} hide={!(selectedQuestion >= index)} />
            <Content active={active}>
              {t("common.layout.questionlist.question")} {index + 1}
            </Content>
          </FlexContainer>
        </ItemContainer>
      );
    })}
  </div>
);

SidebarQuestionList.propTypes = {
  gotoQuestion: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default withNamespaces("student")(SidebarQuestionList);

const ItemContainer = styled.div`
  border-left: solid 3px ${props => (props.active ? props.theme.sidebarContentBorderColor : "transparent")};
  padding: 18px 10px;
  margin: 5px 0 5px 40px;
  box-sizing: border-box;
`;

const Content = styled.div`
  color: ${props => (props.active ? props.theme.sidebarActiveTextColor : props.theme.sidebarTextColor)};
  font-size: ${props => props.theme.sidebarFontSize};
  line-height: 1;
  letter-spacing: 0.2px;
  text-transform: capitalize;
`;
