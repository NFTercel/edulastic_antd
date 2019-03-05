import React from "react";
import PropTypes from "prop-types";

import { Select, TextField } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";
import { Checkbox } from "antd";

import WidgetOptions from "../../../../containers/WidgetOptions";
import { Block } from "../../../../styled/WidgetOptions/Block";
import { Heading } from "../../../../styled/WidgetOptions/Heading";
import { Row } from "../../../../styled/WidgetOptions/Row";
import { Col } from "../../../../styled/WidgetOptions/Col";
import { Label } from "../../../../styled/WidgetOptions/Label";
import { AddNewChoiceBtn } from "../../../../styled/AddNewChoiceBtn";
import Extras from "../../../../containers/Extras";

import { Container } from "./styled/Container";
import { Delete } from "./styled/Delete";
import SpecialCharacters from "../../../../containers/WidgetOptions/components/SpecialCharacters";

const Options = ({ onChange, uiStyle, multipleLine, t, outerStyle }) => {
  const changeUiStyle = (prop, value) => {
    onChange("ui_style", {
      ...uiStyle,
      [prop]: value
    });
  };

  const changeIndividualUiStyle = (prop, value, index) => {
    const { responsecontainerindividuals: styleArr } = uiStyle;
    if (styleArr[index] === undefined) styleArr[index] = {};
    styleArr[index][prop] = value;
    onChange("ui_style", {
      ...uiStyle,
      responsecontainerindividuals: styleArr
    });
  };

  const addIndividual = () => {
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

  const removeIndividual = index => {
    const { responsecontainerindividuals } = uiStyle;
    responsecontainerindividuals.splice(index, 1);
    onChange("ui_style", {
      ...uiStyle,
      responsecontainerindividuals
    });
  };

  return (
    <WidgetOptions outerStyle={outerStyle}>
      <Block>
        <Heading>{t("component.options.layout")}</Heading>
        <Row gutter={36}>
          <Col md={12}>
            <Label>{t("component.options.stemNumerationReviewOnly")}</Label>
            <Select
              onChange={val => changeUiStyle("stemnumeration", val)}
              options={[
                { value: "numerical", label: t("component.options.numerical") },
                {
                  value: "uppercase",
                  label: t("component.options.uppercasealphabet")
                },
                {
                  value: "lowercase",
                  label: t("component.options.lowercasealphabet")
                }
              ]}
              value={uiStyle.stemnumeration}
            />
          </Col>
          <Col md={12}>
            <Label>{t("component.options.fontSize")}</Label>
            <Select
              onChange={fontsize => changeUiStyle("fontsize", fontsize)}
              options={[
                { value: "small", label: t("component.options.small") },
                { value: "normal", label: t("component.options.normal") },
                { value: "large", label: t("component.options.large") },
                { value: "xlarge", label: t("component.options.extraLarge") },
                { value: "xxlarge", label: t("component.options.huge") }
              ]}
              value={uiStyle.fontsize}
            />
          </Col>
        </Row>
        <SpecialCharacters />
        <Row gutter={36}>
          <Col md={24}>
            <Label>{t("component.options.responsecontainerglobal")}</Label>
          </Col>
        </Row>
        <Row gutter={36}>
          <Col md={24}>
            <Checkbox checked={!!multipleLine} onChange={e => onChange("multiple_line", e.target.checked)}>
              {t("component.options.multiline")}
            </Checkbox>
          </Col>
        </Row>
        <Row gutter={36}>
          <Col md={12}>
            <Label>{t("component.options.widthpx")}</Label>
            <TextField
              type="number"
              disabled={false}
              containerStyle={{ width: 350 }}
              onChange={e => changeUiStyle("widthpx", +e.target.value)}
              value={uiStyle.widthpx}
            />
          </Col>
          <Col md={12}>
            <Label>{t("component.options.heightpx")}</Label>
            <TextField
              type="number"
              disabled={false}
              containerStyle={{ width: 350 }}
              onChange={e => changeUiStyle("heightpx", +e.target.value)}
              value={uiStyle.heightpx}
            />
          </Col>
        </Row>
        <Row gutter={36}>
          <Col md={12}>
            <Label>{t("component.options.inputtype")}</Label>
            <Select
              onChange={inputtype => changeUiStyle("inputtype", inputtype)}
              options={[
                { value: "text", label: t("component.options.text") },
                { value: "number", label: t("component.options.number") }
              ]}
              value={uiStyle.inputtype}
            />
          </Col>
          <Col md={12}>
            <Label>{t("component.options.placeholder")}</Label>
            <TextField
              disabled={false}
              containerStyle={{ width: 350 }}
              onChange={e => changeUiStyle("placeholder", e.target.value)}
              value={uiStyle.placeholder}
            />
          </Col>
        </Row>
        <Row gutter={36}>
          <Col md={24}>
            <Label>{t("component.options.responsecontainerindividuals")}</Label>
          </Col>
        </Row>
        {uiStyle.responsecontainerindividuals.map((responsecontainerindividual, index) => (
          <Container key={index}>
            <Delete onClick={() => removeIndividual(index)}>X</Delete>
            <div>
              <Col md={24}>
                <Label>{`${t("component.options.responsecontainerindividual")} ${index + 1}`}</Label>
              </Col>
            </div>
            <Row gutter={36}>
              <Col md={12}>
                <Label>{t("component.options.widthpx")}</Label>
                <TextField
                  type="number"
                  disabled={false}
                  containerStyle={{ width: 350 }}
                  onChange={e => changeIndividualUiStyle("widthpx", +e.target.value, index)}
                  value={responsecontainerindividual.widthpx}
                />
              </Col>
              <Col md={12}>
                <Label>{t("component.options.heightpx")}</Label>
                <TextField
                  type="number"
                  disabled={false}
                  containerStyle={{ width: 350 }}
                  onChange={e => changeIndividualUiStyle("heightpx", +e.target.value, index)}
                  value={responsecontainerindividual.heightpx}
                />
              </Col>
            </Row>
            <Row gutter={36}>
              <Col md={12}>
                <Label>{t("component.options.inputtype")}</Label>
                <Select
                  onChange={inputtype => changeIndividualUiStyle("inputtype", inputtype, index)}
                  options={[
                    { value: "text", label: t("component.options.text") },
                    { value: "number", label: t("component.options.number") }
                  ]}
                  value={responsecontainerindividual.inputtype}
                />
              </Col>
              <Col md={12}>
                <Label>{t("component.options.placeholder")}</Label>
                <TextField
                  disabled={false}
                  containerStyle={{ width: 350 }}
                  onChange={e => changeIndividualUiStyle("placeholder", e.target.value, index)}
                  value={responsecontainerindividual.placeholder}
                />
              </Col>
            </Row>
          </Container>
        ))}
        <Row gutter={36}>
          <Col md={24}>
            <AddNewChoiceBtn onClick={() => addIndividual()}>{t("component.options.add")}</AddNewChoiceBtn>
          </Col>
        </Row>
      </Block>
      <Extras>
        <Extras.Distractors />
        <Extras.Hints />
      </Extras>
    </WidgetOptions>
  );
};

Options.propTypes = {
  onChange: PropTypes.func.isRequired,
  uiStyle: PropTypes.object,
  t: PropTypes.func.isRequired,
  outerStyle: PropTypes.object,
  multipleLine: PropTypes.bool
};

Options.defaultProps = {
  outerStyle: {},
  uiStyle: {
    responsecontainerposition: "bottom",
    fontsize: "normal",
    stemnumeration: "",
    widthpx: 0,
    heightpx: 0,
    placeholder: "",
    responsecontainerindividuals: []
  },
  multipleLine: false
};

export default React.memo(withNamespaces("assessment")(Options));
