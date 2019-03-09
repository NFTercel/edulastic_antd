import React, { useContext } from "react";
import { cloneDeep, get } from "lodash";

import SpecialCharacters from "../../../containers/WidgetOptions/components/SpecialCharacters";
import { Row } from "../../../styled/WidgetOptions/Row";
import { Col } from "../../../styled/WidgetOptions/Col";
import { QuestionContext } from "../../../components/QuestionWrapper";
import Container from "./Container";
import {
  FontSizeOption,
  StemNumerationOption,
  VerticalTopOption,
  ImageScaleOption,
  BrowserSpellcheckOption,
  MultipleLineOption
} from "../../../containers/WidgetOptions/components";

const Layout = () => {
  const { item, t, changeItem, setQuestionData } = useContext(QuestionContext);

  const mapValues = val => (Number.isNaN(+val) ? "" : val);

  const changeUiStyle = (prop, value) => {
    const newItem = cloneDeep(item);

    if (!newItem.ui_style) {
      newItem.ui_style = {};
    }

    if (prop === "inputtype") {
      newItem.validation.valid_response.value = newItem.validation.valid_response.value.map(mapValues);

      if (Array.isArray(newItem.validation.alt_responses)) {
        newItem.validation.alt_responses = newItem.validation.alt_responses.map(res => {
          res.value = res.value.map(mapValues);
          return res;
        });
      }
    }

    newItem.ui_style[prop] = value;

    setQuestionData(newItem);
  };

  return (
    <React.Fragment>
      <Row gutter={36}>
        <Col md={12}>
          <MultipleLineOption
            checked={get(item, "multiple_line", false)}
            onChange={val => changeItem("multiple_line", val)}
          />
        </Col>
        <Col md={12}>
          <BrowserSpellcheckOption
            checked={get(item, "browserspellcheck", false)}
            onChange={val => changeItem("browserspellcheck", val)}
          />
        </Col>
      </Row>
      <Row gutter={36}>
        <Col md={12}>
          <ImageScaleOption checked={get(item, "imagescale", false)} onChange={val => changeItem("imagescale", val)} />
        </Col>
        <Col md={12}>
          <VerticalTopOption
            checked={get(item, "verticaltop", false)}
            onChange={val => changeItem("verticaltop", val)}
          />
        </Col>
      </Row>
      <SpecialCharacters />
      <Row gutter={36}>
        <Col md={12}>
          <StemNumerationOption
            onChange={val => changeUiStyle("validation_stem_numeration", val)}
            value={get(item, "ui_style.validation_stem_numeration", "numerical")}
          />
        </Col>
        <Col md={12}>
          <FontSizeOption
            onChange={val => changeUiStyle("fontsize", val)}
            value={get(item, "ui_style.fontsize", "normal")}
          />
        </Col>
      </Row>
      <Container onChange={changeUiStyle} t={t} uiStyle={get(item, "ui_style", {})} />
    </React.Fragment>
  );
};

export default Layout;
