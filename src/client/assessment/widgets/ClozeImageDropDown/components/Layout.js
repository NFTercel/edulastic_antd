import React from "react";
import { Select, Row, Col, Input } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";

import { withNamespaces } from "@edulastic/localization";
import styled from "styled-components";
import { setQuestionDataAction, getQuestionDataSelector } from "../../../../author/QuestionEditor/ducks";

import { AddNewChoiceBtn } from "../../../styled/AddNewChoiceBtn";
import { Label } from "../../../styled/WidgetOptions/Label";

import { OptionSelect } from "../styled/OptionSelect";
import { OptionCheckbox } from "../styled/OptionCheckbox";

import Container from "./styled/Container";
import Delete from "./styled/Delete";

const Layout = ({ questionData, onChange, uiStyle, t }) => {
  const changeUiStyle = (prop, value) => {
    onChange("ui_style", {
      ...uiStyle,
      [prop]: value
    });
  };

  const changeIndividualUiStyle = (prop, value, index) => {
    const { responsecontainerindividuals } = uiStyle;
    const item = {};
    Object.defineProperties(item, {
      widthpx: {
        value: responsecontainerindividuals[index].widthpx,
        writable: true
      },
      heightpx: {
        value: responsecontainerindividuals[index].heightpx,
        writable: true
      },
      placeholder: {
        value: responsecontainerindividuals[index].placeholder,
        writable: true
      }
    });
    item[prop] = value;
    responsecontainerindividuals[index] = item;
    onChange("ui_style", {
      ...uiStyle,
      responsecontainerindividuals
    });
  };

  const removeIndividual = index => {
    const { responsecontainerindividuals } = uiStyle;
    responsecontainerindividuals.splice(index, 1);
    onChange("ui_style", {
      ...uiStyle,
      responsecontainerindividuals
    });
  };

  const addNewResponseContainer = () => {
    const { responsecontainerindividuals } = uiStyle;
    responsecontainerindividuals.push({
      widthpx: 0,
      heightpx: 0,
      placeholder: ""
    });
    onChange("ui_style", {
      ...uiStyle,
      responsecontainerindividuals
    });
  };

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

  const inputtypeOptions = [
    { value: "text", label: t("component.options.text") },
    { value: "number", label: t("component.options.number") }
  ];

  const pointerOptions = [
    { value: "right", label: t("component.options.right") },
    { value: "left", label: t("component.options.left") },
    { value: "top", label: t("component.options.top") },
    { value: "bottom", label: t("component.options.bottom") }
  ];

  return (
    <React.Fragment>
      <MarginRow>
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
      </MarginRow>
      <MarginRow>
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
      </MarginRow>
      <MarginRow>
        <Col md={12}>
          <Label>{t("component.options.inputtype")}</Label>
          <OptionSelect
            size="large"
            onChange={inputtype => changeUiStyle("inputtype", inputtype)}
            value={uiStyle.inputtype}
          >
            {inputtypeOptions.map(({ value: val, label }) => (
              <Select.Option key={val} value={val}>
                {label}
              </Select.Option>
            ))}
          </OptionSelect>
        </Col>
        <Col md={12}>
          <Label>{t("component.options.placeholder")}</Label>
          <Input
            disabled={false}
            size="large"
            style={{ width: "80%" }}
            onChange={e => changeUiStyle("placeholder", e.target.value)}
            value={uiStyle.placeholder}
          />
        </Col>
      </MarginRow>
      <MarginRow>
        <Col md={12}>
          <Label>{t("component.options.widthpx")}</Label>
          <Input
            type="number"
            style={{ width: "80%" }}
            size="large"
            disabled={false}
            onChange={e => changeUiStyle("widthpx", e.target.value)}
            value={uiStyle.widthpx}
          />
        </Col>
        <Col md={12}>
          <Label>{t("component.options.heightpx")}</Label>
          <Input
            type="number"
            style={{ width: "80%" }}
            size="large"
            disabled={false}
            onChange={e => changeUiStyle("heightpx", e.target.value)}
            value={uiStyle.heightpx}
          />
        </Col>
      </MarginRow>
      <MarginRow>
        <Col md={6}>
          <Label>{t("component.options.pointers")}</Label>
          <OptionSelect
            size="large"
            onChange={inputtype => changeUiStyle("pointers", inputtype)}
            value={uiStyle.pointers}
          >
            {pointerOptions.map(({ value: val, label }) => (
              <Select.Option key={val} value={val}>
                {label}
              </Select.Option>
            ))}
          </OptionSelect>
        </Col>
      </MarginRow>
      {uiStyle.responsecontainerindividuals.map((responsecontainerindividual, index) => (
        <Container key={index}>
          <MarginRow>
            <Col md={12}>
              <Label>{`${t("component.options.responsecontainerindividual")} ${index + 1}`}</Label>
            </Col>
            <Col md={12}>
              <Delete onClick={() => removeIndividual(index)}>X</Delete>
            </Col>
          </MarginRow>
          <MarginRow>
            <Col md={12}>
              <Label>{t("component.options.widthpx")}</Label>
              <Input
                type="number"
                size="large"
                style={{ width: "80%" }}
                disabled={false}
                containerStyle={{ width: 350 }}
                onChange={e => changeIndividualUiStyle("widthpx", +e.target.value, index)}
                value={responsecontainerindividual.widthpx}
              />
            </Col>
            <Col md={12}>
              <Label>{t("component.options.heightpx")}</Label>
              <Input
                type="number"
                size="large"
                style={{ width: "80%" }}
                disabled={false}
                containerStyle={{ width: 350 }}
                onChange={e => changeIndividualUiStyle("heightpx", +e.target.value, index)}
                value={responsecontainerindividual.heightpx}
              />
            </Col>
          </MarginRow>
          <MarginRow>
            <Col md={12}>
              <Label>{t("component.options.placeholder")}</Label>
              <Input
                size="large"
                style={{ width: "80%" }}
                disabled={false}
                containerStyle={{ width: 350 }}
                onChange={e => changeIndividualUiStyle("placeholder", e.target.value, index)}
                value={uiStyle.placeholder}
              />
            </Col>
          </MarginRow>
        </Container>
      ))}
      <MarginRow>
        <Col md={6}>
          <Label>{t("component.options.responsecontainerindividual")}</Label>
          <AddNewChoiceBtn onClick={() => addNewResponseContainer()}>
            {t("component.options.addnewresponsecontainer")}
          </AddNewChoiceBtn>
        </Col>
      </MarginRow>
    </React.Fragment>
  );
};

Layout.propTypes = {
  questionData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  uiStyle: PropTypes.object,
  t: PropTypes.func.isRequired
};

Layout.defaultProps = {
  uiStyle: {
    responsecontainerposition: "bottom",
    fontsize: "normal",
    stemnumeration: "",
    widthpx: 0,
    heightpx: 0,
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

const MarginRow = styled(Row)`
  margin-bottom: 30px;
`;
