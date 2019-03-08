import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { isEqual } from "lodash";
import { MathKeyboard } from "@edulastic/common";

import { MathInputStyles } from "./MathInputStyles";
import { WithResources } from "../../HOC/withResources";

class StaticMath extends PureComponent {
  state = {
    MQ: null,
    mathField: null,
    innerField: null,
    showKeyboard: false
  };

  containerRef = React.createRef();

  mathFieldRef = React.createRef();

  componentWillUnmount() {
    // make sure you remove the listener when the component is destroyed
    document.removeEventListener("click", this.handleClick, false);
  }

  handleClick(e) {
    if (
      e.target.nodeName === "svg" ||
      e.target.nodeName === "path" ||
      (e.target.nodeName === "LI" && e.target.attributes[0].nodeValue === "option")
    ) {
      return;
    }
    if (this.containerRef.current && !this.containerRef.current.contains(e.target)) {
      this.setState({ showKeyboard: false });
    }
  }

  componentDidMount() {
    const { latex, innerValues } = this.props;
    const MQ = window.MathQuill.getInterface(2);

    const mathField = MQ.StaticMath(this.mathFieldRef.current);

    this.setState(
      {
        mathField,
        MQ
      },
      () => {
        this.setLatex(latex);
        this.setInnerFieldValues(innerValues);
      }
    );

    document.addEventListener("click", this.handleClick.bind(this), false);
  }

  componentDidUpdate(prevProps) {
    const { latex, innerValues } = this.props;
    if (prevProps.latex !== latex) {
      this.setLatex(latex);
      this.setInnerFieldValues(innerValues);
      return;
    }
    if (!isEqual(innerValues, prevProps.innerValues)) {
      this.setInnerFieldValues(innerValues);
    }
  }

  setInnerFieldsFocuses = () => {
    const { mathField, MQ } = this.state;

    if (!mathField || !mathField.innerFields || !mathField.innerFields.length) {
      return;
    }

    const goTo = fieldIndex => {
      const nextField = mathField.innerFields[fieldIndex];
      if (nextField) {
        nextField
          .focus()
          .el()
          .click();
      }
    };

    mathField.innerFields.forEach(field => {
      const getIndex = id => parseInt(id.replace("inner-", ""), 10);

      field.config({
        handlers: {
          upOutOf(innerField) {
            goTo(getIndex(innerField.el().id) - 1);
          },
          downOutOf(innerField) {
            goTo(getIndex(innerField.el().id) + 1);
          },
          moveOutOf: (dir, innerField) => {
            if (dir === MQ.L) {
              goTo(getIndex(innerField.el().id) - 1);
            } else if (dir === MQ.R) {
              goTo(getIndex(innerField.el().id) + 1);
            }
          }
        }
      });
    });
  };

  setLatex = latex => {
    const { mathField } = this.state;

    if (!mathField) return;
    mathField.latex(latex);

    for (let i = 0; i < mathField.innerFields.length; i++) {
      mathField.innerFields[i].el().id = `inner-${i}`;
      mathField.innerFields[i].el().addEventListener("click", () => {
        this.onFocus(mathField.innerFields[i]);
      });
    }

    this.setInnerFieldsFocuses();
  };

  setInnerFieldValues = values => {
    for (let i = 0; i < values.length; i++) {
      this.setInnerFieldValue(values[i], i);
    }
  };

  setInnerFieldValue = (latex, index) => {
    const { mathField } = this.state;

    if (!mathField || !mathField.innerFields[index]) return;
    mathField.innerFields[index].write(latex);
  };

  getLatex = () => {
    const { mathField } = this.state;

    if (!mathField) return;
    return mathField.latex();
  };

  onInput = key => {
    const { innerField } = this.state;
    const { onInput } = this.props;

    if (!innerField) return;

    if (key === "left_move") {
      innerField.keystroke("Left");
    } else if (key === "right_move") {
      innerField.keystroke("Right");
    } else if (key === "ln--") {
      innerField.write("ln\\left(\\right)");
    } else if (key === "leftright3") {
      innerField.write("\\sqrt[3]{}");
    } else if (key === "Backspace") {
      innerField.keystroke("Backspace");
    } else if (key === "leftright2") {
      innerField.write("^2");
    } else if (key === "down_move") {
      innerField.keystroke("Down");
    } else if (key === "up_move") {
      innerField.keystroke("Up");
    } else {
      innerField.write(key);
    }
    innerField.focus();

    onInput(this.getLatex());
  };

  onFocus(innerField) {
    this.setState({
      innerField,
      showKeyboard: true
    });
  }

  onClose = () => {
    this.setState({ showKeyboard: false });
  };

  render() {
    const { showKeyboard } = this.state;
    const { style, onBlur, symbols, numberPad } = this.props;

    return (
      <MathInputStyles>
        <div ref={this.containerRef} className="input" onBlur={onBlur}>
          <div className="input__math" style={style}>
            <span className="input__math__field" ref={this.mathFieldRef} />
          </div>
          <div className="input__keyboard">
            {showKeyboard && (
              <MathKeyboard
                symbols={symbols}
                numberPad={numberPad}
                onInput={this.onInput}
                showResponse={false}
                onClose={this.onClose}
              />
            )}
          </div>
        </div>
      </MathInputStyles>
    );
  }
}

StaticMath.propTypes = {
  style: PropTypes.object,
  onBlur: PropTypes.func.isRequired,
  onInput: PropTypes.func.isRequired,
  symbols: PropTypes.array.isRequired,
  numberPad: PropTypes.array.isRequired,
  latex: PropTypes.string.isRequired,
  innerValues: PropTypes.array
};

StaticMath.defaultProps = {
  style: {},
  innerValues: []
};

// export default StaticMath;

const StaticMathWithResources = ({ ...props }) => (
  <WithResources
    resources={[
      "https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.css",
      "https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.js",
      "https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.js",
      "https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.min.css"
    ]}
    fallBack={<h2>Loading...</h2>}
  >
    <StaticMath {...props} />
  </WithResources>
);

export default StaticMathWithResources;
