import React from "react";
import { get } from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { withNamespaces } from "react-i18next";

import { getQuestionDataSelector } from "../../../../author/QuestionEditor/ducks";
import WidgetOptions from "../../../containers/WidgetOptions";
import Extras from "../../../containers/Extras";
import {
  Layout,
  FontSizeOption,
  StemNumerationOption,
  MaxWidthOption
} from "../../../containers/WidgetOptions/components";
import { Row } from "../../../styled/WidgetOptions/Row";
import { Col } from "../../../styled/WidgetOptions/Col";
import { changeUIStyleAction, changeItemAction } from "../../../../author/src/actions/question";

const Options = ({ item, t, changeUIStyle, changeItem }) => (
  <WidgetOptions title={t("common.options.title")}>
    <Layout>
      <Row gutter={36}>
        <Col md={12}>
          <StemNumerationOption
            onChange={val => changeUIStyle("validation_stem_numeration", val)}
            value={get(item, "ui_style.validation_stem_numeration", "numerical")}
          />
        </Col>
        <Col md={12}>
          <MaxWidthOption onChange={val => changeItem("max_width", +val)} value={get(item, "max_width", 900)} />
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

Options.propTypes = {
  t: PropTypes.func.isRequired,
  changeItem: PropTypes.func.isRequired,
  changeUIStyle: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const enhance = compose(
  withNamespaces("assessment"),
  connect(
    state => ({
      item: getQuestionDataSelector(state)
    }),
    {
      changeItem: changeItemAction,
      changeUIStyle: changeUIStyleAction
    }
  )
);

export default enhance(Options);
