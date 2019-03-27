import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";

import { SectionWrapper, SectionTitle, SectionForm, SectionFormConfirmButton } from "./styled";

export default class Section extends React.Component {
  static propTypes = {
    section: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired
  };

  state = {
    title: ""
  };

  handleSetTitle = () => {
    const { title } = this.state;
    const {
      handleUpdate,
      section: { id }
    } = this.props;

    if (isEmpty(title)) return;

    handleUpdate(id, title);
  };

  handleChangeTitle = e => {
    this.setState({ title: e.target.value });
  };

  renderView() {
    const {
      section: { title }
    } = this.props;

    return (
      <SectionWrapper>
        <SectionTitle>{title}</SectionTitle>
      </SectionWrapper>
    );
  }

  renderForm() {
    return (
      <SectionWrapper>
        <SectionForm onChange={this.handleChangeTitle} onPressEnter={this.handleSetTitle} />
        <SectionFormConfirmButton onClick={this.handleSetTitle} />
      </SectionWrapper>
    );
  }

  render() {
    const {
      section: { title }
    } = this.props;

    if (isEmpty(title)) {
      return this.renderForm();
    }

    return this.renderView();
  }
}
