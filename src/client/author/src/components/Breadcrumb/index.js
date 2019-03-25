import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Breadcrumb } from "antd";
import styled from "styled-components";
import { secondaryTextColor } from "@edulastic/colors";

const BreadCrumb = props => {
  const { data, style } = props;
  return (
    <Container style={style}>
      <Breadcrumb>
        {Array.isArray(data) &&
          data.map((breadCrumb, index) => (
            <Breadcrumb.Item key={`bread${index}`}>
              {index !== data.length - 1 ? (
                <Link to={breadCrumb.to}>{breadCrumb.title.toLowerCase()}</Link>
              ) : (
                breadCrumb.title.toLowerCase()
              )}
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

  .ant-breadcrumb-separator {
    margin: 0 3px 0 7px;
  }

  .ant-breadcrumb-link,
  .ant-breadcrumb-separator {
    font-size: 16px;
    font-weight: 600;
    color: ${secondaryTextColor};
    text-transform: capitalize;
    font-weight: 700;

    a {
      font-size: 16px;
      text-transform: capitalize;
      color: ${secondaryTextColor};
      font-weight: normal;
    }
  }

  .anticon-left {
    margin-right: 5px;
  }
`;
