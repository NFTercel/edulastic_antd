import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import { withNamespaces } from "@edulastic/localization";
import { get } from "lodash";

import WidgetOptions from "../../../../containers/WidgetOptions";
import FontSizeSelect from "../../../../containers/WidgetOptions/components/FontSize";
import OrientationSelect from "../../../../components/OrientationSelect";

import { Hr } from "./styled/Hr";
import Extras from "../../../../containers/Extras";
import { Layout } from "../../../../containers/WidgetOptions/components";

const AdvancedOptions = ({ t, onUiChange, item }) => {
  const fontsize = get(item, "ui_style.fontsize");
  const orientation = get(item, "ui_style.orientation");

  return (
    <WidgetOptions outerStyle={{ marginTop: 40 }} title={t("common.options.title")}>
      <Hr />
      <Layout>
        <Row style={{ marginBottom: 40 }} gutter={70}>
          <Col md={12}>
            <FontSizeSelect
              value={fontsize}
              onChange={val => {
                onUiChange("fontsize", val);
              }}
            />
          </Col>
          <Col md={12}>
            <OrientationSelect
              data-cy="orientation"
              value={orientation}
              onChange={val => {
                onUiChange("orientation", val);
              }}
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

AdvancedOptions.propTypes = {
  t: PropTypes.func.isRequired,
  onUiChange: PropTypes.func.isRequired,
  item: PropTypes.func.isRequired
};

export default withNamespaces("assessment")(AdvancedOptions);
