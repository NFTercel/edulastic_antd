import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { ToolbarItem } from "../styled/ToolbarItem";
import CharacterMap from "../../../components/CharacterMap";

const Character = ({ characters, onSelect }) => {
  const [show, setShow] = useState(false);

  return (
    <Wrapper>
      <ToolbarItem onClick={() => setShow(!show)}>á</ToolbarItem>
      {show && (
        <CharacterMap
          characters={characters}
          onSelect={onSelect}
          style={{ position: "absolute", border: "1px solid #e6e6e6", right: 0, zIndex: 1000 }}
        />
      )}
    </Wrapper>
  );
};

Character.propTypes = {
  onSelect: PropTypes.func.isRequired,
  characters: PropTypes.array.isRequired
};

export default Character;

const Wrapper = styled.div`
  position: relative;
`;
