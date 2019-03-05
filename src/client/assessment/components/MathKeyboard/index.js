import * as React from "react";
import { Button, Icon, Select } from "antd";
import PropTypes from "prop-types";
import { isObject } from "lodash";

import { math } from "@edulastic/constants";

import { KEYBOARD_BUTTONS } from "../../constants/keyboardButtons";
import { NUMBER_PAD_ITEMS } from "../../constants/numberPadItems";

import Keyboard from "../Keyboard";

import { MathKeyboardStyles } from "./styled/MathKeyboardStyles";

const { EMBED_RESPONSE } = math;

class MathKeyboard extends React.PureComponent {
  state = {
    dropdownOpened: false,
    // eslint-disable-next-line react/destructuring-assignment
    type: this.props.symbols[0]
  };

  close = () => {
    const { onClose } = this.props;
    onClose();
  };

  handleGroupSelect = value => {
    this.setState({
      type: value
    });
  };

  renderButtons = () => {
    const { onInput } = this.props;
    const { type } = this.state;

    return this.keyboardButtons.map(({ label, handler, command = "cmd", types }, i) => {
      if (types.includes(type)) {
        return (
          <Button key={i} className="num num--type-3" onClick={() => onInput(handler, command)}>
            {label}
          </Button>
        );
      }

      return null;
    });
  };

  get keyboardButtons() {
    const { symbols } = this.props;

    return KEYBOARD_BUTTONS.map(btn => {
      symbols.forEach(symbol => {
        if (isObject(symbol) && symbol.value.includes(btn.handler)) {
          btn.types.push(symbol.label);
        }
      });

      return btn;
    });
  }

  get selectOptions() {
    const { symbols } = this.props;

    return symbols.map(symbol => {
      if (typeof symbol === "string") {
        return math.symbols.find(opt => opt.value === symbol);
      }

      if (isObject(symbol)) {
        return {
          value: symbol.label,
          label: symbol.label
        };
      }

      return symbol;
    });
  }

  get numberPadItems() {
    const { numberPad } = this.props;

    if (!numberPad) {
      return [];
    }

    return numberPad.map(num => {
      const res = NUMBER_PAD_ITEMS.find(({ value }) => num === value);
      return res || { value: "", label: "" };
    });
  }

  render() {
    const { dropdownOpened, type } = this.state;
    const { onInput, showResponse, symbols } = this.props;

    return (
      <MathKeyboardStyles>
        <div className="keyboard">
          <div className="keyboard__header">
            <div>
              <Select
                defaultValue={symbols[0]}
                className="keyboard__header__select"
                size="large"
                onSelect={this.handleGroupSelect}
                onDropdownVisibleChange={open => {
                  this.setState({ dropdownOpened: open });
                }}
                suffixIcon={
                  <Icon className="keyboard__dropdown-icon" type={dropdownOpened ? "up" : "down"} theme="outlined" />
                }
              >
                {this.selectOptions.map(({ value, label }, index) => (
                  <Select.Option value={value} key={index}>
                    {label}
                  </Select.Option>
                ))}
              </Select>
              {showResponse && (
                <span className="response-embed" style={{ cursor: "pointer" }} onClick={() => onInput(EMBED_RESPONSE)}>
                  <span className="response-embed__char">R</span>
                  <span className="response-embed__text">Response</span>
                </span>
              )}
            </div>
          </div>
          <br />
          {type === "qwerty" && <Keyboard onInput={onInput} />}
          {type !== "qwerty" && (
            <div className="keyboard__main">
              <div className="half-box">
                {this.numberPadItems.map((item, index) => (
                  <Button
                    disabled={!item.value}
                    key={index}
                    className="num num--type-1"
                    onClick={() => onInput(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
              <div className="keyboard__types3 half-box">{this.renderButtons()}</div>
            </div>
          )}
        </div>
      </MathKeyboardStyles>
    );
  }
}

MathKeyboard.propTypes = {
  onClose: PropTypes.func.isRequired,
  onInput: PropTypes.func.isRequired,
  showResponse: PropTypes.bool,
  symbols: PropTypes.array.isRequired,
  numberPad: PropTypes.array.isRequired
};

MathKeyboard.defaultProps = {
  showResponse: false
};

export default MathKeyboard;
