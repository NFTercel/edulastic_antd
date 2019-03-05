import React from "react";
import PropTypes from "prop-types";

import { Select } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";
import { evaluationType } from "@edulastic/constants";

import WidgetOptions from "../../../containers/WidgetOptions";
import { Block } from "../../../styled/WidgetOptions/Block";
import { Row } from "../../../styled/WidgetOptions/Row";
import { Col } from "../../../styled/WidgetOptions/Col";
import { Label } from "../../../styled/WidgetOptions/Label";
import { Heading } from "../../../styled/WidgetOptions/Heading";
import Extras from "../../../containers/Extras";

const scoringTypes = [evaluationType.exactMatch, evaluationType.partialMatch, evaluationType.partialMatchV2];

const Options = ({ onChange, uiStyle, t, outerStyle }) => {
  const changeUiStyle = (prop, value) => {
    onChange("ui_style", {
      ...uiStyle,
      [prop]: value
    });
  };

  return (
    <WidgetOptions outerStyle={outerStyle} scoringTypes={scoringTypes}>
      <Block>
        <Heading>{t("component.options.layout")}</Heading>
        <Row>
          <Col md={6}>
            <Label>{t("component.options.responsecontainerposition")}</Label>
            <Select
              style={{ width: "80%" }}
              onChange={val => changeUiStyle("responsecontainerposition", val)}
              options={[
                { value: "top", label: t("component.options.top") },
                { value: "bottom", label: t("component.options.bottom") },
                { value: "right", label: t("component.options.right") },
                { value: "left", label: t("component.options.left") }
              ]}
              value={uiStyle.responsecontainerposition}
            />
          </Col>
          <Col md={6}>
            <Label>{t("component.options.stemNumerationReviewOnly")}</Label>
            <Select
              style={{ width: "80%" }}
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
          <Col md={6}>
            <Label>{t("component.options.fontSize")}</Label>
            <Select
              style={{ width: "80%" }}
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
  outerStyle: PropTypes.object
};

Options.defaultProps = {
  outerStyle: {},
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

export default React.memo(withNamespaces("assessment")(Options));
