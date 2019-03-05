import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Input } from "antd";

import { withNamespaces } from "@edulastic/localization";
import { EduButton, FlexContainer } from "@edulastic/common";

import { Block } from "../../../styled/WidgetOptions/Block";
import { Heading } from "../../../styled/WidgetOptions/Heading";
import { Row } from "../../../styled/WidgetOptions/Row";
import { Col } from "../../../styled/WidgetOptions/Col";
import { Label } from "../../../styled/WidgetOptions/Label";

import { IconTrash } from "../styled/IconTrash";

const ResponseContainers = ({ containers, onChange, onAdd, onDelete, t }) => (
  <Block>
    <Heading>{t("component.options.responseContainer")}</Heading>

    {containers.map(({ width = 0, height = 0 }, index) => (
      <Fragment>
        <Row>
          <Col md={12}>
            <FlexContainer justifyContent="space-between">
              <Label>
                {t("component.options.responseContainer")} {index + 1}
              </Label>
              <IconTrash onClick={() => onDelete(index)} />
            </FlexContainer>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Label>{t("component.options.widthpx")}</Label>
            <Input
              type="number"
              size="large"
              style={{ width: "80%" }}
              value={width}
              onChange={e => onChange({ index, prop: "width", value: +e.target.value })}
            />
          </Col>
          <Col md={6}>
            <Label>{t("component.options.heightpx")}</Label>
            <Input
              type="number"
              size="large"
              style={{ width: "80%" }}
              value={height}
              onChange={e => onChange({ index, prop: "height", value: +e.target.value })}
            />
          </Col>
        </Row>
      </Fragment>
    ))}

    <EduButton onClick={onAdd} type="primary">
      {t("component.options.addResponseContainer")}
    </EduButton>
  </Block>
);

ResponseContainers.propTypes = {
  containers: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default withNamespaces("assessment")(ResponseContainers);
