import React from "react";
import PropTypes from "prop-types";

import { MathKeyboard } from "@edulastic/common";
import { math } from "@edulastic/constants";

import { MathInputStyles } from "./MathInputStyles";
import { WithResources } from "../../HOC/withResources";

const { EMBED_RESPONSE } = math;

class MathInput extends React.PureComponent {
  state = {
    mathField: null,
    mathFieldFocus: false
  };

  containerRef = React.createRef();

  mathFieldRef = React.createRef();

  componentWillUnmount() {
    // make sure you remove the listener when the component is destroyed
    document.removeEventListener("click", this.handleClick, false);
    document.removeEventListener("click", this.handleChangeField, false);
    this.setState({ mathFieldFocus: false });
  }

  handleClick = e => {
    const { onFocus } = this.props;

    if (e.target.nodeName === "LI" && e.target.attributes[0].nodeValue === "option") {
      return;
    }
    if (this.containerRef.current && !this.containerRef.current.contains(e.target)) {
      onFocus(false);
      this.setState({ mathFieldFocus: false });
    }
  };

  componentWillReceiveProps(nextProps) {
    const { mathField } = this.state;
    if (mathField && mathField.latex() !== nextProps.value) {
      mathField.latex(nextProps.value);
    }
  }

  componentDidMount() {
    const { value } = this.props;
    const MQ = window.MathQuill.getInterface(2);

    MQ.registerEmbed("response", () => ({
      htmlString: `<span class="response-embed">
        <span class="response-embed__char">R</span>
        <span class="response-embed__text">Response</span>
      </span>`,
      text() {
        return "custom_embed";
      },
      latex() {
        return EMBED_RESPONSE;
      }
    }));

    const mathField = MQ.MathField(this.mathFieldRef.current, window.MathQuill);
    mathField.write(value);

    this.setState(
      () => ({ mathField }),
      () => {
        const textarea = mathField.el().querySelector(".mq-textarea textarea");
        textarea.addEventListener("keyup", this.handleChangeField);
        document.addEventListener("click", this.handleClick, false);
      }
    );
  }

  handleChangeField = () => {
    const { onInput } = this.props;
    const { mathField } = this.state;

    const text = mathField.latex();
    onInput(text);
  };

  onInput = (key, command = "cmd") => {
    const { mathField } = this.state;

    if (!mathField) return;
    if (key === "left_move") {
      mathField.keystroke("Left");
    } else if (key === "right_move") {
      mathField.keystroke("Right");
    } else if (key === "ln--") {
      mathField.write("ln\\left(\\right)");
    } else if (key === "leftright3") {
      mathField.write("\\sqrt[3]{}");
    } else if (key === "Backspace") {
      mathField.keystroke("Backspace");
    } else if (key === "leftright2") {
      mathField.write("^2");
    } else if (key === "down_move") {
      mathField.keystroke("Down");
    } else if (key === "up_move") {
      mathField.keystroke("Up");
    } else if (key === "\\embed{response}") {
      mathField.write(key);
    } else {
      mathField[command](key);
    }
    mathField.focus();
    this.handleChangeField();
  };

  onClose = () => {
    this.setState({ mathFieldFocus: false });
  };

  focus = () => {
    const { mathField } = this.state;
    mathField.focus();
  };

  render() {
    const { mathFieldFocus } = this.state;
    const {
      alwaysShowKeyboard,
      showResponse,
      style,
      onFocus,
      onKeyDown,
      symbols,
      numberPad,
      fullWidth,
      className
    } = this.props;

    return (
      <MathInputStyles fullWidth={fullWidth} className={className}>
        <div
          ref={this.containerRef}
          onFocus={() => {
            onFocus(true);
            this.setState({ mathFieldFocus: true });
          }}
          className="input"
        >
          <div onKeyDown={onKeyDown} className="input__math" style={style}>
            <span
              className="input__math__field"
              ref={this.mathFieldRef}
              onClick={() => this.setState({ mathFieldFocus: true })}
            />
          </div>
          <div className={alwaysShowKeyboard ? "input__keyboard" : "input__absolute__keyboard"}>
            {(alwaysShowKeyboard || mathFieldFocus) && (
              <MathKeyboard
                symbols={symbols}
                numberPad={numberPad}
                showResponse={showResponse}
                onInput={(key, command) => this.onInput(key, command)}
              />
            )}
          </div>
        </div>
      </MathInputStyles>
    );
  }
}

MathInput.propTypes = {
  alwaysShowKeyboard: PropTypes.bool,
  onInput: PropTypes.func.isRequired,
  symbols: PropTypes.array.isRequired,
  numberPad: PropTypes.array.isRequired,
  showResponse: PropTypes.bool,
  value: PropTypes.string,
  style: PropTypes.object,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  fullWidth: PropTypes.bool,
  className: PropTypes.string
};

MathInput.defaultProps = {
  alwaysShowKeyboard: false,
  value: "",
  showResponse: false,
  style: {},
  onFocus: () => {},
  onKeyDown: () => {},
  fullWidth: false,
  className: ""
};

// export default MathInput;

const MathInputWithResources = ({ ...props }) => (
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
    <MathInput {...props} />
  </WithResources>
);

export default MathInputWithResources;
