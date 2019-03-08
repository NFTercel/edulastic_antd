import React from "react";
import PropTypes from "prop-types";
import { SortableElement } from "react-sortable-hoc";
import { compose } from "redux";
import { withTheme } from "styled-components";

import { FlexContainer, MathFormulaDisplay } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import { Container } from "../styled/Container";
import { Text } from "../styled/Text";
import { Index } from "../styled/Index";
import { CorrectAnswerItem } from "../styled/CorrectAnswerItem";
import { QuestionText } from "../styled/QuestionText";
import { IconWrapper } from "../styled/IconWrapper";
import { IconCheck } from "../styled/IconCheck";
import { IconClose } from "../styled/IconClose";

const OrderListReportItem = SortableElement(({ children, correctText, correct, showAnswers, ind, t, theme }) => (
  <div>
    <Container correct={correct}>
      <Text>
        <FlexContainer>
          <Index>{ind}</Index>
          <MathFormulaDisplay dangerouslySetInnerHTML={{ __html: children }} />
        </FlexContainer>
        {correct && (
          <IconWrapper color={theme.widgets.orderList.correctIconWrapperColor}>
            <IconCheck />
          </IconWrapper>
        )}
        {!correct && (
          <IconWrapper color={theme.widgets.orderList.incorrectIconWrapperColor}>
            <IconClose />
          </IconWrapper>
        )}
      </Text>
    </Container>
    {showAnswers && !correct && (
      <CorrectAnswerItem>
        <Text>
          <FlexContainer>
            <Index color={theme.widgets.orderList.incorrectIndexColor}>{ind}</Index>
            <QuestionText>
              <span>{t("component.orderlist.correctanswer")}</span>{" "}
              <MathFormulaDisplay dangerouslySetInnerHTML={{ __html: correctText }} />
            </QuestionText>
          </FlexContainer>
        </Text>
      </CorrectAnswerItem>
    )}
  </div>
));

OrderListReportItem.propTypes = {
  children: PropTypes.string.isRequired,
  correct: PropTypes.bool.isRequired,
  showAnswers: PropTypes.bool,
  correctText: PropTypes.string,
  ind: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
};

OrderListReportItem.defaultProps = {
  showAnswers: false,
  correctText: ""
};

const enhance = compose(
  withNamespaces("assessment"),
  withTheme
);

export default enhance(OrderListReportItem);
