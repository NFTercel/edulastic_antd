import React from "react";
import { Icon } from "antd";
import { Link, CloseModal, LinksWrapper, NavigationWrapper } from "./styled";

const BottomNavigation = ({ prevStudent, nextStudent, prevQuestion, nextQuestion, hideModal }) => (
  <NavigationWrapper>
    <div
      style={{
        display: "flex",
        justifyContent: "row",
        alignItems: "center",
        fontWeight: 500
      }}
    >
      <Icon type="info-circle" />
      &nbsp; USE THE KEYBOARDS ARROW TO NAVIGATE BETWEEN THE SCREENS
    </div>
    <LinksWrapper>
      <Link onClick={() => prevStudent()}>
        <Icon type="up" />
        &nbsp; PREV STUDENT &nbsp;
      </Link>
      <Link onClick={() => nextStudent()}>
        <Icon type="down" />
        &nbsp; NEXT STUDENT &nbsp;
      </Link>
      <Link onClick={() => prevQuestion()}>
        <Icon type="left" />
        &nbsp; PREV QUESTION &nbsp;
      </Link>
      <Link onClick={() => nextQuestion()}>
        &nbsp; NEXT QUESTION &nbsp;
        <Icon type="right" />
      </Link>
      <CloseModal onClick={() => hideModal()}>
        <Icon type="close" width={5} height={5} />
        <span style={{ fontSize: 11, marginLeft: 15 }}>EXIT</span>
      </CloseModal>
    </LinksWrapper>
  </NavigationWrapper>
);

export default BottomNavigation;
