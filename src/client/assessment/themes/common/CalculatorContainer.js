import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Draggable from "react-draggable";

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
        <StyledDraggable>
          <StyledDiv visible={changeMode == 2 && calculateMode === 0 && true}>
            <StyledTitle>Desmos Graphing Calculator</StyledTitle>
            <DesmosGraphingCalculator id="demos-graphiccalculator" />
          </StyledDiv>
        </StyledDraggable>

        <StyledDraggable>
          <StyledDiv visible={changeMode == 2 && calculateMode === 1 && true}>
            <StyledTitle>Desmos Basic Calculator</StyledTitle>
            <DesmosBasicCalculator id="demos-basiccalculator" />
          </StyledDiv>
        </StyledDraggable>

        <StyledDraggable>
          <StyledDiv visible={changeMode == 2 && calculateMode === 2 && true}>
            <StyledTitle>Desmos Scientific Calculator</StyledTitle>
            <DesmosScientificCalculator id="demos-scientificcalculator" />
          </StyledDiv>
        </StyledDraggable>

        <StyledDraggableF>
          <StyledDiv visible={changeMode == 2 && calculateMode === 3 && true}>
            <StyledTitle>GeoGebra Graphing Calculator</StyledTitle>
            <GeoGebracalculator id="geogebra-graphingculator" />
          </StyledDiv>
        </StyledDraggableF>

        <StyledDraggableF>
          <StyledDiv visible={changeMode == 2 && calculateMode === 4 && true}>
            <StyledTitle>GeoGebra Basic Calculator</StyledTitle>
            <GeoGebracalculator id="geogebra-basiccalculator" />
          </StyledDiv>
        </StyledDraggableF>

        <StyledDraggableF>
          <StyledDiv visible={changeMode == 2 && calculateMode === 5 && true}>
            <StyledTitle>GeoGebra Scientific Calculator</StyledTitle>
            <GeoGebracalculator id="geogebra-scientificcalculator" />
          </StyledDiv>
        </StyledDraggableF>
      </Container>
    );
  }
}

export default CalculatorContainer;

const Container = styled.div``;

const StyledDraggable = styled(Draggable)`
  position: absolute;
`;

const StyledDraggableF = styled(Draggable)`
  position: absolute;
  width: 800px;
`;

const StyledDiv = styled.div`
  position: absolute;
  left: 50%;
  top: 200px;
  display: ${props => (props.visible ? "block" : "none")};
`;

const StyledTitle = styled.div`
  width: 100%;
  height: 35px;
  background: #0288d1;
  color: #ffffff;
  font-size: 16px;
  line-height: 35px;
  padding: 0 12px;
  font-weight: 600;
  text-align: left;
  cursor: move;
`;

const DesmosGraphingCalculator = styled.div`
  width: 600px;
  height: 400px;
`;

const DesmosBasicCalculator = styled.div`
  width: 600px;
  height: 500px;
`;

const DesmosScientificCalculator = styled.div`
  width: 350px;
  height: 500px;
`;

const GeoGebracalculator = styled.div`
  width: 800px;
  height: 600px;
`;
