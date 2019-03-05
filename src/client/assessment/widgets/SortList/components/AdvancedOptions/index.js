import React, { useState } from "react";
import PropTypes from "prop-types";

import { withNamespaces } from "@edulastic/localization";

import { Row, Col } from "antd";
import WidgetOptions from "../../../../containers/WidgetOptions";
import FontSizeSelect from "../../../../components/FontSizeSelect";
import OrientationSelect from "../../../../components/OrientationSelect";
import { Subtitle } from "../../../../styled/Subtitle";

import { Hr } from "./styled/Hr";
import Extras from "../../../../containers/Extras";

const AdvancedOptions = ({ t, onUiChange }) => {
  const [fontsize, setFontsize] = useState("normal");
  const [orientation, setOrientation] = useState("horizontal");

  return (
    <WidgetOptions outerStyle={{ marginTop: 40 }} title={t("common.options.title")}>
      <Hr />
      <Subtitle style={{ padding: 0, marginBottom: 21 }}>{t("component.options.layout")}</Subtitle>
      <Row style={{ marginBottom: 40 }} gutter={70}>
        <Col md={12}>
          <FontSizeSelect
            data-cy="fontSize"
            value={fontsize}
            onChange={val => {
              onUiChange("fontsize", val);
              setFontsize(val);
            }}
          />
        </Col>
        <Col md={12}>
          <OrientationSelect
            data-cy="orientation"
            value={orientation}
            onChange={val => {
              onUiChange("orientation", val);
              setOrientation(val);
            }}
          />
        </Col>
      </Row>
      <Extras>
        <Extras.Distractors />
        <Extras.Hints />
      </Extras>
    </WidgetOptions>
  );
};

AdvancedOptions.propTypes = {
  t: PropTypes.func.isRequired,
  onUiChange: PropTypes.func.isRequired
};

export default withNamespaces("assessment")(AdvancedOptions);
