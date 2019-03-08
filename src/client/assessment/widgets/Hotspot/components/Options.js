import React, { useContext } from "react";
import { get } from "lodash";

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
import { QuestionContext } from "../../../components/QuestionWrapper";

const Options = () => {
  const { item, t, changeUIStyle, changeItem } = useContext(QuestionContext);

  return (
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
};

export default Options;
