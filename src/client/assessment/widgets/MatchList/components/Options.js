import React from "react";
import { get, cloneDeep } from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { withNamespaces } from "react-i18next";

import WidgetOptions from "../../../containers/WidgetOptions";
import Extras from "../../../containers/Extras";
import {
  Layout,
  FontSizeOption,
  ResponseContainerPositionOption,
  StemNumerationOption
} from "../../../containers/WidgetOptions/components";
import { Row } from "../../../styled/WidgetOptions/Row";
import { Col } from "../../../styled/WidgetOptions/Col";
import { setQuestionDataAction } from "../../../../author/src/actions/question";
import { getQuestionDataSelector } from "../../../../author/QuestionEditor/ducks";

const Options = ({ item, t, setQuestionData }) => {
  const changeUIStyle = (prop, val) => {
    const newItem = cloneDeep(item);

    if (!newItem.ui_style) {
      newItem.ui_style = {};
    }

    newItem.ui_style[prop] = val;
    setQuestionData(newItem);
  };

  return (
    <WidgetOptions title={t("common.options.title")}>
      <Layout>
        <Row gutter={36}>
          <Col md={12}>
            <ResponseContainerPositionOption
              onChange={val => changeUIStyle("possibility_list_position", val)}
              value={get(item, "ui_style.possibility_list_position", "bottom")}
            />
          </Col>
          <Col md={12}>
            <StemNumerationOption
              onChange={val => changeUIStyle("validation_stem_numeration", val)}
              value={get(item, "ui_style.validation_stem_numeration", "numerical")}
            />
          </Col>
        </Row>

        <Row gutter={36}>
          <Col md={12}>
            <FontSizeOption
              onChange={val => changeUIStyle("fontsize", val)}
              value={get(item, "ui_style.fontsize", "normal")}
            />
          </Col>
        </Row>
      </Layout>
      <Extras>
        <Extras.Distractors />
        <Extras.Hints />
      </Extras>
    </WidgetOptions>
  );
};

Options.propTypes = {
  t: PropTypes.func.isRequired,
  setQuestionData: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const enhance = compose(
  withNamespaces("assessment"),
  connect(
    state => ({
      item: getQuestionDataSelector(state)
    }),
    {
      setQuestionData: setQuestionDataAction
    }
  )
);

export default enhance(Options);
