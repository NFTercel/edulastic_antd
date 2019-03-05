import React from "react";
import PropTypes from "prop-types";

import { Select, TextField } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import WidgetOptions from "../../../containers/WidgetOptions";
import { Block } from "../../../styled/WidgetOptions/Block";
import { Heading } from "../../../styled/WidgetOptions/Heading";
import { Row } from "../../../styled/WidgetOptions/Row";
import { Col } from "../../../styled/WidgetOptions/Col";
import { Label } from "../../../styled/WidgetOptions/Label";
import OrientationSelect from "../../../components/OrientationSelect";
import FontSizeSelect from "../../../components/FontSizeSelect";
import Extras from "../../../containers/Extras";

function Options({ onChange, uiStyle, t }) {
  const changeUiStyle = (prop, value) => {
    onChange("ui_style", {
      ...uiStyle,
      [prop]: value
    });
  };

  return (
    <WidgetOptions>
      <Block>
        <Heading>{t("component.options.layout")}</Heading>

        <Row>
          <Col md={6}>
            <Label>{t("component.options.style")}</Label>
            <Select
              id="select"
              style={{ width: "80%" }}
              onChange={val => changeUiStyle("type", val)}
              options={[
                { value: "standard", label: t("component.options.standard") },
                { value: "block", label: t("component.options.block") },
                {
                  value: "radioBelow",
                  label: t("component.options.radioButtonBelow")
                }
              ]}
              value={uiStyle.type}
            />
          </Col>
          <Col md={6}>
            <Label>{t("component.options.columns")}</Label>
            <TextField
              type="number"
              data-cy="columns"
              disabled={false}
              containerStyle={{ width: 120 }}
              onChange={e => changeUiStyle("columns", +e.target.value)}
              value={uiStyle.columns}
            />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <OrientationSelect onChange={val => changeUiStyle("orientation", val)} value={uiStyle.orientation} />
          </Col>
          <Col md={6}>
            <FontSizeSelect onChange={fontsize => changeUiStyle("fontsize", fontsize)} value={uiStyle.fontsize} />
          </Col>
        </Row>

        {uiStyle.type === "block" && (
          <Row>
            <Col md={6}>
              <Label>{t("component.options.labelType")}</Label>
              <Select
                style={{ width: "80%" }}
                onChange={val => changeUiStyle("choice_label", val)}
                options={[
                  { value: "number", label: t("component.options.numerical") },
                  {
                    value: "upper-alpha",
                    label: t("component.options.uppercase")
                  },
                  {
                    value: "lower-alpha",
                    label: t("component.options.lowercase")
                  }
                ]}
                value={uiStyle.choice_label}
              />
            </Col>
          </Row>
        )}
      </Block>
      <Extras>
        <Extras.Distractors />
        <Extras.Hints />
      </Extras>
    </WidgetOptions>
  );
}

Options.propTypes = {
  onChange: PropTypes.func.isRequired,
  uiStyle: PropTypes.object,
  t: PropTypes.func.isRequired
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

export default withNamespaces("assessment")(Options);
