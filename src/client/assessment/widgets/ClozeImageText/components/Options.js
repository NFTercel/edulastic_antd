import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { Divider } from "antd";
import { withNamespaces } from "@edulastic/localization";
import { setQuestionDataAction, getQuestionDataSelector } from "../../../../author/QuestionEditor/ducks";

import WidgetOptions from "../../../containers/WidgetOptions";
import { Block } from "../../../styled/WidgetOptions/Block";

import Layout from "./Layout";
import Extras from "../../../containers/Extras";

const Options = ({ outerStyle }) => (
  <WidgetOptions outerStyle={outerStyle}>
    <Block>
      <Layout />
      <Divider />
      <Extras>
        <Extras.Distractors />
        <Extras.Hints />
      </Extras>
    </Block>
  </WidgetOptions>
);

Options.propTypes = {
  outerStyle: PropTypes.object
};

Options.defaultProps = {
  outerStyle: {}
};

const enhance = compose(
  withNamespaces("assessment"),
  connect(
    state => ({
      questionData: getQuestionDataSelector(state)
    }),
    {
      setQuestionData: setQuestionDataAction
    }
  )
);

export default enhance(Options);
