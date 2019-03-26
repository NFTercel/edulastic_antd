import React from "react";
import PropTypes from "prop-types";
import { Select, Col, Input, Checkbox } from "antd";
import { compose } from "redux";
import { withTheme } from "styled-components";

import { withNamespaces } from "@edulastic/localization";
import { CustomQuillComponent } from "@edulastic/common";
import { evaluationType } from "@edulastic/constants";

import WidgetOptions from "../../../containers/WidgetOptions";
import { Block } from "../../../styled/WidgetOptions/Block";
import { Heading } from "../../../styled/WidgetOptions/Heading";
import { Label } from "../../../styled/WidgetOptions/Label";
import FontSizeSelect from "../../../components/FontSizeSelect";
import Extras from "../../../containers/Extras";
import { Row } from "../../../styled/WidgetOptions/Row";

const scoringTypes = [evaluationType.exactMatch, evaluationType.partialMatch, evaluationType.partialMatchV2];

function Options({ onChange, uiStyle, t, theme }) {
  const inputStyle = {
    minHeight: 35,
    border: `1px solid ${theme.widgets.matrixChoice.quillBorderColor}`,
    padding: "5px 15px"
  };

  const changeUiStyle = (prop, value) => {
    console.log(prop, value);
    onChange("ui_style", {
      ...uiStyle,
      [prop]: value
    });
  };

  const styleOptions = [
    { value: "inline", label: t("component.options.inline") },
    { value: "table", label: t("component.options.table") }
  ];
  const stemNumerationOptions = [
    { value: "number", label: t("component.options.numerical") },
    { value: "upper-alpha", label: t("component.options.uppercase") },
    { value: "lower-alpha", label: t("component.options.lowercase") }
  ];

  return (
    <WidgetOptions scoringTypes={scoringTypes}>
      <Block>
        <Heading>{t("component.options.layout")}</Heading>

        <Row gutter={36}>
          <Col md={12}>
            <Label>{t("component.matrix.matrixStyle")}</Label>
            <Select
              size="large"
              style={{ width: "100%" }}
              onChange={val => changeUiStyle("type", val)}
              value={uiStyle.type}
              data-cy="matrixStyle"
            >
              {styleOptions.map(option => (
                <Select.Option data-cy={option.value} key={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Col>
          {uiStyle.type === "table" && (
            <Col md={12}>
              <Label>{t("component.options.stemNumeration")}</Label>
              <Select
                size="large"
                style={{ width: "100%" }}
                onChange={val => changeUiStyle("stem_numeration", val)}
                value={uiStyle.stem_numeration}
                data-cy="stemNum"
              >
                {stemNumerationOptions.map(option => (
                  <Select.Option data-cy={option.value} key={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          )}
        </Row>

        <Row gutter={36}>
          <Col md={12}>
            <Label data-cy="stemColumnTitle">{t("component.options.stemColumnTitle")}</Label>
            <CustomQuillComponent
              toolbarId="stemColumnTitle"
              style={inputStyle}
              onChange={value => changeUiStyle("stem_title", value)}
              showResponseBtn={false}
              value={uiStyle.stem_title || ""}
            />
          </Col>
          <Col md={12}>
            <Label data-cy="optionRowTitle">{t("component.options.optionRowTitle")}</Label>
            <CustomQuillComponent
              toolbarId="optionRowTitle"
              style={inputStyle}
              onChange={value => changeUiStyle("option_row_title", value)}
              showResponseBtn={false}
              value={uiStyle.option_row_title || ""}
            />
          </Col>
        </Row>

        <Row gutter={36}>
          <Col md={12}>
            <Label>{t("component.options.stemWidth")}</Label>
            <Input
              data-cy="stemWidth"
              size="large"
              type="number"
              onChange={e => changeUiStyle("stem_width", +e.target.value)}
              showResponseBtn={false}
              value={uiStyle.stem_width}
            />
          </Col>
          <Col md={12}>
            <Label>{t("component.options.optionWidth")}</Label>
            <Input
              data-cy="optionWidth"
              size="large"
              type="number"
              onChange={e => changeUiStyle("option_width", +e.target.value)}
              showResponseBtn={false}
              value={uiStyle.option_width}
            />
          </Col>
        </Row>

        <Row gutter={36}>
          <Col md={12}>
            <FontSizeSelect onChange={val => changeUiStyle("fontsize", val)} value={uiStyle.fontsize} />
          </Col>
          <Col md={12}>
            <Checkbox
              data-cy="dividersCheckbox"
              size="large"
              checked={uiStyle.horizontal_lines}
              onChange={e => changeUiStyle("horizontal_lines", e.target.checked)}
            >
              {t("component.options.dividers")}
            </Checkbox>
          </Col>
        </Row>

        <Extras>
          <Extras.Distractors />
          <Extras.Hints />
        </Extras>
      </Block>
    </WidgetOptions>
  );
}

Options.propTypes = {
  onChange: PropTypes.func.isRequired,
  uiStyle: PropTypes.object,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
};

Options.defaultProps = {
  uiStyle: {
    type: "standard",
    fontsize: "normal",
    columns: 0,
    orientation: "horizontal",
    choice_label: "number"
  }
};

const enhance = compose(
  withNamespaces("assessment"),
  withTheme
);

export default enhance(Options);
