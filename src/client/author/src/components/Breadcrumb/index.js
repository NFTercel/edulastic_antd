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
  top: 80px;
  text-transform: uppercase;

  .ant-breadcrumb-link,
  .ant-breadcrumb-separator {
    font-size: 11px;
    font-weight: 600;
    color: #00b0ff;

    a {
      color: #00b0ff;
    }
  }

  .anticon-left {
    margin-right: 5px;
  }
`;
