import React from "react";
import PropTypes from "prop-types";
import { Select, Row, Col } from "antd";

import { EduButton, FlexContainer } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import { Label } from "../../../styled/WidgetOptions/Label";

import { IconTrash } from "../styled/IconTrash";

const ThousandsSeparators = ({ separators, onChange, onAdd, onDelete, t }) => {
  const thousandsSeparators = [
    { value: ",", label: t("component.math.comma") },
    { value: ".", label: t("component.math.dot") },
    { value: " ", label: t("component.math.space") }
  ];

  return (
    <Col span={12}>
      <Label>{t("component.math.thousandsSeparator")}</Label>
      {separators &&
        !!separators.length &&
        separators.map((separator, i) => (
          <Row key={i} style={{ marginBottom: 15 }}>
            <Col span={24}>
              <FlexContainer>
                <Select
                  size="large"
                  value={separator}
                  style={{ width: "100%" }}
                  onChange={val => onChange({ val, index: i })}
                >
                  {thousandsSeparators.map(({ value: val, label }) => (
                    <Select.Option key={val} value={val}>
                      {label}
                    </Select.Option>
                  ))}
                </Select>
                {onDelete && <IconTrash onClick={() => onDelete(i)} width={22} height={22} />}
              </FlexContainer>
            </Col>
          </Row>
        ))}
      <EduButton onClick={onAdd} size="small" type="primary">
        {t("component.math.add")}
      </EduButton>
    </Col>
  );
};

ThousandsSeparators.propTypes = {
  separators: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

ThousandsSeparators.defaultProps = {
  separators: []
};

export default withNamespaces("assessment")(ThousandsSeparators);
