import React from "react";
import { get } from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { withNamespaces } from "react-i18next";

import WidgetOptions from "../../../containers/WidgetOptions";
import Extras from "../../../containers/Extras";
import { Layout, FontSizeOption, MaxSelectionOption } from "../../../containers/WidgetOptions/components";
import { Row } from "../../../styled/WidgetOptions/Row";
import { Col } from "../../../styled/WidgetOptions/Col";
import { getQuestionDataSelector } from "../../../../author/QuestionEditor/ducks";
import { changeItemAction, changeUIStyleAction } from "../../../../author/src/actions/question";

const Options = ({ item, t, changeUIStyle, changeItem }) => (
  <WidgetOptions title={t("common.options.title")}>
    <Layout>
      <Row gutter={36}>
        <Col md={12}>
          <FontSizeOption
            onChange={val => changeUIStyle("fontsize", val)}
            value={get(item, "ui_style.fontsize", "normal")}
          />
        </Col>
        <Col md={12}>
          <MaxSelectionOption
            onChange={val => changeItem("max_selection", +val)}
            value={get(item, "max_selection", 0)}
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
