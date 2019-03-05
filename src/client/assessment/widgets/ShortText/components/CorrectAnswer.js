import React from "react";
import PropTypes from "prop-types";
import { Input, Select, Row, Col } from "antd";
import { compose } from "redux";
import { withTheme } from "styled-components";

import { withNamespaces } from "@edulastic/localization";

import { Subtitle } from "../../../styled/Subtitle";

const CorrectAnswer = ({ t, onSelectChange, onChange, options, selectValue, inputValue, theme }) => (
  <Row>
    <Col span={12}>
      <Subtitle
        fontSize={theme.widgets.shortText.subtitleFontSize}
        color={theme.widgets.shortText.subtitleColor}
        padding="0 0 16px 0"
      >
        {t("component.shortText.selectLabel")}
      </Subtitle>
      <Select size="large" style={{ width: "100%" }} value={selectValue} onChange={onSelectChange}>
        {options.map((item, i) => (
          <Select.Option key={i} value={item.value}>
            {item.label}
          </Select.Option>
        ))}
      </Select>

      <Subtitle
        fontSize={theme.widgets.shortText.subtitleFontSize}
        color={theme.widgets.shortText.subtitleColor}
        padding="20px 0 16px 0"
      >
        {t("component.shortText.inputLabel")}
      </Subtitle>
      <Input size="large" value={inputValue} onChange={e => onChange(e.target.value)} />
    </Col>
  </Row>
);

CorrectAnswer.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSelectChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  selectValue: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
};

const enhance = compose(
  withNamespaces("assessment"),
  withTheme
);

export default enhance(CorrectAnswer);
