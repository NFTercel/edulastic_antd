import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";

import { FlexContainer, Paper } from "@edulastic/common";

import withAddButton from "../../../components/HOC/withAddButton";
import UiInputGroup from "./UiInputGroup";
import { Subtitle } from "../../../styled/Subtitle";
import { IconTrash } from "../styled";

const PointsList = ({ points, ratio, handleChange, handleDelete, t, onBlur }) => (
  <div style={{ marginBottom: 40, marginTop: 80 }}>
    {points.map((dot, index) => (
      <Paper style={{ marginBottom: 20 }} padding="20px">
        <FlexContainer justifyContent="space-between">
          <Subtitle>{`${t("component.chart.point")} ${index + 1}`}</Subtitle>
          <IconTrash onClick={() => handleDelete(index)} />
        </FlexContainer>
        <UiInputGroup
          onChange={handleChange(index)}
          firstInputType="text"
          secondInputType="number"
          ratio={ratio}
          onBlur={onBlur}
          firstFieldValue={dot.x}
          secondFieldValue={dot.y}
          t={t}
        />
        <Checkbox
          checked={!dot.notInteractive}
          onChange={() => handleChange(index)("interactive", !dot.notInteractive)}
        >
          {t("component.chart.interactive")}
        </Checkbox>
      </Paper>
    ))}
  </div>
);

PointsList.propTypes = {
  t: PropTypes.func.isRequired,
  points: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  ratio: PropTypes.number.isRequired
};

PointsList.defaultProps = {
  onBlur: () => {}
};

export default withAddButton(PointsList);
