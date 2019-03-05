import React, { Component } from "react";
import PropTypes from "prop-types";
import { FaAngleDoubleRight } from "react-icons/fa";
import { greenDark } from "@edulastic/colors";
import { withNamespaces } from "@edulastic/localization";
import { IconHeart, IconShare } from "@edulastic/icons";
import {
  Container,
  Inner,
  Footer,
  Author,
  AuthorName,
  Icons,
  Header,
  Stars,
  StyledLink,
  Question,
  IconWrapper,
  IconText
} from "./styled";
import Tags from "../../../src/components/common/Tags";

class Item extends Component {
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

  render() {
    const {
      item: { title, tags, analytics },
      t
    } = this.props;
    return (
      <Container
        title={
          <Header>
            <Stars />
          </Header>
        }
      >
        <Inner>
          <Question>
            <StyledLink onClick={this.moveToItem}>
              {title}# <FaAngleDoubleRight />
            </StyledLink>
          </Question>
          <Tags tags={tags} />
        </Inner>
        <Footer>
          <Author>
            <span>
              {t("component.item.by")}
              :&nbsp;
            </span>
            <AuthorName>{this.name}</AuthorName>
          </Author>
          <Icons>
            <IconWrapper>
              <IconHeart color={greenDark} width={16} height={16} />
              &nbsp;
              {analytics && <IconText>{analytics.likes}</IconText>}
            </IconWrapper>
            <IconWrapper>
              <IconShare color={greenDark} width={16} height={16} />
              &nbsp;
              {analytics && <IconText>{analytics.usage}</IconText>}
            </IconWrapper>
          </Icons>
        </Footer>
      </Container>
    );
  }
}

export default withNamespaces("author")(Item);
