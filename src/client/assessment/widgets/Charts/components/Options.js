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
  RowHeaderOption,
  MaximumResponsesPerCellOption,
  RowTitlesWidthOption,
  RowMinHeightOption,
  ResponseContainerPositionOption,
  StemNumerationOption
} from "../../../containers/WidgetOptions/components";
import { Row } from "../../../styled/WidgetOptions/Row";
import { Col } from "../../../styled/WidgetOptions/Col";
import { setQuestionDataAction, getQuestionDataSelector } from "../../../../author/QuestionEditor/ducks";

const Options = ({ item, t, setQuestionData }) => {
  const changeItem = (prop, val) => {
    const newItem = cloneDeep(item);

    newItem[prop] = val;
    setQuestionData(newItem);
  };

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
            <RowTitlesWidthOption
              onChange={val => changeUIStyle("row_titles_width", val)}
              value={get(item, "ui_style.row_titles_width", "100%")}
            />
          </Col>
          <Col md={12}>
            <RowMinHeightOption
              onChange={val => changeUIStyle("row_min_height", val)}
              value={get(item, "ui_style.row_min_height", "100%")}
            />
          </Col>
        </Row>

        <Row gutter={36}>
          <Col md={12}>
            <RowHeaderOption
              onChange={val => changeUIStyle("row_header", val)}
              value={get(item, "ui_style.row_header", "")}
            />
          </Col>
          <Col md={12}>
            <MaximumResponsesPerCellOption
              onChange={val => changeItem("max_response_per_cell", +val)}
              value={get(item, "max_response_per_cell", 0)}
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
