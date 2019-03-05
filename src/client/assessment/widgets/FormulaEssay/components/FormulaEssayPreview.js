import React from "react";
import PropTypes from "prop-types";

import MathEssayInput from "./MathEssayInput";

import { InstructorStimulus } from "../styled/InstructorStimulus";

const FormulaEssayPreview = ({ item, lines, setLines }) => (
  <div>
    <InstructorStimulus>{item.instructor_stimulus}</InstructorStimulus>

    <div style={{ marginBottom: 15 }} dangerouslySetInnerHTML={{ __html: item.stimulus }} />

    <MathEssayInput
      item={item}
      textFormattingOptions={item.ui_style.text_formatting_options}
      uiStyle={item.ui_style}
      value={item.template}
      lines={lines}
      setLines={setLines}
      onInput={latex => console.log(latex)}
    />
  </div>
);

FormulaEssayPreview.propTypes = {
  item: PropTypes.object.isRequired,
  lines: PropTypes.array.isRequired,
  setLines: PropTypes.func.isRequired
};

export default FormulaEssayPreview;
