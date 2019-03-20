import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

class CalculatorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calculateMode: this.props.calculateMode,
      changeMode: this.props.changeMode
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      calculateMode: nextProps.calculateMode,
      changeMode: nextProps.changeMode
    });
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);

    if (node instanceof HTMLElement) {
      let desmosGraphCalculatorElt = node.querySelector("#demos-graphiccalculator");
      let desmosGraphCalculator = Desmos.GraphingCalculator(desmosGraphCalculatorElt);
      desmosGraphCalculator.setExpression({ dragMode: Desmos.DragModes.XY });

      setTimeout(() => {
        let desmosBasicCalculatorElt = node.querySelector("#demos-basiccalculator");
        Desmos.FourFunctionCalculator(desmosBasicCalculatorElt);
      }, 300);

      setTimeout(() => {
        let desmosScientificCalculatorElt = node.querySelector("#demos-scientificcalculator");
        Desmos.ScientificCalculator(desmosScientificCalculatorElt);
      }, 600);

      setTimeout(() => {
        var parameters = {
          id: "ggbApplet",
          appName: "graphing",
          width: 800,
          height: 600,
          showToolBar: true,
          borderColor: null,
          showMenuBar: true,
          allowStyleBar: true,
          showAlgebraInput: true,
          enableLabelDrags: false,
          enableShiftDragZoom: true,
          capturingThreshold: null,
          showToolBarHelp: false,
          errorDialogsActive: true,
          showTutorialLink: true,
          showLogging: true,
          useBrowserForJS: false
        };

        let applet = new GGBApplet(parameters, "5.0", "geogebra-graphingculator");
        applet.inject("geogebra-graphingculator");
      }, 900);

      setTimeout(() => {
        var parameters = {
          id: "ggbApplet",
          appName: "scientific",
          width: 800,
          height: 600,
          showToolBar: true,
          borderColor: null,
          showMenuBar: true,
          allowStyleBar: true,
          showAlgebraInput: true,
          enableLabelDrags: false,
          enableShiftDragZoom: true,
          capturingThreshold: null,
          showToolBarHelp: false,
          errorDialogsActive: true,
          showTutorialLink: true,
          showLogging: true,
          useBrowserForJS: false
        };

        let applet = new GGBApplet(parameters, "5.0", "geogebra-scientificcalculator");
        applet.inject("geogebra-scientificcalculator");
      }, 1200);

      setTimeout(() => {
        var parameters = {
          id: "ggbApplet",
          appName: "basic",
          width: 800,
          height: 600,
          showToolBar: true,
          borderColor: null,
          showMenuBar: true,
          allowStyleBar: true,
          showAlgebraInput: true,
          enableLabelDrags: false,
          enableShiftDragZoom: true,
          capturingThreshold: null,
          showToolBarHelp: false,
          errorDialogsActive: true,
          showTutorialLink: true,
          showLogging: true,
          useBrowserForJS: false
        };

        let applet = new GGBApplet(parameters, "5.0", "geogebra-basiccalculator");
        applet.inject("geogebra-basiccalculator");
      }, 1200);
    }
  }

  render() {
    const { calculateMode, changeMode } = this.state;
    return (
      <Container>
        <DesmosCalculator visible={changeMode == 2 && calculateMode === 0 && true} id="demos-graphiccalculator" />
        <DesmosCalculator visible={changeMode == 2 && calculateMode === 1 && true} id="demos-basiccalculator" />
        <DesmosCalculator visible={changeMode == 2 && calculateMode === 2 && true} id="demos-scientificcalculator" />
        <GeoGebracalculator visible={changeMode == 2 && calculateMode === 3 && true} id="geogebra-graphingculator" />
        <GeoGebracalculator visible={changeMode == 2 && calculateMode === 4 && true} id="geogebra-basiccalculator" />
        <GeoGebracalculator
          visible={changeMode == 2 && calculateMode === 5 && true}
          id="geogebra-scientificcalculator"
        />
      </Container>
    );
  }
}

export default CalculatorContainer;

const Container = styled.div``;
const DesmosCalculator = styled.div`
  width: 600px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 300px;
  display: ${props => (props.visible ? "block" : "none")};
`;
const GeoGebracalculator = styled.div`
  width: 600px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 200px;
  display: ${props => (props.visible ? "block" : "none")};
`;
// const DesmosBasicCalculator = styled.div`
//   width: 600px;
//   height: 400px;
//   position: absolute;
//   left: 50%;
//   top: 30%;
//   transform: translateY(-50%);
// `;
