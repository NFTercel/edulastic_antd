import React, { useContext } from "react";
import { Select } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { cloneDeep } from "lodash";

import { withNamespaces } from "@edulastic/localization";
import { setQuestionDataAction, getQuestionDataSelector } from "../../../../author/QuestionEditor/ducks";

import { Label } from "../../../styled/WidgetOptions/Label";

import { OptionCheckbox } from "../styled/OptionCheckbox";
import { OptionSelect } from "../styled/OptionSelect";
import SpecialCharacters from "../../../containers/WidgetOptions/components/SpecialCharacters";
import { Row } from "../../../styled/WidgetOptions/Row";
import { Col } from "../../../styled/WidgetOptions/Col";
import { QuestionContext } from "../../../components/QuestionWrapper";
import Container from "./Container";

const Layout = ({ onChange, uiStyle, t }) => {
  const { item: questionData, setQuestionData } = useContext(QuestionContext);

  const stemnumerationOptions = [
    { value: "numerical", label: t("component.options.numerical") },
    { value: "uppercase", label: t("component.options.uppercasealphabet") },
    { value: "lowercase", label: t("component.options.lowercasealphabet") }
  ];

  const fontsizeOptions = [
    { value: "small", label: t("component.options.small") },
    { value: "normal", label: t("component.options.normal") },
    { value: "large", label: t("component.options.large") },
    { value: "xlarge", label: t("component.options.extraLarge") },
    { value: "xxlarge", label: t("component.options.huge") }
  ];

  const mapValues = val => (Number.isNaN(+val) ? "" : val);

  const changeUiStyle = (prop, value) => {
    const newItem = cloneDeep(questionData);

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
          <OptionCheckbox
            checked={questionData.multiple_line}
            onChange={e => onChange("multiple_line", e.target.checked)}
            size="large"
          >
            {t("component.options.multiline")}
          </OptionCheckbox>
        </Col>
        <Col md={12}>
          <OptionCheckbox
            checked={questionData.browserspellcheck}
            onChange={e => onChange("browserspellcheck", e.target.checked)}
            size="large"
          >
            {t("component.options.browserspellcheck")}
          </OptionCheckbox>
        </Col>
      </Row>
      <Row gutter={36}>
        <Col md={12}>
          <OptionCheckbox
            checked={questionData.imagescale}
            onChange={e => onChange("imagescale", e.target.checked)}
            size="large"
          >
            {t("component.options.imagescale")}
          </OptionCheckbox>
        </Col>
        <Col md={12}>
          <OptionCheckbox
            checked={questionData.verticaltop}
            onChange={e => onChange("verticaltop", e.target.checked)}
            size="large"
          >
            {t("component.options.verticaltop")}
          </OptionCheckbox>
        </Col>
      </Row>
      <SpecialCharacters />
      <Row gutter={36}>
        <Col md={12}>
          <Label>{t("component.options.stemNumerationReviewOnly")}</Label>
          <OptionSelect
            size="large"
            onChange={val => changeUiStyle("stemnumeration", val)}
            value={uiStyle.stemnumeration}
          >
            {stemnumerationOptions.map(({ value: val, label }) => (
              <Select.Option key={val} value={val}>
                {label}
              </Select.Option>
            ))}
          </OptionSelect>
        </Col>
        <Col md={12}>
          <Label>{t("component.options.fontSize")}</Label>
          <OptionSelect
            size="large"
            onChange={fontsize => changeUiStyle("fontsize", fontsize)}
            value={uiStyle.fontsize}
          >
            {fontsizeOptions.map(({ value: val, label }) => (
              <Select.Option key={val} value={val}>
                {label}
              </Select.Option>
            ))}
          </OptionSelect>
        </Col>
      </Row>
      <Container onChange={changeUiStyle} t={t} uiStyle={uiStyle} />
    </React.Fragment>
  );
};

Layout.propTypes = {
  onChange: PropTypes.func.isRequired,
  uiStyle: PropTypes.object,
  t: PropTypes.func.isRequired
};

Layout.defaultProps = {
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

export default enhance(Layout);
