import React from "react";
import PropTypes from "prop-types";
import { Tag } from "antd";
import { FlexContainer } from "@edulastic/common";
import { IconShare, IconHeart } from "@edulastic/icons";
import { greenDark, textColor, grey, white } from "@edulastic/colors";
import { FirstText, CategoryTitle, SecondText, TypeContainer } from "./styled";
import Tags from "../../../../../../src/components/common/Tags";

const MetaInfoCell = ({ data }) => (
  <FlexContainer justifyContent="space-between" style={{ fontWeight: 600, color: textColor, flexWrap: "wrap" }}>
    <div>
      <FlexContainer>
        <TypeContainer>
          {data.standards && !!data.standards.length && (
            <FlexContainer>
              <Tags
                tags={data.standards}
                labelStyle={{
                  color: greenDark,
                  background: white,
                  border: `1px solid ${grey}`
                }}
              />
            </FlexContainer>
          )}
          {data.types && !!data.types.length && (
            <FlexContainer>
              <CategoryTitle>Type: </CategoryTitle>
              {data.types.map(type => (
                <Tag color="cyan" key={type} style={{ marginTop: 3 }}>
                  {type}
                </Tag>
              ))}
            </FlexContainer>
          )}
        </TypeContainer>
        <div>
          <CategoryTitle>By:</CategoryTitle> <FirstText>{data.by}</FirstText>
        </div>
        <div>
          <CategoryTitle>ID:</CategoryTitle> <FirstText>{data._id}</FirstText>
        </div>
        <FlexContainer style={{ marginTop: 2 }}>
          <IconShare color={greenDark} width={16} height={16} /> <SecondText>{data.shared}</SecondText>
        </FlexContainer>
        <FlexContainer style={{ marginTop: 2 }}>
          <IconHeart color={greenDark} width={16} height={16} /> <SecondText>{data.likes}</SecondText>
        </FlexContainer>
      </FlexContainer>
    </div>
  </FlexContainer>
);

MetaInfoCell.propTypes = {
  data: PropTypes.object.isRequired
};

export default MetaInfoCell;
