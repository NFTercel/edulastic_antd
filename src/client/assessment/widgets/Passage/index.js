import React, { memo, Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";

import { Paper } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";
import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";

import { Subtitle } from "../../styled/Subtitle";

import Options from "./components/Options";
import PassageView from "./PassageView";

const EmptyWrapper = styled.div``;

class Passage extends Component {
  render() {
    const { item, view, smallSize, setQuestionData, t } = this.props;

    const Wrapper = smallSize ? EmptyWrapper : Paper;

    if (view === "edit") {
      return (
        <Paper style={{ marginBottom: 30 }}>
          <Subtitle>{t("component.passage.details")}</Subtitle>
          <Options setQuestionData={setQuestionData} item={item} />
          <Paper>
            <PassageView item={item} />
          </Paper>
        </Paper>
      );
    }

    if (view === "preview") {
      return (
        <Wrapper>
          <PassageView item={item} />
        </Wrapper>
      );
    }
  }
}

Passage.propTypes = {
  item: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
  smallSize: PropTypes.bool,
  setQuestionData: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

Passage.defaultProps = {
  smallSize: false
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

const PassageContainer = enhance(Passage);

export { PassageContainer as Passage };
