import React, { useContext } from "react";
import PropTypes from "prop-types";

import { NumberPadContext } from "..";
import { ButtonWrapper } from "../styled/ButtonWrapper";
import NumberPadButton from "./NumberPadButton";

const CharacterMap = ({ onClick }) => {
  const items = useContext(NumberPadContext);

  return (
    <ButtonWrapper style={{ flexWrap: "wrap" }}>
      {items.map((item, index) => (
        <NumberPadButton onClick={() => onClick(item.value)} key={index}>
          {item.label}
        </NumberPadButton>
      ))}
    </ButtonWrapper>
  );
};

CharacterMap.propTypes = {
  onClick: PropTypes.func
};

CharacterMap.defaultProps = {
  onClick: () => {}
};

export default CharacterMap;
