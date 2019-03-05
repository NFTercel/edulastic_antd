import styled from "styled-components";

const AssignmentContentWrapper = styled.div`
  border-radius: 10px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);
  padding: 5px 30px;
  background: ${props => props.theme.assignment.cardContainerBgColor};
  margin-bottom: 1rem;
  @media screen and (max-width: 767px) {
    padding: 0px 15px;
  }
`;

export default AssignmentContentWrapper;
