import React, { Component } from "react";
import styled from "styled-components";
import { white } from "@edulastic/colors";
import { IconClockCircularOutline } from "@edulastic/icons";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: 0,
      minute: 0,
      second: 0
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.myTimer();
    }, 1000);
  }

  myTimer = () => {
    const { hour, minute, second } = this.state;
    this.setState({ second: second + 1 });
    if (second + 1 === 60) {
      this.setState({ minute: minute + 1, second: 0 });
    }

    if (minute + 1 === 60) {
      this.setState({ hour: hour + 1, minute: 0 });
    }
  };

  formatNum = num => (num > 9 ? num : `0${num}`);

  render() {
    const { hour, minute, second } = this.state;
    return (
      <Container>
        <ClockCircularOutlineIcon />
        <MainClock>{`${this.formatNum(hour)}:${this.formatNum(minute)}:${this.formatNum(second)}`}</MainClock>
      </Container>
    );
  }
}

export default Clock;

const Container = styled.div`
  margin-left: 60px;
  display: flex;
`;

const ClockCircularOutlineIcon = styled(IconClockCircularOutline)`
  fill: ${white};
  width: 22px;
  height: 22px;
  &:hover {
    fill: ${white};
  }
`;

const MainClock = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${white};
  margin-left: 10px;
  letter-spacing: 0.7px;
`;
