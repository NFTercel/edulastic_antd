import React from "react";
import styled from "styled-components";

// components
import Breadcrumb from "../../sharedComponents/Breadcrumb";

const breadcrumbData = [{ title: "MANAGE CLASS", to: "" }];

const ManageClassSubHeader = () => {
  return (
    <Wrapper>
      <BreadcrumbWrapper>
        <Breadcrumb data={breadcrumbData} />
      </BreadcrumbWrapper>
    </Wrapper>
  );
};

export default ManageClassSubHeader;

const Wrapper = styled.div`
  display: flex;
  margin-top: 24px;
  justify-content: space-between;
  margin-left: 30px;
  margin-right: 40px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const BreadcrumbWrapper = styled.div`
  .ant-breadcrumb-link {
    color: ${props => props.theme.breadcrumbs.breadcrumbTextColor};
    font-size: ${props => props.theme.breadcrumbs.breadcrumbTextSize};
    text-transform: uppercase;
    font-weight: 600;
    a {
      color: ${props => props.theme.breadcrumbs.breadcrumbLinkColor};
    }
  }
`;
