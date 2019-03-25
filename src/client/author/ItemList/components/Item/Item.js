import React, { Component } from "react";
import PropTypes from "prop-types";
import { IconPlus } from "@edulastic/icons";
import { get } from "lodash";
import { withNamespaces } from "@edulastic/localization";
import { MoveLink, MathFormulaDisplay } from "@edulastic/common";
import { MAX_TAB_WIDTH } from "../../../src/constants/others";
import {
  Container,
  Categories,
  CategoryContent,
  CategoryName,
  Detail,
  DetailCategory,
  Text,
  Label,
  LabelText,
  Question,
  QuestionContent,
  TypeCategory,
  ViewButton,
  ViewButtonStyled,
  AddButtonStyled,
  HeartIcon,
  ShareIcon,
  Count,
  UserIcon,
  IdIcon,
  StandardContent,
  LabelStandard,
  LabelStandardText,
  CountGreen
} from "./styled";

const details = [
  {
    name: <UserIcon />,
    text: "Kevin Hart"
  },
  {
    name: <IdIcon />,
    text: "123456"
  },
  {
    name: <ShareIcon />,
    text: "9578 (1)"
  },
  {
    name: <HeartIcon />,
    text: "9"
  }
];

const standards = [
  {
    name: `7.G.1`
  },
  {
    name: `7.G.A.1`
  },
  {
    name: `7.G.1`
  },
  {
    name: `7.G.A.1`
  },
  {
    name: `7.G.1`
  },
  {
    name: `7.G.A.1`
  },
  {
    name: `7.G.1`
  },
  {
    name: `7.G.A.1`
  },
  {
    name: `7.G.1`
  },
  {
    name: `7.G.A.1`
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
    const { types, item } = this.props;
    const itemTypes = [];

    if (item.data && item.data.questions) {
      item.data.questions.map(({ type }) => {
        const index = itemTypes.findIndex(({ name }) => name === type);

        if (index >= 0) {
          itemTypes[index].count++;
        } else {
          itemTypes.push({
            name: type,
            count: 1
          });
        }

        return itemTypes;
      });
    }

    return itemTypes.length
      ? itemTypes.map(({ name, count }) => (
          <React.Fragment key={`TypeName_${name}`}>
            <Label>
              <LabelText>{name}</LabelText>
            </Label>
            {count > 1 ? <Count>+{count}</Count> : null}
          </React.Fragment>
        ))
      : types.map(type => (
          <Label key={`TypeName_${type}`}>
            <LabelText>{type}</LabelText>
          </Label>
        ));
  };

  renderDetails = () =>
    details.map((detail, index) => (
      <DetailCategory key={`DetailCategory_${index}`}>
        <CategoryName>{detail.name}</CategoryName>
        <CategoryContent>
          <Text>{detail.text}</Text>
        </CategoryContent>
      </DetailCategory>
    ));

  renderStandards = () => {
    const outStandardsCount = 3;
    const { item } = this.props;

    return standards.map((standard, index) =>
      index + 1 <= outStandardsCount ? (
        <LabelStandard key={`Standard_${standard.name}_${index}`}>
          <LabelStandardText>{standard.name}</LabelStandardText>
        </LabelStandard>
      ) : (
        index + 1 === standards.length && (
          <CountGreen key={`Count_${item._id}`}>+{standards.length - outStandardsCount}</CountGreen>
        )
      )
    );
  };

  render() {
    const { item, t, windowWidth } = this.props;

    const questionText = get(item, "data.questions[0].stimulus", undefined);
    return (
      <Container>
        <Question>
          <QuestionContent>
            <MoveLink onClick={this.moveToItem}>{questionText || item._id}</MoveLink>
            <MathFormulaDisplay dangerouslySetInnerHTML={{ __html: this.description }} />
          </QuestionContent>
          {windowWidth > MAX_TAB_WIDTH && (
            <ViewButton>
              <ViewButtonStyled onClick={this.moveToItem}>{t("component.item.view")}</ViewButtonStyled>
              <AddButtonStyled>{<IconPlus />}</AddButtonStyled>
            </ViewButton>
          )}
        </Question>
        <Detail>
          <TypeCategory>
            <StandardContent>{this.renderStandards()}</StandardContent>
            <CategoryContent>{this.renderTypes()}</CategoryContent>
          </TypeCategory>
          <Categories>{this.renderDetails()}</Categories>
        </Detail>
        {windowWidth < MAX_TAB_WIDTH && (
          <ViewButton>
            <ViewButtonStyled onClick={this.moveToItem}>{t("component.item.view")}</ViewButtonStyled>
            <AddButtonStyled>{<IconPlus />}</AddButtonStyled>
          </ViewButton>
        )}
      </Container>
    );
  }
}

export default withNamespaces("author")(Item);
