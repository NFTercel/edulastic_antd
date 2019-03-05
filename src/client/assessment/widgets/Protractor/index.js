import React, { memo, Component } from "react";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import { compose } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";

import { Paper } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";
import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";

import { Subtitle } from "../../styled/Subtitle";

import Options from "./Options";
import ProtractorView from "./ProtractorView";

const EmptyWrapper = styled.div``;

class Protractor extends Component {
  render() {
    const { item, view, smallSize, setQuestionData, t } = this.props;

    const Wrapper = smallSize ? EmptyWrapper : Paper;

    const handleItemChangeChange = (prop, value) => {
      const newItem = cloneDeep(item);

      newItem[prop] = value;
      setQuestionData(newItem);
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
          <ProtractorView smallSize={smallSize} item={item} />
        </Wrapper>
      );
    }
  }
}

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
