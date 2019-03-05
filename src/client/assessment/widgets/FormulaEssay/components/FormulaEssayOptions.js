import React from "react";
import PropTypes from "prop-types";
import { Select, Input, Col, Checkbox } from "antd";

import { withNamespaces } from "@edulastic/localization";
import { math } from "@edulastic/constants";

import { Block } from "../../../styled/WidgetOptions/Block";
import { Heading } from "../../../styled/WidgetOptions/Heading";
import { Label } from "../../../styled/WidgetOptions/Label";
import FontSizeSelect from "../../../components/FontSizeSelect";
import KeyPadOptions from "../../../components/KeyPadOptions";
import TypedList from "../../../components/TypedList";
import Extras from "../../../containers/Extras";
import WidgetOptions from "../../../containers/WidgetOptions";

import { StyledRow } from "../styled/StyledRow";

const FormulaEssayOptions = ({ onChange, item, t }) => {
  const changeUiStyle = (prop, value) => {
    onChange("ui_style", {
      ...item.ui_style,
      [prop]: value
    });
  };

  /**
  |--------------------------------------------------
  | Blocks
  |--------------------------------------------------
  */

  const handleAddBlock = () => {
    let textBlocks = [];

    if (item.text_blocks && item.text_blocks.length) {
      textBlocks = [...item.text_blocks];
    }
    onChange("text_blocks", [...textBlocks, ""]);
  };

  const handleDeleteBlock = index => {
    const textBlocks = [...item.text_blocks];
    textBlocks.splice(index, 1);
    onChange("text_blocks", textBlocks);
  };

  const handleBlockChange = (index, value) => {
    const textBlocks = [...item.text_blocks];
    textBlocks[index] = value;
    onChange("text_blocks", textBlocks);
  };

  return (
    <WidgetOptions showScoring={false}>
      <Block>
        <Heading>{t("component.options.scoring")}</Heading>

        <StyledRow gutter={36}>
          <Col span={12}>
            <Label>{t("component.options.maxScore")}</Label>
            <Input
              size="large"
              type="number"
              style={{ width: "30%" }}
              onChange={e =>
                onChange("validation", {
                  ...item.validation,
                  max_score: +e.target.value
                })
              }
            />
          </Col>
          <Col span={12}>
            <Label>{t("component.options.browserspellcheck")}</Label>
            <Checkbox checked={item.spellcheck} size="large" onChange={e => onChange("spellcheck", e.target.checked)}>
              Browser spellcheck
            </Checkbox>
          </Col>
        </StyledRow>
      </Block>

      <Block>
        <Heading>{t("component.options.layout")}</Heading>

        <StyledRow gutter={36}>
          <Col span={12}>
            <Label>{t("component.options.templateFontScale")}</Label>
            <Select
              size="large"
              value={item.ui_style.response_font_scale}
              style={{ width: "100%" }}
              onChange={val => changeUiStyle("response_font_scale", val)}
            >
              {math.templateFontScaleOption.map(({ value: val, label }) => (
                <Select.Option key={val} value={val}>
                  {label}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col span={12}>
            <FontSizeSelect onChange={val => changeUiStyle("fontsize", val)} value={item.ui_style.fontsize} />
          </Col>
        </StyledRow>
      </Block>

      <KeyPadOptions onChange={onChange} item={item} />

      <Block>
        <Heading>{t("component.options.textBlocks")}</Heading>

        <StyledRow gutter={36}>
          <Col span={24}>
            <TypedList
              columns={2}
              buttonText="Add"
              onAdd={handleAddBlock}
              items={item.text_blocks}
              onRemove={handleDeleteBlock}
              onChange={handleBlockChange}
            />
          </Col>
        </StyledRow>
      </Block>

      <Extras />
    </WidgetOptions>
  );
};

FormulaEssayOptions.propTypes = {
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

export default withNamespaces("assessment")(FormulaEssayOptions);
