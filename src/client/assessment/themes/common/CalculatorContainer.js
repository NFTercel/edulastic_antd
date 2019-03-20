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
      }, 1000);

      setTimeout(() => {
        let desmosScientificCalculatorElt = node.querySelector("#demos-scientificcalculator");
        desmosScientificCalculator = Desmos.ScientificCalculator(desmosScientificCalculatorElt);
      }, 2000);
    }
  }

  render() {
    const { calculateMode, changeMode } = this.state;
    return (
      <Container>
        <DesmosCalculator visible={changeMode == 2 && calculateMode === 0 && true} id="demos-graphiccalculator" />
        <DesmosCalculator visible={changeMode == 2 && calculateMode === 1 && true} id="demos-basiccalculator" />
        <DesmosCalculator visible={changeMode == 2 && calculateMode === 2 && true} id="demos-scientificcalculator" />
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

// const DesmosBasicCalculator = styled.div`
//   width: 600px;
//   height: 400px;
//   position: absolute;
//   left: 50%;
//   top: 30%;
//   transform: translateY(-50%);
// `;
