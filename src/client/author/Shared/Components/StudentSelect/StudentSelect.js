import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import { FlexContainer } from "@edulastic/common";
import { Container, StyledSelect } from "./styled";

const SortBar = ({ loadStudentResponses, students }) => {
  const onSortChange = testActivityId => {
    if (testActivityId !== undefined) {
      loadStudentResponses({ testActivityId });
    }
  };

  return (
    <Fragment>
      {students && students.length !== 0 && (
        <FlexContainer>
          <Container>
            <StyledSelect defaultValue={students[0].studentName} onChange={onSortChange}>
              {students.map(student => {
                const testActivityId = student.testActivityId ? student.testActivityId : null;
                const isActive = testActivityId === null;
                return (
                  <Select.Option value={testActivityId} disabled={isActive}>
                    {student.studentName}
                  </Select.Option>
                );
              })}
            </StyledSelect>
          </Container>
        </FlexContainer>
      )}
    </Fragment>
  );
};

SortBar.propTypes = {
  onSortChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  onStyleChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  activeStyle: PropTypes.string.isRequired
};

export default SortBar;
