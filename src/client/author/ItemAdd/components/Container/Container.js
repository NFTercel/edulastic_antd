import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { PaddingDiv } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import { changePreviewTabAction, getPreivewTabSelector } from "../../ducks";
import { changeViewAction } from "../../../src/actions/view";
import { getViewSelector } from "../../../src/selectors/view";
import { updateItemByIdAction } from "../../../src/actions/items";
import { ButtonBar, Container } from "../../../src/components/common";
import AddNew from "../AddNew/AddNew";
import { getItemSelector } from "../../../src/selectors/items";
import SourceModal from "../../../QuestionEditor/components/SourceModal/SourceModal";
import ItemHeader from "../../../QuestionEditor/components/ItemHeader/ItemHeader";

class MainContainer extends Component {
  static propTypes = {
    questionsData: PropTypes.object.isRequired,
    view: PropTypes.string.isRequired,
    item: PropTypes.object,
    changeView: PropTypes.func.isRequired,
    changePreviewTab: PropTypes.func.isRequired,
    updateItemById: PropTypes.func.isRequired,
    previewTab: PropTypes.string.isRequired,
    setQuestionsState: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  static defaultProps = {
    item: {}
  };

  state = {
    reference: "",
    showModal: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.item) {
      this.setState({ reference: nextProps.item._id });
    }
  }

  handleChangeView = view => {
    const { changeView } = this.props;
    changeView(view);
  };

  handleShowSource = () => {
    this.setState({ showModal: true });
  };

  editReference = e => {
    const { item, updateItemById } = this.props;
    if (item._id !== e.target.value) {
      updateItemById({ id: item._id, reference: e.target.value });
    }
  };

  onInputReference = e => {
    this.setState({ reference: e.target.value });
  };

  moveNew = () => {
    const { history, item } = this.props;
    history.push(`/author/items/${item._id}/pickup-questiontype`);
  };

  handleHideSource = () => {
    this.setState({ showModal: false });
  };

  handleApplySource = json => {
    const { setQuestionsState } = this.props;
    try {
      const state = JSON.parse(json);
      setQuestionsState(state);
      this.handleHideSource();
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { view, changePreviewTab, previewTab, questionsData, t } = this.props;
    const { showModal, reference } = this.state;

    return (
      <Container>
        {showModal && (
          <SourceModal onClose={this.handleHideSource} onApply={this.handleApplySource}>
            {JSON.stringify(questionsData, null, 4)}
          </SourceModal>
        )}
        <ItemHeader
          showIcon
          title={t("component.itemAdd.itemlist")}
          link={{ url: "/author/items", text: t("component.itemAdd.backToItemList") }}
          reference={reference}
          editReference={this.editReference}
          onChange={this.onInputReference}
        >
          <ButtonBar
            onShowSource={this.handleShowSource}
            onChangeView={this.handleChangeView}
            changePreviewTab={changePreviewTab}
            onSave={() => {}}
            view={view}
            previewTab={previewTab}
          />
        </ItemHeader>
        <PaddingDiv top={160}>
          <AddNew moveNew={this.moveNew} />
        </PaddingDiv>
      </Container>
    );
  }
}

const enhance = compose(
  withNamespaces("author"),
  connect(
    state => ({
      view: getViewSelector(state),
      item: getItemSelector(state),
      previewTab: getPreivewTabSelector(state)
    }),
    {
      changeView: changeViewAction,
      changePreviewTab: changePreviewTabAction,
      updateItemById: updateItemByIdAction
    }
  )
);

export default enhance(MainContainer);
