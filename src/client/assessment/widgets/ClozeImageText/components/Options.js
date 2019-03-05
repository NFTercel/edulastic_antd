import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { Divider } from "antd";
import { withNamespaces } from "@edulastic/localization";
import { setQuestionDataAction, getQuestionDataSelector } from "../../../../author/QuestionEditor/ducks";

import WidgetOptions from "../../../containers/WidgetOptions";
import { Block } from "../../../styled/WidgetOptions/Block";
import { Heading } from "../../../styled/WidgetOptions/Heading";

import Layout from "./Layout";
import Extras from "../../../containers/Extras";

const Options = ({ onChange, uiStyle, t, outerStyle }) => (
  <WidgetOptions outerStyle={outerStyle}>
    <Block>
      <Heading>{t("component.options.layout")}</Heading>
      <Layout onChange={onChange} uiStyle={uiStyle} />
      <Divider />
      <Extras>
        <Extras.Distractors />
        <Extras.Hints />
      </Extras>
    </Block>
  </WidgetOptions>
);

Options.propTypes = {
  onChange: PropTypes.func.isRequired,
  uiStyle: PropTypes.object,
  t: PropTypes.func.isRequired,
  outerStyle: PropTypes.object
};

Options.defaultProps = {
  outerStyle: {},
  uiStyle: {
    responsecontainerposition: "bottom",
    fontsize: "normal",
    stemnumeration: "",
    width: 0,
    height: 0,
    wordwrap: false,
    responsecontainerindividuals: []
  }
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
