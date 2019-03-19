import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withNamespaces } from "@edulastic/localization";
// import { Checkbox, Select } from "@edulastic/common";
import {
  MoreOptionsContainer,
  MoreOptionsColumn,
  MoreOptionsColumnContainer,
  MoreOptionsInput,
  MoreOptionsLabel,
  MoreOptionsRow,
  MoreOptionsSubHeading,
  StyledTextarea
} from "../common/styled_components";

export const AdditionalSettings = ({
  handleChange,
  rubric_reference,
  sample_answer,
  stimulus_review,
  instructor_stimulus
}) => {
  return (
    <Fragment>
      <MoreOptionsContainer>
        <MoreOptionsSubHeading>Additional Options</MoreOptionsSubHeading>

        <MoreOptionsColumnContainer>
          <MoreOptionsColumn>
            <MoreOptionsRow>
              <MoreOptionsLabel>Stimulus (review only)</MoreOptionsLabel>
              <MoreOptionsInput type="text" name="stimulus_review" value={stimulus_review} onChange={handleChange} />
            </MoreOptionsRow>
            <MoreOptionsRow>
              <MoreOptionsLabel>Rubric reference</MoreOptionsLabel>
              <MoreOptionsInput type="text" name="rubric_reference" value={rubric_reference} onChange={handleChange} />
            </MoreOptionsRow>
          </MoreOptionsColumn>

          <MoreOptionsColumn>
            <MoreOptionsRow>
              <MoreOptionsLabel>Instructor stimulus</MoreOptionsLabel>
              <MoreOptionsInput
                type="text"
                name="instructor_stimulus"
                value={instructor_stimulus}
                onChange={handleChange}
              />
            </MoreOptionsRow>
            <MoreOptionsRow>
              <MoreOptionsLabel>Stimulus (review only)</MoreOptionsLabel>
              <MoreOptionsInput type="text" name="stimulus_review" value={stimulus_review} onChange={handleChange} />
            </MoreOptionsRow>
          </MoreOptionsColumn>
        </MoreOptionsColumnContainer>
      </MoreOptionsContainer>

      <MoreOptionsContainer>
        <MoreOptionsLabel>Sample Answer</MoreOptionsLabel>
        <StyledTextarea onChange={handleChange} name="sample_answer" value={sample_answer} />
      </MoreOptionsContainer>
    </Fragment>
  );
};

AdditionalSettings.propTypes = {
  handleChange: PropTypes.func.isRequired,
  stimulus_review: PropTypes.string.isRequired,
  sample_answer: PropTypes.string.isRequired,
  rubric_reference: PropTypes.string.isRequired,
  instructor_stimulus: PropTypes.string.isRequired
};

const enhance = compose(withNamespaces("assessment"));

export default enhance(AdditionalSettings);
