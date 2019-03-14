import React from "react";
import { get, cloneDeep } from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";

import WidgetOptions from "../../../containers/WidgetOptions";
import { Block } from "../../../styled/WidgetOptions/Block";

import Extras from "../../../containers/Extras";
import { Layout, FontSizeOption, LineWidthOption } from "../../../containers/WidgetOptions/components";
import { Row } from "../../../styled/WidgetOptions/Row";
import { Col } from "../../../styled/WidgetOptions/Col";
import { getQuestionDataSelector, setQuestionDataAction } from "../../../../author/QuestionEditor/ducks";

const Options = ({ item, setQuestionData }) => {
  const _change = (prop, uiStyle) => {
    const newItem = cloneDeep(item);

    newItem[prop] = uiStyle;
    setQuestionData(newItem);
  };

  const _uiChange = (prop, val) => {
    const newItem = cloneDeep(item);

    if (!newItem.ui_style) {
      newItem.ui_style = {};
    }

    newItem.ui_style[prop] = val;
    setQuestionData(newItem);
  };

  return (
    <WidgetOptions>
      <Layout>
        <Row gutter={36}>
          <Col md={12}>
            <LineWidthOption onChange={val => _change("line_width", +val)} value={item.line_width || 5} />
          </Col>
          <Col md={12}>
            <FontSizeOption
              onChange={val => _uiChange("fontsize", val)}
              value={get(item, "ui_style.fontsize", "normal")}
            />
          </Col>
        </Row>
      </Layout>

      <Block>
        <Extras>
          <Extras.Distractors />
          <Extras.Hints />
        </Extras>
      </Block>
    </WidgetOptions>
  );
};

Options.propTypes = {
  setQuestionData: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const enhance = compose(
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
