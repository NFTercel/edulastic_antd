import React from "react";
import PropTypes from "prop-types";
import { Input, Row, Col } from "antd";

import { withNamespaces } from "@edulastic/localization";
import { EduButton, FlexContainer } from "@edulastic/common";

import { Block } from "../../../styled/WidgetOptions/Block";
import { Heading } from "../../../styled/WidgetOptions/Heading";

import { IconTrash } from "../styled/IconTrash";

const TextBlocks = ({ blocks, onChange, onAdd, onDelete, t }) => (
  <Block>
    <Heading>{t("component.options.textBlocks")}</Heading>

    <Row gutter={32}>
      {blocks.map((block, index) => (
        <Col style={{ marginBottom: 15 }} span={12}>
          <FlexContainer>
            <Input
              style={{ width: "100%" }}
              size="large"
              value={block}
              onChange={e => onChange({ index, value: e.target.value })}
            />
            <IconTrash onClick={() => onDelete(index)} />
          </FlexContainer>
        </Col>
      ))}
    </Row>

    <EduButton onClick={onAdd} type="primary">
      {t("component.options.addTextBlock")}
    </EduButton>
  </Block>
);

TextBlocks.propTypes = {
  blocks: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default withNamespaces("assessment")(TextBlocks);
