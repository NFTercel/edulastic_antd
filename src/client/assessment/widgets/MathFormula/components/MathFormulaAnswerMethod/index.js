import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Col, Select, Input, Checkbox } from "antd";
import { pick } from "lodash";

import { FlexContainer } from "@edulastic/common";
import { math } from "@edulastic/constants";
import { withNamespaces } from "@edulastic/localization";

import { Label } from "../../../../styled/WidgetOptions/Label";
import { MathInput } from "@edulastic/common";

import { IconTrash } from "../../styled/IconTrash";
import ThousandsSeparators from "../ThousandsSeparators";
import { Container } from "./styled/Container";
import { StyledRow } from "./styled/StyledRow";

const {
  methods: methodsConst,
  fields: fieldsConst,
  decimalSeparators: decimalSeparatorsConst,
  syntaxes: syntaxesConst
} = math;

const methods = [
  methodsConst.EQUIV_SYMBOLIC,
  methodsConst.EQUIV_LITERAL,
  methodsConst.EQUIV_VALUE,
  methodsConst.IS_SIMPLIFIED,
  methodsConst.IS_FACTORISED,
  methodsConst.IS_EXPANDED,
  methodsConst.IS_UNIT,
  methodsConst.IS_TRUE,
  methodsConst.STRING_MATCH,
  methodsConst.EQUIV_SYNTAX
];

const fields = [fieldsConst.INTEGER, fieldsConst.REAL, fieldsConst.COMPLEX];

const clearOptions = (method, options) => {
  switch (method) {
    case methodsConst.EQUIV_SYMBOLIC:
      return pick(options, [
        "ignoreText",
        "compareSides",
        "allowThousandsSeparator",
        "setDecimalSeparator",
        "setThousandsSeparator",
        "significantDecimalPlaces"
      ]);
    case methodsConst.EQUIV_LITERAL:
      return pick(options, [
        "inverseResult",
        "ignoreTrailingZeros",
        "allowThousandsSeparator",
        "setDecimalSeparator",
        "setThousandsSeparator",
        "ignoreOrder",
        "ignoreCoefficientOfOne",
        "allowInterval"
      ]);
    case methodsConst.EQUIV_VALUE:
      return pick(options, [
        "significantDecimalPlaces",
        "tolerance",
        "ignoreText",
        "allowThousandsSeparator",
        "setDecimalSeparator",
        "setThousandsSeparator"
      ]);
    case methodsConst.IS_SIMPLIFIED:
      return pick(options, [
        "allowThousandsSeparator",
        "setDecimalSeparator",
        "setThousandsSeparator",
        "inverseResult"
      ]);
    case methodsConst.IS_FACTORISED:
      return pick(options, ["allowThousandsSeparator", "setDecimalSeparator", "setThousandsSeparator", "field"]);
    case methodsConst.IS_EXPANDED:
      return pick(options, ["allowThousandsSeparator", "setDecimalSeparator", "setThousandsSeparator"]);
    case methodsConst.IS_UNIT:
      return pick(options, ["allowThousandsSeparator", "setDecimalSeparator", "setThousandsSeparator", "allowedUnits"]);
    case methodsConst.IS_TRUE:
      return pick(options, ["allowThousandsSeparator", "setDecimalSeparator", "setThousandsSeparator"]);
    case methodsConst.STRING_MATCH:
      return pick(options, ["ignoreLeadingAndTrailingSpaces", "treatMultipleSpacesAsOne"]);
    case methodsConst.EQUIV_SYNTAX:
      return pick(options, ["syntax", "argument"]);
    default:
      return options;
  }
};

