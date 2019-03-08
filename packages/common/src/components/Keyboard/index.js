import React from "react";
import PropTypes from "prop-types";

import DeleteIco from "./assets/delete.svg";
import UpIco from "./assets/up.svg";
import ShiftIco from "./assets/shift.svg";
import LeftIco from "./assets/left.svg";
import DownIco from "./assets/down.svg";
import RightIco from "./assets/right.svg";
import { Wrapper } from "./styled/Wrapper";
import { Row } from "./styled/Row";
import { Button } from "./styled/Button";

class Keyboard extends React.PureComponent {
  state = {
    isUpper: false
  };

  buttonClickHandler(e) {
    const { key } = e.target.dataset;
    const { isUpper } = this.state;
    const { onInput } = this.props;

    if (key === "shift") {
      this.setState({
        isUpper: !isUpper
      });
      return;
    }

    onInput(key);
  }

  render() {
    const { isUpper } = this.state;
    const getChar = char => (isUpper ? char.toUpperCase() : char.toLowerCase());
    return (
      <Wrapper onClick={this.buttonClickHandler}>
        <Row>
          <Button data-key="1">1</Button>
          <Button data-key="2">2</Button>
          <Button data-key="3">3</Button>
          <Button data-key="4">4</Button>
          <Button data-key="5">5</Button>
          <Button data-key="6">6</Button>
          <Button data-key="7">7</Button>
          <Button data-key="8">8</Button>
          <Button data-key="9">9</Button>
          <Button data-key="0">0</Button>
          <Button data-key="Backspace">
            <img data-key="Backspace" src={DeleteIco} alt="delete" />
          </Button>
        </Row>
        <Row>
          <Button data-key={getChar("q")}>{getChar("q")}</Button>
          <Button data-key={getChar("w")}>{getChar("w")}</Button>
          <Button data-key={getChar("e")}>{getChar("e")}</Button>
          <Button data-key={getChar("r")}>{getChar("r")}</Button>
          <Button data-key={getChar("t")}>{getChar("t")}</Button>
          <Button data-key={getChar("y")}>{getChar("y")}</Button>
          <Button data-key={getChar("u")}>{getChar("u")}</Button>
          <Button data-key={getChar("i")}>{getChar("i")}</Button>
          <Button data-key={getChar("o")}>{getChar("o")}</Button>
          <Button data-key={getChar("p")}>{getChar("p")}</Button>
        </Row>
        <Row>
          <Button data-key={getChar("a")}>{getChar("a")}</Button>
          <Button data-key={getChar("s")}>{getChar("s")}</Button>
          <Button data-key={getChar("d")}>{getChar("d")}</Button>
          <Button data-key={getChar("f")}>{getChar("f")}</Button>
          <Button data-key={getChar("g")}>{getChar("g")}</Button>
          <Button data-key={getChar("h")}>{getChar("h")}</Button>
          <Button data-key={getChar("j")}>{getChar("j")}</Button>
          <Button data-key={getChar("k")}>{getChar("k")}</Button>
          <Button data-key={getChar("l")}>{getChar("l")}</Button>
          <Button data-key=":">:</Button>
        </Row>
        <Row>
          <Button data-key={getChar("z")}>{getChar("z")}</Button>
          <Button data-key={getChar("x")}>{getChar("x")}</Button>
          <Button data-key={getChar("c")}>{getChar("c")}</Button>
          <Button data-key={getChar("v")}>{getChar("v")}</Button>
          <Button data-key={getChar("b")}>{getChar("b")}</Button>
          <Button data-key={getChar("n")}>{getChar("n")}</Button>
          <Button data-key={getChar("m")}>{getChar("m")}</Button>
          <Button data-key=",">,</Button>
          <Button data-key=".">.</Button>
          <Button data-key="up_move">
            <img data-key="up_move" src={UpIco} alt="up arrow" />
          </Button>
        </Row>
        <Row>
          <Button data-key="shift" className={isUpper ? "active" : ""} width={100}>
            <img data-key="shift" src={ShiftIco} alt="shift" />
          </Button>
          <Button data-key=" " width={300}>
            space
          </Button>
          <Button data-key="left_move">
            <img data-key="left_move" src={LeftIco} alt="arrow left" />
          </Button>
          <Button data-key="down_move">
            <img data-key="down_move" src={DownIco} alt="arrow down" />
          </Button>
          <Button data-key="right_move">
            <img data-key="right_move" src={RightIco} alt="arrow right" />
          </Button>
        </Row>
      </Wrapper>
    );
  }
}

Keyboard.propTypes = {
  onInput: PropTypes.func.isRequired
};

export default Keyboard;
