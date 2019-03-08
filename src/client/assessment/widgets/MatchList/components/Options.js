import React, { useContext } from "react";
import { get, cloneDeep } from "lodash";

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
import { QuestionContext } from "../../../components/QuestionWrapper";

const Options = () => {
  const { item, t, setQuestionData } = useContext(QuestionContext);

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

export default Options;