const MathFormulaAnswerMethod = ({ onChange, index, onDelete, method, value, aria_label, options, item, t }) => {
  useEffect(() => {
    const newOptions = clearOptions(method, { ...options });

    if (method === methodsConst.IS_FACTORISED && !newOptions.field) {
      newOptions.field = fieldsConst.INTEGER;
    }
    onChange("options", newOptions);
  }, [method]);

  const handleChangeOptions = (prop, val) => {
    const newOptions = {
      ...options,
      [prop]: val
    };

    if (prop === "allowThousandsSeparator") {
      if (!val) {
        delete newOptions.setThousandsSeparator;
        delete newOptions.setDecimalSeparator;
        delete newOptions.allowThousandsSeparator;
      } else {
        newOptions.setThousandsSeparator = [","];
        newOptions.setDecimalSeparator = ".";
      }
    }

    onChange("options", newOptions);
  };

  const handleChangeRule = val => {
    const newOptions = {
      ...options,
      syntax: val
    };

    if (![syntaxesConst.DECIMAL, syntaxesConst.STANDARD_FORM].includes(val)) {
      delete newOptions.argument;
    }

    onChange("options", newOptions);
  };

  const handleChangeThousandsSeparator = ({ val, index }) => {
    let newSetThousandsSeparator = [""];

    if (options.setThousandsSeparator && options.setThousandsSeparator.length) {
      newSetThousandsSeparator = [...options.setThousandsSeparator];
    }

    newSetThousandsSeparator[index] = val;
    handleChangeOptions("setThousandsSeparator", newSetThousandsSeparator);
  };

  const handleAddThousandsSeparator = () => {
    let newSeparators = [];
    if (options.setThousandsSeparator && options.setThousandsSeparator.length) {
      newSeparators = [...options.setThousandsSeparator];
    }
    handleChangeOptions("setThousandsSeparator", [...newSeparators, ""]);
  };

  const handleDeleteThousandsSeparator = index => {
    const newSetThousandsSeparator = [...options.setThousandsSeparator];
    newSetThousandsSeparator.splice(index, 1);
    handleChangeOptions("setThousandsSeparator", newSetThousandsSeparator);
  };

  const decimalSeparators = [
    { value: decimalSeparatorsConst.DOT, label: t("component.math.dot") },
    { value: decimalSeparatorsConst.COMMA, label: t("component.math.comma") }
  ];

  const syntaxes = [
    { value: "", label: "" },
    { value: syntaxesConst.DECIMAL, label: t("component.math.decimal") },
    {
      value: syntaxesConst.SIMPLE_FRACTION,
      label: t("component.math.simpleFraction")
    },
    {
      value: syntaxesConst.MIXED_FRACTION,
      label: t("component.math.mixedFraction")
    },
    { value: syntaxesConst.EXPONENT, label: t("component.math.exponent") },
    {
      value: syntaxesConst.STANDARD_FORM,
      label: t("component.math.standardForm")
    },
    {
      value: syntaxesConst.SLOPE_INTERCEPT_FORM,
      label: t("component.math.slopeInterceptForm")
    },
    {
      value: syntaxesConst.POINT_SLOPE_FORM,
      label: t("component.math.pointSlopeForm")
    }
  ];

  return (
    <Container data-cy="math-formula-answer">
      <StyledRow>
        <Col span={12}>
          <Label>{t("component.math.method")}</Label>
          <Select
            data-cy="method-selection-dropdown"
            size="large"
            value={method}
            style={{ width: "100%" }}
            onChange={val => onChange("method", val)}
          >
            {methods.map(val => (
              <Select.Option data-cy={`method-selection-dropdown-list-${val}`} key={val} value={val}>
                {val}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={2} push={10}>
          {onDelete && <IconTrash data-cy="delete-answer-method" onClick={onDelete} width={22} height={22} />}
        </Col>
      </StyledRow>

      {methodsConst.IS_FACTORISED === method && (
        <StyledRow gutter={32}>
          <Col span={12}>
            <Label>{t("component.math.field")}</Label>
            <Select
              size="large"
              data-cy="answer-field-dropdown"
              value={options.field || fields[0]}
              style={{ width: "100%" }}
              onChange={val => handleChangeOptions("field", val)}
            >
              {fields.map(val => (
                <Select.Option key={val} value={val}>
                  {val}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </StyledRow>
      )}

      {[
        methodsConst.EQUIV_SYMBOLIC,
        methodsConst.EQUIV_LITERAL,
        methodsConst.EQUIV_VALUE,
        methodsConst.IS_UNIT,
        methodsConst.STRING_MATCH
      ].includes(method) && (
        <Fragment>
          <StyledRow gutter={32}>
            <Col span={12}>
              <Label data-cy="answer-math-input">{t("component.math.value")}</Label>
              <MathInput
                symbols={item.symbols}
                numberPad={item.numberPad}
                value={value}
                onInput={val => {
                  onChange("value", val);
                }}
              />
            </Col>
            <Col span={12}>
              <Label>{t("component.math.ariaLabel")}</Label>
              <Input.TextArea
                data-cy="answer-aria-label"
                size="large"
                value={aria_label}
                onChange={e => onChange("aria_label", e.target.value)}
              />
            </Col>
          </StyledRow>
          {methodsConst.IS_UNIT === method && (
            <StyledRow gutter={32}>
              <Col span={12}>
                <Label>{t("component.math.allowedUnits")}</Label>
                <Input
                  size="large"
                  value={options.allowedUnits}
                  onChange={e => handleChangeOptions("allowedUnits", e.target.value)}
                  data-cy="answer-allowed-units"
                />
              </Col>
            </StyledRow>
          )}
        </Fragment>
      )}

      {method === methodsConst.STRING_MATCH && (
        <StyledRow gutter={32}>
          <Col span={12}>
            <Checkbox
              data-cy="answer-ignore-leading-and-trailing-spaces"
              checked={options.ignoreLeadingAndTrailingSpaces}
              onChange={e => handleChangeOptions("ignoreLeadingAndTrailingSpaces", e.target.checked)}
            >
              {t("component.math.ignoreLeadingAndTrailingSpaces")}
            </Checkbox>
          </Col>
          <Col span={12}>
            <Checkbox
              data-cy="answer-treat-multipleSpacesAsOne"
              checked={options.treatMultipleSpacesAsOne}
              onChange={e => handleChangeOptions("treatMultipleSpacesAsOne", e.target.checked)}
            >
              {t("component.math.treatMultipleSpacesAsOne")}
            </Checkbox>
          </Col>
        </StyledRow>
      )}

      {method === methodsConst.EQUIV_SYNTAX && (
        <StyledRow gutter={32}>
          <Col span={12}>
            <Label>{t("component.math.rule")}</Label>
            <Select
              data-cy="answer-rule-dropdown"
              size="large"
              value={options.syntax || ""}
              style={{ width: "100%" }}
              onChange={val => {
                handleChangeRule(val);
              }}
            >
              {syntaxes.map(({ value: val, label }) => (
                <Select.Option key={val} value={val}>
                  {label}
                </Select.Option>
              ))}
            </Select>
          </Col>
          {syntaxesConst.DECIMAL === options.syntax && (
            <Col span={12}>
              <Label>{t("component.math.argument")}</Label>
              <Input
                size="large"
                type="number"
                value={options.argument}
                onChange={e => handleChangeOptions("argument", +e.target.value)}
              />
            </Col>
          )}
          {syntaxesConst.STANDARD_FORM === options.syntax && (
            <Col span={12}>
              <Label>{t("component.math.argument")}</Label>
              <Select
                size="large"
                value={options.argument || ""}
                style={{ width: "100%" }}
                onChange={val => handleChangeOptions("argument", val)}
              >
                {["linear", "quadratic"].map(val => (
                  <Select.Option key={val} value={val}>
                    {val}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          )}
        </StyledRow>
      )}

      {method === methodsConst.EQUIV_LITERAL && (
        <Fragment>
          <StyledRow gutter={32}>
            <Col span={12}>
              <Checkbox
                data-cy="answer-ignore-order"
                checked={options.ignoreOrder}
                onChange={e => handleChangeOptions("ignoreOrder", e.target.checked)}
              >
                {t("component.math.ignoreOrder")}
              </Checkbox>
            </Col>
            <Col span={12}>
              <Checkbox
                data-cy="answer-allow-interval"
                checked={options.allowInterval}
                onChange={e => handleChangeOptions("allowInterval", e.target.checked)}
              >
                {t("component.math.allowInterval")}
              </Checkbox>
            </Col>
          </StyledRow>

          <StyledRow gutter={32}>
            <Col span={12}>
              <Checkbox
                data-cy="answer-ignore-trailing-zeros"
                checked={options.ignoreTrailingZeros}
                onChange={e => handleChangeOptions("ignoreTrailingZeros", e.target.checked)}
              >
                {t("component.math.ignoreTrailingZeros")}
              </Checkbox>
            </Col>
          </StyledRow>

          <StyledRow gutter={32}>
            <Col span={12}>
              <Checkbox
                data-cy="answer-ignore-coefficient-of-one"
                checked={options.ignoreCoefficientOfOne}
                onChange={e => handleChangeOptions("ignoreCoefficientOfOne", e.target.checked)}
              >
                {t("component.math.ignoreCoefficientOfOne")}
              </Checkbox>
            </Col>
          </StyledRow>
        </Fragment>
      )}

      {[
        methodsConst.EQUIV_LITERAL,
        methodsConst.IS_SIMPLIFIED,
        methodsConst.EQUIV_VALUE,
        methodsConst.IS_FACTORISED
      ].includes(method) && (
        <StyledRow gutter={32}>
          <Col span={12}>
            <Checkbox
              data-cy="answer-inverse-result"
              checked={options.inverseResult}
              onChange={e => handleChangeOptions("inverseResult", e.target.checked)}
            >
              {t("component.math.inverseResult")}
            </Checkbox>
          </Col>
        </StyledRow>
      )}

      {[
        methodsConst.EQUIV_SYMBOLIC,
        methodsConst.EQUIV_VALUE,
        methodsConst.IS_TRUE,
        methodsConst.EQUIV_SYNTAX
      ].includes(method) && (
        <StyledRow gutter={32}>
          {method !== methodsConst.EQUIV_SYNTAX && (
            <Col span={12}>
              <FlexContainer>
                <Input
                  data-cy="answer-significant-decimal-places"
                  style={{ width: "30%" }}
                  size="large"
                  type="number"
                  value={options.significantDecimalPlaces}
                  onChange={e => handleChangeOptions("significantDecimalPlaces", e.target.value)}
                />
                <Label>{t("component.math.significantDecimalPlaces")}</Label>
              </FlexContainer>
            </Col>
          )}
          {method !== methodsConst.IS_TRUE && (
            <Col span={12}>
              <Checkbox
                checked={options.ignoreText}
                onChange={e => handleChangeOptions("ignoreText", e.target.checked)}
                data-cy="answer-ignore-text-checkbox"
              >
                {t("component.math.ignoreText")}
              </Checkbox>
            </Col>
          )}
        </StyledRow>
      )}

      {[methodsConst.EQUIV_SYMBOLIC, methodsConst.EQUIV_VALUE].includes(method) && (
        <StyledRow gutter={32}>
          <Col span={12}>
            <Checkbox
              checked={options.compareSides}
              onChange={e => handleChangeOptions("compareSides", e.target.checked)}
              data-cy="answer-compare-sides"
            >
              {t("component.math.compareSides")}
            </Checkbox>
          </Col>
          {method === methodsConst.EQUIV_SYMBOLIC && (
            <Col span={12}>
              <Checkbox
                checked={options.allowEulersNumber}
                onChange={e => handleChangeOptions("allowEulersNumber", e.target.checked)}
                data-cy="answer-treat-eas-eulers-number"
              >
                {t("component.math.treatEAsEulersNumber")}
              </Checkbox>
            </Col>
          )}
        </StyledRow>
      )}

      {method === methodsConst.EQUIV_VALUE && (
        <StyledRow gutter={32}>
          <Col span={12}>
            <FlexContainer>
              <Input
                data-cy="answer-tolerance"
                style={{ width: "30%" }}
                size="large"
                value={options.tolerance}
                onChange={e => handleChangeOptions("tolerance", e.target.value)}
              />
              <Label>{t("component.math.tolerance")}</Label>
            </FlexContainer>
          </Col>
        </StyledRow>
      )}

      {![methodsConst.STRING_MATCH, methodsConst.EQUIV_SYNTAX].includes(method) && (
        <StyledRow gutter={32}>
          <Col span={12}>
            <Checkbox
              data-cy="answer-allow-thousands-separator"
              checked={options.allowThousandsSeparator}
              onChange={e => handleChangeOptions("allowThousandsSeparator", e.target.checked)}
            >
              {t("component.math.allowDecimalMarks")}
            </Checkbox>
          </Col>
        </StyledRow>
      )}

      {options.allowThousandsSeparator && (
        <StyledRow gutter={32}>
          <Col span={12}>
            <Label>{t("component.math.decimalSeparator")}</Label>
            <Select
              size="large"
              value={options.setDecimalSeparator || decimalSeparators[0].value}
              style={{ width: "100%" }}
              onChange={val => handleChangeOptions("setDecimalSeparator", val)}
              data-cy="answer-set-decimal-separator-dropdown"
            >
              {decimalSeparators.map(({ value: val, label }) => (
                <Select.Option data-cy={`answer-set-decimal-separator-dropdown-list-${label}`} key={val} value={val}>
                  {label}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <ThousandsSeparators
            separators={options.setThousandsSeparator}
            onChange={handleChangeThousandsSeparator}
            onAdd={handleAddThousandsSeparator}
            onDelete={handleDeleteThousandsSeparator}
          />
        </StyledRow>
      )}
    </Container>
  );
};

MathFormulaAnswerMethod.propTypes = {
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  item: PropTypes.object.isRequired,
  options: PropTypes.object,
  value: PropTypes.string,
  method: PropTypes.string,
  aria_label: PropTypes.string,
  t: PropTypes.func.isRequired
};

MathFormulaAnswerMethod.defaultProps = {
  aria_label: "",
  value: "",
  method: "",
  options: {},
  onDelete: undefined
};

export default withNamespaces("assessment")(MathFormulaAnswerMethod);
