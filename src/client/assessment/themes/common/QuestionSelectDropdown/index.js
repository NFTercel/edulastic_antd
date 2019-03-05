import PropTypes from "prop-types";
import React from "react";
import { Select } from "antd";
import { withNamespaces } from "@edulastic/localization";

import SelectContainer from "./SelectContainer";

const QuestionSelectDropdown = ({ gotoQuestion, options, currentItem, skinb, t }) => (
  <SelectContainer skinb={skinb}>
    <Select
      defaultValue={currentItem}
      data-cy="options"
      onChange={value => {
        gotoQuestion(parseInt(value, 10));
      }}
    >
      {options.map((item, index) => (
        <Select.Option key={index} value={item}>
          {`${t("common.layout.selectbox.question")} ${index + 1}/ ${options.length}`}
        </Select.Option>
      ))}
    </Select>
  </SelectContainer>
);

QuestionSelectDropdown.propTypes = {
  options: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
  gotoQuestion: PropTypes.func.isRequired,
  currentItem: PropTypes.number.isRequired
};

export default withNamespaces("student")(QuestionSelectDropdown);
