import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import produce from "immer";
import { compose } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";

import { Paper } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";
import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";
import { updateVariables, replaceVariables } from "../../utils/variables";

import { Subtitle } from "../../styled/Subtitle";

import Options from "./Options";
import ProtractorView from "./ProtractorView";

const EmptyWrapper = styled.div``;

const Protractor = ({ item, view, smallSize, setQuestionData, t }) => {
  const Wrapper = smallSize ? EmptyWrapper : Paper;
  const itemForPreview = useMemo(() => replaceVariables(item), [item]);

  const handleItemChangeChange = (prop, value) => {
    setQuestionData(
      produce(item, draft => {
        draft[prop] = value;
        updateVariables(draft);
      })
    );
  };

  if (view === "edit") {
    return (
      <Paper style={{ marginBottom: 30 }}>
        <Subtitle>{t("component.protractor.details")}</Subtitle>
        <Options onChange={handleItemChangeChange} item={item} />
        <ProtractorView smallSize={smallSize} item={item} />
      </Paper>
    );
  }

  if (view === "preview") {
    return (
      <Wrapper>
        <ProtractorView smallSize={smallSize} item={itemForPreview} />
      </Wrapper>
    );
  }
};

Protractor.propTypes = {
  item: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
  smallSize: PropTypes.bool.isRequired,
  setQuestionData: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

const enhance = compose(
  withNamespaces("assessment"),
  memo,
  connect(
    null,
    {
      setQuestionData: setQuestionDataAction
    }
  )
);

const ProtractorContainer = enhance(Protractor);

export { ProtractorContainer as Protractor };
