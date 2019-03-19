import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withNamespaces } from "@edulastic/localization";
import AxisLabelsMoreOptions from "./AxisLabelsMoreOptions";
import { RENDERING_BASE, FRACTIONS_FORMAT } from "../../Builder/config/constants";

const AxisLabelsOptions = ({
  t,
  graphData,
  setOptions,
  setNumberline,
  setCanvas,
  fillSections,
  cleanSections,
  setValidation,
  setExtras
}) => {
  const fontSizeList = [
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

  const fractionsFormatList = [
    {
      id: FRACTIONS_FORMAT.NOT_NORMALIZED,
      value: "Not normalized and mixed fractions",
      selected: true
    },
    {
      id: FRACTIONS_FORMAT.NORMALIZED,
      value: "Normalized and mixed fractions",
      selected: false
    },
    {
      id: FRACTIONS_FORMAT.IMPROPER,
      value: "Improper fractions",
      selected: false
    }
  ];

  const renderingBaseList = [
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

  return (
    <Fragment>
      <AxisLabelsMoreOptions
        t={t}
        setExtras={setExtras}
        setCanvas={setCanvas}
        graphData={graphData}
        setOptions={setOptions}
        fontSizeList={fontSizeList}
        fillSections={fillSections}
        cleanSections={cleanSections}
        setNumberline={setNumberline}
        renderingBaseList={renderingBaseList}
        fractionsFormatList={fractionsFormatList}
        setValidation={setValidation}
      />
    </Fragment>
  );
};

AxisLabelsOptions.propTypes = {
  t: PropTypes.func.isRequired,
  cleanSections: PropTypes.func.isRequired,
  fillSections: PropTypes.func.isRequired,
  graphData: PropTypes.object.isRequired,
  setOptions: PropTypes.func.isRequired,
  setNumberline: PropTypes.func.isRequired,
  setCanvas: PropTypes.func.isRequired,
  setValidation: PropTypes.func.isRequired
};

const enhance = compose(withNamespaces("assessment"));

export default enhance(AxisLabelsOptions);
