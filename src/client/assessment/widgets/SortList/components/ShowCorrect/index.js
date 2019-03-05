import React from "react";
import PropTypes from "prop-types";

import { CorrectAnswersContainer } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import { FlexRow } from "./styled/FlexRow";
import { Item } from "./styled/Item";
import { Index } from "./styled/Index";
import { Content } from "./styled/Content";

const ShowCorrect = ({ list, correctList, source, t }) => (
  <CorrectAnswersContainer title={t("component.sortList.correctAnswers")}>
    <FlexRow>
      {list.map((item, i) => (
        <Item key={i}>
          <Index>{correctList.indexOf(source.indexOf(item)) + 1}</Index>
          <Content dangerouslySetInnerHTML={{ __html: item }} />
        </Item>
      ))}
    </FlexRow>
  </CorrectAnswersContainer>
);

ShowCorrect.propTypes = {
  list: PropTypes.array.isRequired,
  correctList: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
  source: PropTypes.array.isRequired
};

export default withNamespaces("assessment")(ShowCorrect);
