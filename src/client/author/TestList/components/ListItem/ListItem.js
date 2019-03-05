import React, { Component } from "react";
import PropTypes from "prop-types";
import { FaAngleDoubleRight } from "react-icons/fa";
import { greenDark } from "@edulastic/colors";
import { withNamespaces } from "@edulastic/localization";
import { IconHeart, IconShare } from "@edulastic/icons";
import { Col } from "antd";
import Tags from "../../../src/components/common/Tags";
import {
  Container,
  ListCard,
  Inner,
  Description,
  Author,
  AuthorName,
  Header,
  Stars,
  StyledLink,
  ItemInformation,
  TypeContainer,
  IconWrapper,
  IconText,
  AuthorWrapper,
  ContentWrapper
} from "./styled";

class ListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  moveToItem = () => {
    const { history, item, match } = this.props;
    history.push(`${match.url}/${item._id}`);
  };

  get name() {
    const {
      item: { createdBy = {} }
    } = this.props;
    return `${createdBy.firstName} ${createdBy.lastName}`;
  }

  get id() {
    const {
      item: { createdBy = {} }
    } = this.props;
    return `${createdBy.id}`;
  }

  render() {
    const {
      item: { title, analytics, tags },
      t
    } = this.props;
    return (
      <Container>
        <ListCard
          title={
            <Header>
              <Stars size="small" />
            </Header>
          }
        />
        <ContentWrapper gutter={32}>
          <Col span={12}>
            <Inner>
              <div>
                <StyledLink onClick={this.moveToItem}>
                  {title}# <FaAngleDoubleRight />
                </StyledLink>
              </div>
              <Description>
                {
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fermentum metus et luctus lacinia. Nullam vel tincidunt nibh. Duis ac eros nunc."
                }
              </Description>
            </Inner>
          </Col>
          <AuthorWrapper span={12}>
            <ItemInformation>
              <ContentWrapper style={{ paddingTop: "15px" }}>
                <Col span={8}>
                  <Author>
                    <span>
                      {t("component.item.by")}
                      :&nbsp;
                    </span>
                    <AuthorName>{this.name}</AuthorName>
                  </Author>
                </Col>
                <Col span={8}>
                  <Author>
                    <span>ID:&nbsp;</span>
                    <AuthorName>{this.id}</AuthorName>
                  </Author>
                </Col>
                <Col span={4}>
                  <IconWrapper>
                    <IconShare color={greenDark} width={16} height={16} />
                    &nbsp;
                    {analytics && <IconText>{analytics.usage}</IconText>}
                  </IconWrapper>
                </Col>
                <Col span={4}>
                  <IconWrapper>
                    <IconHeart color={greenDark} width={16} height={16} />
                    &nbsp;
                    {analytics && <IconText>{analytics.likes}</IconText>}
                  </IconWrapper>
                </Col>
              </ContentWrapper>
            </ItemInformation>
            <TypeContainer>
              {"Type: "}
              <Tags tags={tags} />
            </TypeContainer>
          </AuthorWrapper>
        </ContentWrapper>
      </Container>
    );
  }
}

export default withNamespaces("author")(ListItem);
