import React from "react";
import PropTypes from "prop-types";
import { FlexContainer } from "@edulastic/common";
import { greenDark } from "@edulastic/colors";
import { Input, Select } from "antd";
import { IconHeart, IconShare } from "@edulastic/icons";
import { Block, Avatar, MainTitle, Title, TitleContent } from "./styled";
import { Photo, selectsData } from "../../../common";

const Sidebar = ({ title, description, onChangeField, tags, analytics, createdBy, windowWidth }) => (
  <FlexContainer flexDirection="column">
    <Block>
      <Photo />
      <FlexContainer>
        <Avatar>{createdBy && createdBy.firstName ? createdBy.firstName[0] : "E"}</Avatar>
        <FlexContainer flexDirection="column" alignItems="flex-start" style={{ marginLeft: 20 }}>
          <Title>Created by:</Title>
          <TitleContent>
            {createdBy && createdBy.firstName} {createdBy && createdBy.lastName}
          </TitleContent>
        </FlexContainer>
      </FlexContainer>
    </Block>
    <Block>
      <MainTitle>Assessment Name</MainTitle>
      <Input
        value={title}
        data-cy="inputTest"
        onChange={e => onChangeField("title", e.target.value)}
        size="large"
        placeholder="Enter an assessment name"
        style={{ marginBottom: 25 }}
      />
      <MainTitle>Description</MainTitle>
      <Input.TextArea
        value={description}
        onChange={e => onChangeField("description", e.target.value)}
        size="large"
        placeholder="Enter a description"
        style={{ marginBottom: 25 }}
      />
      <MainTitle>Tags</MainTitle>
      <Select
        mode="multiple"
        size="large"
        style={{ width: "100%" }}
        placeholder="Please select"
        defaultValue={tags}
        onChange={value => onChangeField("tags", value)}
      >
        {selectsData.allTags.map(({ value, text }) => (
          <Select.Option key={value} value={value}>
            {text}
          </Select.Option>
        ))}
      </Select>
    </Block>
    <Block>
      <FlexContainer
        justifyContent="space-between"
        alignItems={windowWidth < 468 && "self-start"}
        style={{ flexDirection: windowWidth < 468 ? "column" : "row" }}
      >
        <FlexContainer style={{ marginBottom: 15 }}>
          <IconHeart color={greenDark} width={16} height={16} />
          <FlexContainer>
            <Title>Liked:</Title>
            <TitleContent>{analytics && analytics.likes} times</TitleContent>
          </FlexContainer>
        </FlexContainer>
        <FlexContainer style={{ marginBottom: 15 }}>
          <IconShare color={greenDark} width={16} height={16} />
          <FlexContainer>
            <Title>Shared:</Title>
            <TitleContent>{analytics && analytics.usage} times, since July 5, 2016</TitleContent>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
      <FlexContainer>
        <IconHeart color={greenDark} width={16} height={16} />
        <FlexContainer>
          <Title>Collection:</Title>
          <TitleContent>Public Library</TitleContent>
        </FlexContainer>
      </FlexContainer>
    </Block>
  </FlexContainer>
);

Sidebar.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  onChangeField: PropTypes.func.isRequired,
  analytics: PropTypes.array.isRequired,
  createdBy: PropTypes.object.isRequired,
  windowWidth: PropTypes.number.isRequired
};

export default Sidebar;
