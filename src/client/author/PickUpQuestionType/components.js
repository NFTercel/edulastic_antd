import styled from "styled-components";

export const RoundDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(16.67% - 20px);
  margin: 0px 0px 27px 0px;
  background-color: #0288d1;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;

  @media (max-width: 2048px) {
    width: calc(25% - 20px);
  }
  @media (max-width: 1460px) {
    width: calc(33% - 20px);
  }
  @media (max-width: 1024px) {
    width: calc(50% - 20px);
  }
  @media (max-width: 480px) {
    width: 100%;
  }

  &:hover {
    background-color: #255681;
  }
`;

export const Header = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: white;
  font-family: Open Sans;
  font-size: 16px;
  font-weight: bold;
`;

export const Content = styled.div`
  width: calc(100% + 3px);
  flex: 1 1 auto;
  padding: 11px -1px 0px -1px;
  user-select: none;
  position: relative;
  cursor: pointer;
  overflow: hidden;
`;

export const StyledPreviewImage = styled.img`
  width: 100%;
  height: 100%;
  user-select: none;
  pointer-events: none;
  object-fit: contain;
`;

export const QuestionText = styled.div`
  font-size: 14px;
  font-weight: bold;
  padding: 10px 0;
`;

export const Dump = styled.div`
  width: calc(12.5% - 20px);
  height: 0px;

  @media (max-width: 1820px) {
    width: calc(25% - 20px);
  }
  
  @media (max-width: 1460px) {
    width: calc(33% - 20px);
  }
  
  @media (max-width: 1024px) {
    width: calc(50% - 20px);
  }
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;
