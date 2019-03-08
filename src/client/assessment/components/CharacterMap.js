import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { grey, lightGrey } from "@edulastic/colors";
import { withNamespaces } from "@edulastic/localization";

const CharacterMap = ({ characters, onSelect, style, t }) => {
  if (!Array.isArray(characters)) {
    return null;
  }

  const filteredCharacters = characters.filter(char => !!char.trim());

  return (
    <Wrapper style={style}>
      <Title>{t("component.options.characterMap")}</Title>
      <CharactersWrapper>
        {filteredCharacters.map((char, i) => (
          <Char key={i} onClick={() => onSelect(char)}>
            {char}
          </Char>
        ))}
      </CharactersWrapper>
    </Wrapper>
  );
};

CharacterMap.propTypes = {
  characters: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  style: PropTypes.object
};

CharacterMap.defaultProps = {
  style: {}
};

export default withNamespaces("assessment")(CharacterMap);

const Wrapper = styled.div`
  min-width: 150px;
  background: ${lightGrey};
`;

const CharactersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Title = styled.div`
  font-weight: 700;
  margin: 10px 0;
  text-align: center;
  user-select: none;
`;

const Char = styled.div`
  padding: 10px;
  width: 20%;
  cursor: pointer;
  border: 1px solid ${grey};
  background: ${lightGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  :hover {
    background: ${grey};
  }
`;
