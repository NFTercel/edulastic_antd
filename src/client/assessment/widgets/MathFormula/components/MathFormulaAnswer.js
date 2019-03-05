import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { EduButton } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import MathFormulaAnswerMethod from "./MathFormulaAnswerMethod";

const MathFormulaAnswer = ({ answer, onChange, onAdd, onDelete, item, t }) => {
  const handleChangeMethod = index => (prop, val) => {
    onChange({ index, prop, value: val });
  };

  return (
    <Fragment>
      {answer.map((method, i) => (
        <MathFormulaAnswerMethod
          onDelete={() => onDelete(i)}
          key={i}
          item={item}
          onChange={handleChangeMethod(i)}
          {...method}
        />
      ))}
      <EduButton onClick={onAdd} type="primary" size="large">
        {t("component.math.addNewMethod")}
      </EduButton>
    </Fragment>
  );
};

MathFormulaAnswer.propTypes = {
  answer: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default withNamespaces("assessment")(MathFormulaAnswer);
