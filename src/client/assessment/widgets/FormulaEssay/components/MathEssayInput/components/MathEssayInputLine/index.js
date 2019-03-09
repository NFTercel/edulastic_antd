import React, { Component } from "react";
import PropTypes from "prop-types";
import enhanceWithClickOutside from "react-click-outside";
import { Icon } from "antd";
import { compose } from "redux";

import { MathInput } from '@edulastic/common';
import { withNamespaces } from '@edulastic/localization';

import { getFontSize } from "../../../../../../utils/helpers";
import CustomTextInput from './components/CustomTextInput/index';

import { Wrapper } from "./styled/Wrapper";
import { Button } from "./styled/Button";
import { Buttons } from "./styled/Buttons";
import { Label } from "./styled/Label";
import { WrapperIn } from "./styled/WrapperIn";

class MathEssayInputLine extends Component {
  state = {
    isEmpty: false
  };

  inputRef = React.createRef();

  handleFocus = val => {
    const { setActive } = this.props;

    if (val) {
      setActive(false);
    }
  };

  componentWillReceiveProps(nextProps) {
    const empty = nextProps.line.text === "<p><br></p>" || nextProps.line.text === "";

    if (!empty) {
      this.setState({
        isEmpty: false
      });
    } else {
      this.setState({
        isEmpty: true
      });
    }
  }

  focus = () => {
    const { active } = this.props;

    if (active && this.inputRef.current) {
      setTimeout(() => {
        this.inputRef.current.focus();
      }, 0);
    }
  };

  componentDidMount() {
    this.focus();
  }

  get fontSize() {
    const { item } = this.props;
    return getFontSize(item.ui_style.fontsize);
  }

  render() {
    const { isEmpty } = this.state;
    const { onAddNewLine, onChange, line, id, onChangeType, active, item, t } = this.props;

    return (
      <Wrapper active={active}>
        <WrapperIn>
          {line.type === "text" && (
            <CustomTextInput
              ref={this.inputRef}
              toolbarId={`toolbarId${id}`}
              onFocus={this.handleFocus}
              value={line.text}
              onChange={onChange}
              fontSize={this.fontSize}
            />
          )}
          {line.type === "math" && (
            <MathInput
              ref={this.inputRef}
              symbols={item.symbols}
              numberPad={item.numberPad}
              value={line.text}
              onInput={onChange}
              onFocus={this.handleFocus}
              style={{
                border: 0,
                height: "auto",
                minHeight: "auto",
                fontSize: this.fontSize
              }}
            />
          )}
          {active && isEmpty && (
            <Buttons>
              <Button
                className={line.type === "math" ? "active" : ""}
                onClick={() => onChangeType("math")}
                title="Math"
              >
                M
              </Button>
              <Button
                className={line.type === "text" ? "active" : ""}
                onClick={() => onChangeType("text")}
                title="Text"
              >
                T
              </Button>
            </Buttons>
          )}
          {active && !isEmpty && (
            <Buttons>
              <Button onClick={onAddNewLine} title={t("component.options.createNewLine")}>
                <Icon type="enter" />
              </Button>
            </Buttons>
          )}
        </WrapperIn>
        {active && <Label>{line.type}</Label>}
      </Wrapper>
    );
  }
}

MathEssayInputLine.propTypes = {
  line: PropTypes.object,
  item: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onAddNewLine: PropTypes.func.isRequired,
  onChangeType: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired
};

MathEssayInputLine.defaultProps = {
  line: {
    text: "",
    type: "text"
  }
};

const enhance = compose(
  withNamespaces("assessment"),
  enhanceWithClickOutside
);

export default enhance(MathEssayInputLine);
