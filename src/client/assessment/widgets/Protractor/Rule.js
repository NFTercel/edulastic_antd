import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import Rnd from "react-rnd-rotate";

import RotateProtractorImg from "./assets/rotate.svg";
import { Image } from "./styled/Image";

const Rule = ({ width, height, showRotate, smallSize }) => {
  const [position, setPosition] = useState({
    x: smallSize ? 0 : 200,
    y: 0
  });

  const size = smallSize ? { width: 350, height: 160 } : { width, height };

  const handleRotateStyles = {
    display: showRotate ? "block" : "none",
    width: 25,
    height: 47,
    left: -30,
    bottom: 0,
    top: "none",
    marginLeft: 0,
    border: "none",
    backgroundImage: `url(${RotateProtractorImg})`,
    backgroundSize: "contain"
  };

  return (
    <Rnd
      size={size}
      position={{ x: position.x, y: position.y }}
      onDragStop={(e, d) => {
        setPosition({ x: d.x, y: d.y });
      }}
      resizeHandleStyles={{
        rotate: handleRotateStyles
      }}
    >
      <Image width={size.width} height={size.height} />
    </Rnd>
  );
};

Rule.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  showRotate: PropTypes.bool,
  smallSize: PropTypes.bool
};

Rule.defaultProps = {
  width: 530,
  height: 265,
  showRotate: true,
  smallSize: false
};

export default memo(Rule);
