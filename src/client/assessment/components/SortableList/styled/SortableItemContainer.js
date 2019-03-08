import styled from "styled-components";

export const SortableItemContainer = styled.div`
  width: 100%;
  height: 50px;
  margin: 10px 0;
  display: flex;
  align-items: center;

  & div.main {
    border-radius: 10px;
    border: solid 1px #dfdfdf;
    margin-right: 10px;
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
  }
  & div.main i.fa-align-justify {
    color: #1fe3a1;
    font-size: 16px;
    padding: 15px;
  }
  & div.main div {
    border-left: solid 1px #dfdfdf;
    padding: 10px 30px;
    flex: 1;
    height: 100%;
    display: flex;
    box-sizing: border-box;
  }

  & div.main input {
    font-size: 13px;
    line-height: 1.38;
    letter-spacing: 1px;
    text-align: left;
    color: #7a7a7a;
    border: none;
    padding: 0 10px;
  }
`;
