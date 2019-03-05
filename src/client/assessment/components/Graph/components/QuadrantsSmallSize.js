import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SmallSizeQuadrantsImage from "../../../assets/small-size-quadrants.png";
import SmallSizeQuadrantsFirstImage from "../../../assets/small-size-quadrants-first.png";

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

class QuadrantsSmallSize extends Component {
  render() {
    const { first } = this.props;

    return (
      <Container>
        {first ? (
          <img src={SmallSizeQuadrantsFirstImage} alt="quadrants first" width="100%" height="100%" />
        ) : (
          <img src={SmallSizeQuadrantsImage} alt="quadrants" width="100%" height="100%" />
        )}
      </Container>
    );
  }
}

QuadrantsSmallSize.propTypes = {
  first: PropTypes.bool
};

QuadrantsSmallSize.defaultProps = {
  first: false
};

export default QuadrantsSmallSize;
