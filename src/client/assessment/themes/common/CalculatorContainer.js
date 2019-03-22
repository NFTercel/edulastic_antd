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

    this.desmosGraphingRef = React.createRef();
    this.desmosBasicRef = React.createRef();
    this.desmosScientificRef = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      calculateMode: nextProps.calculateMode,
      changeMode: nextProps.changeMode
    });
  }

  componentDidMount() {
    let desmosGraphCalculator = Desmos.GraphingCalculator(ReactDOM.findDOMNode(this.desmosGraphingRef));
    desmosGraphCalculator.setExpression({ dragMode: Desmos.DragModes.XY });

    setTimeout(() => {
      Desmos.FourFunctionCalculator(ReactDOM.findDOMNode(this.desmosBasicRef));
    }, 200);

    setTimeout(() => {
      Desmos.ScientificCalculator(ReactDOM.findDOMNode(this.desmosScientificRef));
    }, 400);

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
    }, 600);

    setTimeout(() => {
      var parameters = {
        id: "ggbApplet",
        appName: "scientific",
        width: 800,
        height: 600,
        showToolBar: false,
        borderColor: null,
        showMenuBar: false,
        allowStyleBar: false,
        showAlgebraInput: true,
        enableLabelDrags: false,
        enableShiftDragZoom: false,
        capturingThreshold: null,
        showToolBarHelp: false,
        errorDialogsActive: true,
        showTutorialLink: false,
        showLogging: true,
        useBrowserForJS: false
      };

      let applet = new GGBApplet(parameters, "5.0", "geogebra-basiccalculator");
      applet.inject("geogebra-basiccalculator");
    }, 800);

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
    }, 1000);
  }

  render() {
    const { calculateMode, changeMode } = this.state;
    return (
      <Container>
        <StyledDraggable>
          <StyledDiv visible={changeMode == 2 && calculateMode === 0 && true}>
            <StyledTitle>Desmos Graphing Calculator</StyledTitle>
            <DesmosGraphingCalculator
              id="demos-graphiccalculator"
              ref={ref => {
                this.desmosGraphingRef = ref;
              }}
            />
          </StyledDiv>
        </StyledDraggable>

        <StyledDraggable>
          <StyledDiv visible={changeMode == 2 && calculateMode === 1 && true}>
            <StyledTitle>Desmos Basic Calculator</StyledTitle>
            <DesmosBasicCalculator
              ref={ref => {
                this.desmosBasicRef = ref;
              }}
            />
          </StyledDiv>
        </StyledDraggable>

        <StyledDraggable>
          <StyledDiv visible={changeMode == 2 && calculateMode === 2 && true}>
            <StyledTitle>Desmos Scientific Calculator</StyledTitle>
            <DesmosScientificCalculator
              ref={ref => {
                this.desmosScientificRef = ref;
              }}
            />
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
  width: 350px;
  height: 500px;
`;

const DesmosScientificCalculator = styled.div`
  width: 600px;
  height: 500px;
`;

const GeoGebracalculator = styled.div`
  width: 800px;
  height: 600px;
`;

export default CalculatorContainer;
