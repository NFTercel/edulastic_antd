import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AxisImage from "../../../assets/axis.png";

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  width: 100%;
  flex: 0 1 68%;
  padding: 33px 34px 36px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Bottom = styled.div`
  width: 100%;
  flex: 0 1 32%;
  background-color: #efefef;
  display: flex;
  flex-direction: row;
  justify-content: ${props => (props.justifyContent ? props.justifyContent : "space-between")};
  align-items: center;
  padding: 0 24px;
`;

const UnderAxis = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Segment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: ${props => (props.marginTop ? props.marginTop : 0)}px;
`;

const Circle = styled.div`
  width: ${props => props.diameter}px;
  height: ${props => props.diameter}px;
  background: ${props => (props.bgColor ? props.bgColor : "transparent")};
  border: 2px solid ${props => props.color};
  border-radius: 50%;
`;

const Line = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background: ${props => props.color};
`;

const Label = styled.div`
  font-size: 11px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.36;
  letter-spacing: 0.2px;
  text-align: center;
  color: #444444;
  background: #ffffff;
  border: 1px solid #efefef;
  border-radius: 5px;
  padding: ${props => props.padding};
`;

class AxisSmallSize extends Component {
  render() {
    const { labels, segments } = this.props;
    return (
      <Container>
        <Top>
          {segments && (
            <UnderAxis>
              <Segment marginTop="11">
                <Circle diameter="8" bgColor="#00b0ff" color="#00b0ff" />
                <Line width="58" height="2" color="#00b0ff" />
                <Circle diameter="8" bgColor="#00b0ff" color="#00b0ff" />
              </Segment>
              <Segment marginTop="11">
                <Circle diameter="8" bgColor="#00b0ff" color="#00b0ff" />
                <Line width="58" height="2" color="#00b0ff" />
                <Circle diameter="8" bgColor="#00b0ff" color="#00b0ff" />
              </Segment>
            </UnderAxis>
          )}
          {labels && (
            <UnderAxis>
              <Label padding="8px 21px 7px 20px">OPTION A</Label>
              <Label padding="8px 21px 7px 20px">OPTION C</Label>
            </UnderAxis>
          )}
          <img src={AxisImage} alt="axis" width="100%" height="auto" />
        </Top>
        {segments && (
          <Bottom>
            <Segment>
              <Circle diameter="10" bgColor="#434b5d" color="#434b5d" />
            </Segment>
            <Segment>
              <Circle diameter="10" bgColor="#434b5d" color="#434b5d" />
              <Line width="23" height="2" color="#434b5d" />
              <Circle diameter="10" bgColor="#434b5d" color="#434b5d" />
            </Segment>
            <Segment>
              <Circle diameter="10" color="#434b5d" />
              <Line width="23" height="2" color="#434b5d" />
              <Circle diameter="10" bgColor="#434b5d" color="#434b5d" />
            </Segment>
            <Segment>
              <Circle diameter="10" bgColor="#434b5d" color="#434b5d" />
              <Line width="23" height="2" color="#434b5d" />
              <Circle diameter="10" color="#434b5d" />
            </Segment>
            <Segment>
              <Circle diameter="10" color="#434b5d" />
              <Line width="23" height="2" color="#434b5d" />
              <Circle diameter="10" color="#434b5d" />
            </Segment>
          </Bottom>
        )}
        {labels && (
          <Bottom justifyContent="center">
            <Label padding="13px 21px 12px 23px">OPTION B</Label>
          </Bottom>
        )}
      </Container>
    );
  }
}

AxisSmallSize.propTypes = {
  labels: PropTypes.bool,
  segments: PropTypes.bool
};

AxisSmallSize.defaultProps = {
  labels: false,
  segments: false
};

export default AxisSmallSize;
