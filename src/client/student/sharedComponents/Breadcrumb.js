import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Breadcrumb, Icon } from "antd";
import styled from "styled-components";

const BreadCrumb = props => {
  const { data, style } = props;
  return (
    <Container style={style}>
      <Breadcrumb>
        {Array.isArray(data) &&
          data.map((breadCrumb, index) => (
            <Breadcrumb.Item key={`bread${index}`}>
              {index === 0 && <Icon key={index} type="left" style={{ fontSize: 11 }} />}
              {index !== data.length - 1 ? <Link to={breadCrumb.to}>{breadCrumb.title}</Link> : breadCrumb.title}
            </Breadcrumb.Item>
          ))}
      </Breadcrumb>
    </Container>
  );
};

BreadCrumb.propTypes = {
  data: PropTypes.array.isRequired,
  style: PropTypes.object
};

BreadCrumb.defaultProps = {
  style: {}
};

export default BreadCrumb;

const Container = styled.div`
  position: fixed;
  top: 88px;
  text-transform: uppercase;

  .ant-breadcrumb-link,
  .ant-breadcrumb-separator {
    font-size: ${props => props.theme.breadcrumbs.breadcrumbTextSize};
    font-weight: 600;
    color: ${props => props.theme.breadcrumbs.breadcrumbTextColor};

    a {
      color: ${props => props.theme.breadcrumbs.breadcrumbLinkColor};
    }
  }

  .anticon-left {
    margin-right: 5px;
  }
  @media screen and (max-width: 768px) {
    top: 120px;
  }
`;
