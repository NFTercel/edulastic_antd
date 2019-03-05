import styled from "styled-components";

export const ZoneTitle = styled.div`
  font-size: ${({ theme, isComment }) =>
    isComment ? theme.styledDropZone.zoneTitleCommentFontSize : theme.styledDropZone.zoneTitleFontSize};
  font-weight: ${props => props.theme.styledDropZone.zoneTitleFontWeight};
  text-transform: uppercase;
  color: ${({ theme, altColor }) =>
    altColor ? theme.styledDropZone.zoneTitleAltColor : theme.styledDropZone.zoneTitleColor};
  margin-top: ${({ isComment }) => (isComment ? 12 : 0)}px;
`;
