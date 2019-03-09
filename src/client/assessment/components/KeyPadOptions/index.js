import React from "react";
import PropTypes from "prop-types";
import { Col, Select, Input, Checkbox } from "antd";

import { typedList as types, math } from '@edulastic/constants';
import { MathKeyboard } from '@edulastic/common';
import { withNamespaces } from '@edulastic/localization';

import { Block } from "../../styled/WidgetOptions/Block";
import { Heading } from "../../styled/WidgetOptions/Heading";
import { Label } from "../../styled/WidgetOptions/Label";

import TypedList from '../TypedList';
import NumberPad from '../NumberPad';

import { StyledRow } from "./styled/StyledRow";

const KeyPadOptions = ({ t, onChange, item }) => {
  const changeUiStyle = (prop, value) => {
    onChange("ui_style", {
      ...item.ui_style,
      [prop]: value
    });
  };

  const handleAddSymbol = () => {
    let data = [];

    if (item.symbols && item.symbols.length) {
      data = [...item.symbols];
    }
    onChange("symbols", [...data, ""]);
  };

  const handleDeleteSymbol = index => {
    const data = [...item.symbols];
    data.splice(index, 1);
    onChange("symbols", data);
  };

  const handleSymbolsChange = (index, value) => {
    const data = [...item.symbols];

    if (value === "custom") {
      data[index] = {
        label: "label",
        title: "",
        value: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
      };
    } else {
      data[index] = value;
    }

    onChange("symbols", data);
  };

  const handleChangeNumberPad = (index, value) => {
    const numberPad = item.numberPad ? [...item.numberPad] : [];

    numberPad[index] = value;
    onChange("numberPad", numberPad);
  };

  const getNumberPad = () => {
    if (!item.numberPad || !item.numberPad.length) {
      onChange('numberPad', MathKeyboard.NUMBER_PAD_ITEMS.map(({ value }) => value));
      return MathKeyboard.NUMBER_PAD_ITEMS;
    }
    return item.numberPad.map((num) => {
      const res = MathKeyboard.NUMBER_PAD_ITEMS.find(({ value }) => num === value);

      return res || { value: "", label: t("component.options.empty") };
    });
  };

  return (
    <Block>
      <Heading>{t("component.options.keypad")}</Heading>

      <StyledRow gutter={36}>
        <Col span={12}>
          <Checkbox checked={item.showHints} size="large" onChange={e => onChange("showHints", e.target.checked)}>
            {t("component.options.showKeypadHints")}
          </Checkbox>
        </Col>
      </StyledRow>

      <StyledRow gutter={36}>
        <Col span={12}>
          <Label>{t("component.options.maximumLines")}</Label>
          <Input
            size="large"
            type="number"
            value={item.ui_style.max_lines}
            onChange={e => changeUiStyle("max_lines", +e.target.value)}
          />
        </Col>
        <Col span={12}>
          <Label>{t("component.options.defaultMode")}</Label>
          <Select
            size="large"
            value={item.ui_style.default_mode}
            style={{ width: "100%" }}
            onChange={val => changeUiStyle("default_mode", val)}
          >
            {math.modes.map(({ value: val, label }) => (
              <Select.Option key={val} value={val}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </StyledRow>

      <StyledRow gutter={36}>
        <Col span={12}>
          <Label>{t("component.options.numberPad")}</Label>
          <NumberPad onChange={handleChangeNumberPad} items={getNumberPad()} />
        </Col>
        <Col span={12}>
          <Label>{t("component.options.symbols")}</Label>
          <TypedList
            type={types.SELECT}
            selectData={[...math.symbols, { value: "custom", label: t("component.options.addCustomGroup") }]}
            buttonText={t("component.options.add")}
            onAdd={handleAddSymbol}
            items={item.symbols}
            onRemove={handleDeleteSymbol}
            onChange={handleSymbolsChange}
          />
        </Col>
      </StyledRow>
    </Block>
  );
};

KeyPadOptions.propTypes = {
  t: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

export default withNamespaces("assessment")(KeyPadOptions);
