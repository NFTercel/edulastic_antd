import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withNamespaces } from "@edulastic/localization";
import AxisSegmentsMoreOptions from "./AxisSegmentsMoreOptions";
import { RENDERING_BASE } from "../../Builder/config/constants";

const AxisSegmentsOptions = ({
  t,
  setCanvas,
  setOptions,
  setNumberline,
  fillSections,
  cleanSections,
  graphData,
  setValidation,
  setControls,
  setExtras,
  toolbar
}) => {
  const getFontSizeList = () => [
    {
      id: "small",
      label: "Small",
      value: 10,
      selected: false
    },
    {
      id: "normal",
      label: "Normal",
      value: 12,
      selected: true
    },
    {
      id: "large",
      label: "Large",
      value: 16,
      selected: false
    },
    {
      id: "extra_large",
      label: "Extra large",
      value: 20,
      selected: false
    },
    {
      id: "huge",
      label: "Huge",
      value: 24,
      selected: false
    }
  ];

  const getOrientationList = () => [
    { value: "horizontal", label: "Horizontal" },
    { value: "vertical", label: "Vertical" }
  ];

  const getRenderingBaseList = () => [
    {
      id: RENDERING_BASE.LINE_MINIMUM_VALUE,
      value: "Line minimum value",
      selected: true
    },
    {
      id: RENDERING_BASE.ZERO_BASED,
      value: "Zero",
      selected: false
    }
  ];

  const { canvas, ui_style, numberlineAxis, extra_options } = graphData;

  return (
    <Fragment>
      <AxisSegmentsMoreOptions
        extra_options={extra_options}
        setExtras={setExtras}
        options={ui_style}
        setCanvas={setCanvas}
        canvasConfig={canvas}
        setOptions={setOptions}
        toolbar={graphData.toolbar}
        setControls={setControls}
        fillSections={fillSections}
        cleanSections={cleanSections}
        setNumberline={setNumberline}
        numberlineAxis={numberlineAxis}
        fontSizeList={getFontSizeList()}
        orientationList={getOrientationList()}
        renderingBaseList={getRenderingBaseList()}
        setValidation={setValidation}
        graphData={graphData}
      />
    </Fragment>
  );
};

AxisSegmentsOptions.propTypes = {
  t: PropTypes.func.isRequired,
  cleanSections: PropTypes.func.isRequired,
  fillSections: PropTypes.func.isRequired,
  setCanvas: PropTypes.func.isRequired,
  setNumberline: PropTypes.func.isRequired,
  setOptions: PropTypes.func.isRequired,
  graphData: PropTypes.object.isRequired,
  setValidation: PropTypes.func.isRequired
};

const enhance = compose(withNamespaces("assessment"));

export default enhance(AxisSegmentsOptions);
