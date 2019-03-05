import React, { Component } from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { withNamespaces } from "@edulastic/localization";
import { MoveLink } from "@edulastic/common";
import { MAX_TAB_WIDTH } from "../../../src/constants/others";
import {
  Container,
  Categories,
  CategoryContent,
  CategoryName,
  Detail,
  DetailCategory,
  GreenText,
  GreyText,
  Label,
  LabelText,
  Question,
  QuestionContent,
  TypeCategory,
  ViewButton,
  ViewButtonStyled,
  HeartIcon,
  ShareIcon
} from "./styled";

const details = [
  {
    name: "By:",
    text: "Kevin Hart"
  },
  {
    name: "ID:",
    text: "123456"
  },
  {
    name: <ShareIcon />,
    text: "9578 (1)",
    textType: "grey"
  },
  {
    name: <HeartIcon />,
    text: "9",
    textType: "grey"
  }
];
// render single item
class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    windowWidth: PropTypes.number.isRequired,
    types: PropTypes.array.isRequired
  };

  moveToItem = () => {
    const { history, item, t } = this.props;
    history.push({
      pathname: `/author/items/${item._id}/item-detail`,
      state: {
        backText: t("component.itemAdd.backToItemList"),
        backUrl: "/author/items",
        itemDetail: true
      }
    });
  };

  get description() {
    const { item } = this.props;
    return get(item, "rows[0].widgets[0].entity.stimulus", "");
  }

  renderTypes = () => {
    const { types } = this.props;

    return types.map(type => (
      <Label key={type}>
        <LabelText>{type}</LabelText>
      </Label>
    ));
  };

  renderDetails = () =>
    details.map(detail => (
      <DetailCategory>
        <CategoryName>{detail.name}</CategoryName>
        <CategoryContent>
          {detail.textType === "grey" ? <GreyText>{detail.text}</GreyText> : <GreenText>{detail.text}</GreenText>}
        </CategoryContent>
      </DetailCategory>
    ));

  render() {
    const { item, t, windowWidth } = this.props;

    return (
      <Container>
        <Question>
          <QuestionContent>
            <MoveLink onClick={this.moveToItem}>{item._id}</MoveLink>
            <div dangerouslySetInnerHTML={{ __html: this.description }} />
          </QuestionContent>
          {windowWidth > MAX_TAB_WIDTH && (
            <ViewButton>
              <ViewButtonStyled onClick={this.moveToItem}>{t("component.item.view")}</ViewButtonStyled>
            </ViewButton>
          )}
        </Question>
        <Detail>
          <TypeCategory>
            <CategoryName>Type:</CategoryName>
            <CategoryContent>{this.renderTypes()}</CategoryContent>
          </TypeCategory>
          <Categories>{this.renderDetails()}</Categories>
        </Detail>
        {windowWidth < MAX_TAB_WIDTH && (
          <ViewButton>
            <ViewButtonStyled onClick={this.moveToItem}>{t("component.item.view")}</ViewButtonStyled>
          </ViewButton>
        )}
      </Container>
    );
  }
}

export default withNamespaces("author")(Item);
